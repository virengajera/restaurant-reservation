const { getConnection } = require('../lib/mysql_connection')

module.exports.createRoom = async function (req, res, next) {
    try {
        const { restaurantownerid } = req.body

        const customerid = res.locals.id

        let sqlRead = 'SELECT * FROM room WHERE customerid = ? AND restaurantownerid = ?'

        let values = [customerid, restaurantownerid]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)

        if (result.length >= 1) {
            return res.status(200).json({ msg: 'Room already exits' })
        }

        let sqlUpdate =
            'INSERT INTO room(customerid,restaurantownerid) VALUES(?,?)'

        await query(sqlUpdate, values)

        connection.release()

        res.status(200).json({ msg: 'Room created' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getRoomID = async function (req, res, next) {
    try {
        const { user, id } = req.params
        let sqlRead = ''

        switch (user) {
            case 'customer':
                sqlRead = 'SELECT * FROM room WHERE customerid = ?'
                break

            case 'restaurantowner':
                sqlRead = 'SELECT * FROM room WHERE restaurantownerid = ?'
        }

        
        let values = [id]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)

        connection.release()

        res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getMessage = async function (req, res, next) {
    try {
        const { roomID } = req.params
        let sqlRead = ''

        if (req.query && req.query.status && req.query.isread == 'no') {
            sqlRead = "SELECT * FROM message WHERE roomid = ? AND isread='no'"
        } else {
            sqlRead = 'SELECT * FROM message WHERE roomid = ?'
        }

        let values = [roomID]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)

        connection.release()

        res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getAllMessages = async function (req, res, next) {
    try {
        const id = res.locals.id
        const user = res.locals.user

        let sqlRead = ''

        if (user == 'customer') {
            sqlRead =
                'SELECT * FROM message INNER JOIN room ON message.roomid = room.id INNER JOIN restaurantowner ON room.restaurantownerid = restaurantowner.id WHERE room.customerid=?'
        } else {
            sqlRead =
                'SELECT * FROM message INNER JOIN room ON message.roomid = room.id INNER JOIN customer ON room.customerid = customer.id WHERE room.restaurantownerid=?'
        }

        let values = [id]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)

        connection.release()

        res.status(200).json(result)

    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getRestaurantOwnerRooms = async function (req, res, next) {
    try {
        const { id } = req.params

        const sqlRead =
            'SELECT * FROM room INNER JOIN customer ON room.customerid = customer.id WHERE room.restaurantownerid=?'

        let values = [id]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)

        connection.release()

        res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateIsReadStatus = async function (req, res, next) {
    try {
        // user = customer, owner
        let { roomId, user } = req.body

        const [connection, query] = await getConnection()

        const status = 'yes'

        let sqlUpdate = 'UPDATE message SET isread = ? WHERE roomid = ?'

        let values = [status, roomId, user]

        await query(sqlUpdate, values)

        connection.release()

        return res.status(200).json({ msg: 'Messages Updated Successfully' })
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
