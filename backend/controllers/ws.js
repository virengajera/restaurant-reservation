const { getConnection } = require('../lib/mysql_connection')
const { Server } = require('socket.io')

function runChatServer(server) {
    const io = new Server(server, { cors: { origin: '*' } })
    let roomid_userid = new Map()

    io.on('connection', async (socket) => {
        console.log('Connected: ', socket.id)
        
        socket.on('send-chat-message', async (roomid, sender, message) => {
            
            let roomsize = roomid_userid.get(roomid).size
            
            // If only person is present in the room then all the chat message will be unread
            let isread = roomsize < 2 ? 'no' : 'yes'

            let sqlUpdate = 'INSERT INTO message(roomid,sender,message,isread) VALUES(?,?,?,?)'
            let values = [roomid, sender, message, isread]

            const [connection, query] = await getConnection()

            await query(sqlUpdate, values)

            connection.release()

            // When person tries to send message if there will be only person in the room we will send real time chat notification
            // if (roomsize < 2) {
            //   socket.to(roomid).emit('chat-notification', sender, message)
            // }
            // else{
            socket.to(roomid).emit('receive-message', sender, message)
            // }

            console.log(
                'Message m=',
                message,
                'Roomid = ',
                roomid,
                'Clients = ',
                roomid_userid.get(roomid)
            )
        })

        socket.on('join-room', async (roomid) => {
           
            socket.join(roomid)
            let users_id = roomid_userid.get(roomid)

            if (!users_id || users_id.size == 0) {
                let uid = new Set()
                uid.add(socket.id)
                roomid_userid.set(roomid, uid)
            } else {
                users_id.add(socket.id)
                roomid_userid.set(roomid, users_id)
            }

            const [connection, query] = await getConnection()
            // Inital no. of person in room is 1
            // When new user joins rooms means total 2 person if both person are in chat means all chat are read.
            if (roomid_userid.get(roomid).size == 2) {
                let sqlUpdate = 'UPDATE message SET isread=? WHERE roomid=?'
                let values = ['yes', roomid]
                await query(sqlUpdate, values)
            }
            connection.release()
            console.log(
                'Joined Room with roomid=',
                roomid,
                'Users = ',
                roomid_userid.get(roomid)
            )
            
        })

        // When user closes modal from front he will fire event with room-id and that socket will be removed
        socket.on('leave-room', (roomid) => {
            let users_id = roomid_userid.get(roomid)
            console.log(users_id)
            if (users_id) {
                users_id.delete(socket.id)
                roomid_userid.set(roomid, users_id)

                console.log(
                    'Left Room with roomid=',
                    roomid,
                    'Users = ',
                    roomid_userid.get(roomid)
                )
            }
        })

        socket.on('disconnect', function (r) {
            let x
            for (let [k, v] of roomid_userid) {
                let users_id = roomid_userid.get(k)

                if (users_id.has(socket.id)) {
                    users_id.delete(socket.id)
                    roomid_userid.set(k, users_id)
                    x = users_id
                }
            }
            console.log('Client Disconnected with socketid', socket.id)
        })
    })
}

module.exports = runChatServer
