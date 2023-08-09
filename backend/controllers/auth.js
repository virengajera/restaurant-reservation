const bcrypt = require('bcrypt')

const { getConnection, mysql } = require('../lib/mysql_connection')
const authLib = require('../lib/auth')

module.exports.login = async function (req, res, next) {
    try {
        const { user, email, password } = req.body

        let sqlRead = ''

        switch (user) {
            case 'customer':
                sqlRead = 'SELECT * from customer WHERE email=?'
                break

            case 'restaurantowner':
                sqlRead = 'SELECT * from restaurantowner WHERE email=?'
                break

            case 'waiter':
                sqlRead = 'SELECT * from waiter WHERE email=?'
                break

            case 'admin':
                sqlRead = 'SELECT * from admin WHERE email=?'
                break
        }

        const [connection, query] = await getConnection()

        let values = [email]
        const result = await query(sqlRead, values)

        connection.release()

        if (result.length === 0 || result.length >= 2) {
            return res
                .status(401)
                .json({ status: 'Failure', msg: 'Email or Password is wrong' })
        }

        if (!(await bcrypt.compare(password, result[0].password))) {
            return res.status(401).json({ msg: 'Email or Password is wrong' })
        }

        const data = {
            id: result[0].id,
            user: user,
            firstname: result[0].firstname,
            email: result[0].email,
        }

        let token = authLib.generateJWTToken(data)

        res.status(200).json({ msg: 'Successfully Login', token, userId: data.id })

    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.register = async function (req, res, next) {
    try {
        const { user, firstname, email, password } = req.body

        let sqlUpdate,
            sqlRead = ''
        switch (user) {
            case 'customer':
                sqlUpdate =
                    'INSERT INTO customer (firstname,email,password) VALUES (?,?,?)'
                sqlRead = 'SELECT email from customer WHERE email=?'
                break

            case 'restaurantowner':
                sqlUpdate =
                    'INSERT INTO restaurantowner (firstname,email,password) VALUES (?,?,?)'
                sqlRead = 'SELECT email from restaurantowner WHERE email=?'
                break
        }

        const [connection, query] = await getConnection()

        let values = [email]
        const result = await query(sqlRead, values)

        if (result.length >= 1) {
            return res
                .status(400)
                .json({ msg: 'User already exists please try different email' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        values = [firstname, email, hashedPassword]

        await query(sqlUpdate, values)

        connection.release()
        res.status(200).json({ msg: 'Successfully Registered' })
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.changePassword = async function (req, res, next) {
    try {
        const { email, user, newpassword } = req.body
        console.log(newpassword)
        const hashedPassword = await bcrypt.hash(newpassword, 10)

        const sqlUpdate = `UPDATE ${user} SET password = ? WHERE email = ?`

        let values = [hashedPassword, email]

        const [connection, query] = await getConnection()

        await query(sqlUpdate, values)

        connection.release()

        res.status(200).json({ msg: 'Successfully Changed' })
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
