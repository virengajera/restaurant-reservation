const { getConnection, poolConnection } = require('../lib/mysql_connection')

const utils = require('../lib/utils')
const bcrypt = require('bcrypt')

module.exports.viewRestaurant = async function (req, res, next) {
    try {
        const [connection, query] = await getConnection()

        let sqlRead = 'SELECT * FROM restaurant WHERE restaurantownerid = ?'
        let values = [res.locals.id]

        let result = await query(sqlRead, values)

        connection.release()

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
module.exports.addRestaurant = async function (req, res, next) {
    try {
        let restaurantownerid = res.locals.id
        let approvalstatus = 'pending'
        let {
            name,
            description,
            tags,
            phonenumber,
            location,
            timeslot,
            maxpeople,
        } = req.body
        let image1 = req.files.image1[0].filename
        let image2 = req.files.image2[0].filename
        let image3 = req.files.image3[0].filename

        const [connection, query] = await getConnection()

        let sqlInsert =
            'INSERT INTO restaurant (restaurantownerid, name, description, tags, phonenumber, location, approvalstatus,timeslot,maxpeople, image1, image2, image3) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
        let values = [
            restaurantownerid,
            name,
            description,
            tags,
            phonenumber,
            location,
            approvalstatus,
            timeslot,
            maxpeople,
            image1,
            image2,
            image3,
        ]
        let resultInsert = await query(sqlInsert, values)
        connection.release()
        
        let restaurantid = resultInsert.insertId


        utils.organizeUploadFiles(
            'restaurant',
            restaurantownerid,
            restaurantid,
            [image1, image2, image3]
        ) //moves files from temp folder to uploads

        return res
            .status(200)
            .json({ msg: 'New Restaurant Successfully Added' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateRestaurant = async function (req, res, next) {
    try {
        let restaurantownerid = res.locals.id
        let approvalstatus = 'pending'
        let {
            id,
            name,
            description,
            tags,
            phonenumber,
            location,
            timeslot,
            maxpeople,
        } = req.body
        let image1 = req.files.image1[0].filename
        let image2 = req.files.image2[0].filename
        let image3 = req.files.image3[0].filename

        const [connection, query] = await getConnection()

        utils.removeMultipleFiles(`./uploads/restaurant/${id}/`)

        let sqlUpdate =
            'UPDATE restaurant SET name = ? , description = ?, tags = ? , phonenumber = ?, location = ?, timeslot = ?, maxpeople = ?, approvalstatus = ? , image1 = ? , image2 = ? , image3 = ? WHERE id = ?'

        let values = [
            name,
            description,
            tags,
            phonenumber,
            location,
            timeslot,
            maxpeople,
            approvalstatus,
            image1,
            image2,
            image3,
            id,
        ]

        await query(sqlUpdate, values)
        connection.release()

        utils.organizeUploadFiles('restaurant', restaurantownerid, id, [
            image1,
            image2,
            image3,
        ]) //moves files from temp folder to uploads //moves files from temp folder to uploads


        return res
            .status(200)
            .json({ msg: 'Restaurant Updated Successfully Added' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
module.exports.removeRestaurant = async function (req, res, next) {
    try {
        const [connection, query] = await getConnection()

        let restaurantid = req.body.restaurantid

        if (restaurantid === undefined) {
            return res
                .status(401)
                .json({ status: 'Failure', msg: 'Restaurant ID is missing' })
        }

        let sqlUpdate = 'DELETE FROM restaurant WHERE id = ?'
        let values = [restaurantid]

        await query(sqlUpdate, values)

        connection.release()

        utils.removeDir(`./uploads/restaurant/${restaurantid}`)


        res.status(200).json({ msg: 'Successfully Deleted' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.deleteProfile = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        await query('DELETE FROM restaurantowner WHERE id=?', [res.locals.id])

        connection.release()

        utils.removeMultipleFiles(`./uploads/restaurantowner/${res.locals.id}/`)

        res.status(200).json({ status: 'Success', msg: 'Successfully Deleted' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateProfile = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        let profileimage = req.files.profileimage[0].filename

        await query('UPDATE restaurantowner SET profileimage=? WHERE id=?', [
            profileimage,
            res.locals.id,
        ])

        connection.release()

        utils.organizeUploadFiles('restaurantowner', null, res.locals.id, [
            profileimage,
        ]) //moves files from temp folder to uploads //moves files from temp folder to uploads

        res.status(200).json({
            status: 'Success',
            msg: 'Profile Successfully updated',
        })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getRestaurantOwner = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        let sqlRead = 'SELECT * FROM restaurantowner WHERE id = ?'
        let values = [req.params.id]

        let restaurantowner = await query(sqlRead, values)

        connection.release()

        res.status(200).json(restaurantowner)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateRestaurantOwner = async function (req, res, next) {
    try {
        let id = req.params.id
        let { firstname, phonenumber } = req.body

        const [connection, query] = await getConnection()

        let sqlUpdate =
            'UPDATE restaurantowner SET firstname = ?, phonenumber = ? WHERE id = ?'

        let values = [firstname, phonenumber, id]

        await query(sqlUpdate, values)

        connection.release()

        return res
            .status(200)
            .json({ msg: 'Restaurant Owner Updated Successfully' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

/*
* waiter table structure
* CREATE TABLE `waiter` (
  `id` int(11) NOT NULL,
  `restaurantid` int(11) NOT NULL,
  `restaurantownerid` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
* */
module.exports.addWaiter = async function (req, res, next) {
    try {
        let restaurantownerid = res.locals.id
        let { email, password, restaurantid } = req.body
        const [connection, query] = await getConnection()
        let sqlRead = 'SELECT * FROM waiter WHERE email = ?' //check if waiter already exists
        let values = [email]
        let waiter = await query(sqlRead, values)
        if (waiter.length > 0) {
            return res.status(400).json({
                status: 'Failure',
                msg: 'Waiter already exists',
            })
        }
        let sqlInsert =
            'INSERT INTO waiter (restaurantid, restaurantownerid, email, password) VALUES (?,?,?,?)'
        const hashedPassword = await bcrypt.hash(password, 10)
        let waiterData = [
            restaurantid,
            restaurantownerid,
            email,
            hashedPassword,
        ]

        await query(sqlInsert, waiterData)

        connection.release()

        res.status(200).json({
            status: 'Success',
            msg: 'Waiter Successfully Added',
        })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
module.exports.removeWaiter = async function (req, res, next) {
    try {
        const [connection, query] = await getConnection()
        let waiterid = req.body.waiterid
        if (waiterid === undefined) {
            return res
                .status(401)
                .json({ status: 'Failure', msg: 'Waiter ID is missing' })
        }
        let sqlUpdate = 'DELETE FROM waiter WHERE id = ?'
        let values = [waiterid]
        await query(sqlUpdate, values)
        connection.release()
        res.status(200).json({ msg: 'Successfully Deleted' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
module.exports.viewWaiter = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()
        let sqlRead = 'SELECT * FROM waiter WHERE restaurantownerid = ?'
        let values = [res.locals.id]
        let waiter = await query(sqlRead, values)
        connection.release()
        res.status(200).json(waiter)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
module.exports.updateWaiter = async function (req, res, next) {
    try {
        console.log(req.body)
        let { id, restaurantid, email, password } = req.body
        const [connection, query] = await getConnection()
        const hashPassword = await bcrypt.hash(password, 10)
        let sqlUpdate =
            'UPDATE waiter SET restaurantid = ?, email = ?, password = ? WHERE id = ?'
        let values = [restaurantid, email, hashPassword, id]

        await query(sqlUpdate, values)
        connection.release()

        res.status(200).json({ msg: 'Waiter Updated Successfully' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getRestaurantsByOwnerId = async function (req, res, next) {
    try {
        const id = [req.params.id]
        const [connection, query] = await getConnection()
        const sqlRead = 'SELECT * FROM restaurant WHERE restaurantownerid = ?'
        let values = [id]

        let restaurants = await query(sqlRead, values)
        connection.release()
        
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
