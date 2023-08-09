const { getConnection } = require('../lib/mysql_connection')
const uuid = require('uuid')
const mailer = require('../lib/mailer')

module.exports.getAllRestaurantReservations = async function (req, res, next) {
    try {
        const [connection, query] = await getConnection()

        const id = [req.params.id]
        // reservation restaurant customer
        // let sqlRead = `SELECT * FROM reservation inner join restaurant on reservation.restaurantid = restaurant.id inner join customer on reservation.customerid = customer.id WHERE reservation.restaurantid=${resId}`

        // const sqlRead =
        //     'SELECT * FROM waiter INNER JOIN reservation on waiter.restaurantid = reservation.restaurantid INNER JOIN restaurant on reservation.restaurantid = restaurant.id INNER JOIN customer on reservation.customerid = customer.id WHERE waiter.id = ?'

        // ORDER BY reservationtimestamp DESC
        const sqlRead = 'SELECT * FROM waiter WHERE waiter.id = ?'
        const values = [id]

        const waiter = await query(sqlRead, values)
        let reservations
        if (waiter.length > 0) {
            const sqlReservation =
                'SELECT * FROM reservation INNER JOIN restaurant on reservation.restaurantid = restaurant.id INNER JOIN customer on reservation.customerid = customer.id WHERE reservation.restaurantid = ? ORDER BY date ASC'
            const val = [waiter[0].restaurantid]
            reservations = await query(sqlReservation, val)
        } else {
            reservations = []
        }

        console.log(reservations)
        connection.release()

        res.status(200).json(reservations)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.makeReservation = async function (req, res, next) {
    try {
        const {
            customerId,
            restaurantId,
            numberofpeople,
            reservationDate,
            reservationTime,
        } = req.body

        let reservationstatus = 'pending'
        console.log(req.body)
        const referencecode = uuid.v4()
        const [connection, query] = await getConnection()

        // validating number of people for particular restaurant,date and timeslot
        const getTotalPeopleByRestaurantId = (restaurantId) => {
            return new Promise((resolve, reject) => {
                const reservationstatus = 'confirmed'
                const query = `SELECT SUM(numberofpeople) as totalPeople FROM reservation WHERE restaurantId = '${restaurantId}' AND date = '${reservationDate}' AND time = '${reservationTime}' AND reservationstatus = '${reservationstatus}';`
                connection.query(query, (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(results[0].totalPeople || 0)
                    console.log(results[0].totalPeople)
                })
            })
        }

        const totalPeople = parseInt(
            await getTotalPeopleByRestaurantId(restaurantId)
        )

        const getMaxPeopleByRestaurantId = (restaurantId) => {
            return new Promise((resolve, reject) => {
                const query = `SELECT maxpeople FROM restaurant WHERE id = '${restaurantId}';`
                connection.query(query, (error, results) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(results[0].maxpeople || 0)
                    console.log(results[0].maxpeople)
                })
            })
        }

        const maxpeople = await getMaxPeopleByRestaurantId(restaurantId)

        const count = parseInt(totalPeople + numberofpeople)
        console.log(count)

        if (reservationDate == '') {
            res.status(400).send({ msg: 'Please enter date' })
        }

        // check if date is in the future
        else if (new Date(reservationDate) < new Date()) {
            res.status(400).send({ msg: 'Date must be in the future' })
        } else if (reservationTime == '') {
            res.status(400).send({ msg: 'Please choose time-slot' })
        }

        // check number of people is not less than 1
        else if (numberofpeople < 1) {
            return res
                .status(400)
                .send({ msg: 'Number of people must be at least 1' })
        }

        // check limit reached or not
        else if (count > maxpeople) {
            console.log('limit reached')
            res.status(400).json({
                msg: 'Limit of people reached for this restaurant',
            })
        } else {
            console.log('pass all cases')
            reservationstatus = 'confirmed'
            let sqlUpdate =
                'INSERT INTO reservation(customerid,restaurantid,numberofpeople,date,time,reservationstatus,referencecode) VALUES(?,?,?,?,?,?,?)'
            let value = [
                customerId,
                restaurantId,
                numberofpeople,
                reservationDate,
                reservationTime,
                reservationstatus,
                referencecode,
            ]
            await query(sqlUpdate, value)
            const toemail = await query(
                'SELECT email FROM customer WHERE id=?',
                [customerId]
            )
            const restaurantdetail = await query(
                'SELECT name,location FROM restaurant WHERE id = ?',
                [restaurantId]
            )
            connection.release()

            const options = {}
            options['to'] =
                toemail[0].email ||
                'viren-kishorbhai.gajera@informatik.hs-fulda.de'
            options['subject'] = 'Reservation Confirmation'

            let content = {}
            content['reservationstatus'] = 'Confirmed' || ''
            content['restaurantname'] = restaurantdetail[0].name || ''
            content['restaurantlocation'] = restaurantdetail[0].location || ''
            content['reservationDate'] = reservationDate || ''
            content['reservationTime'] = reservationTime || ''
            content['numberofpeople'] = numberofpeople || ''
            content['referencecode'] = referencecode || ''

/*             var mailerObj = new mailer(
                options,
                'reservationConfirmation.html',
                content,
                null
            )
            mailerObj.sendEmail(function (err, success) {
                if (err) {
                    console.log('Email error:', err)
                } else {
                    console.log('Email success:', success)
                }
            }) */

            res.status(200).json({ msg: 'Reservation Confirm' })
        }
    } catch (error) {
        console.log('error', error)
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getReservation = async function (req, res, next) {
    try {
        let sqlRead = 'SELECT * FROM reservation WHERE restaurantid = ?'
        let values = [req.params.restaurantId]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)
        connection.release()

        res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getCustomerReservation = async function (req, res, next) {
    try {
        let sqlRead =
            'SELECT *, reservation.id FROM reservation inner join restaurant on reservation.restaurantid = restaurant.id WHERE customerid = ?'

        let values = [req.params.customerId]

        const [connection, query] = await getConnection()

        let result = await query(sqlRead, values)
        connection.release()

        res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.cancelReservation = async function (req, res, next) {
    try {
        let sqlUpdate =
            'UPDATE reservation SET reservationstatus = "cancelled" WHERE id = ?'

        let values = [req.params.reservationId]

        const [connection, query] = await getConnection()

        await query(sqlUpdate, values)

        connection.release()

        res.status(200).json({
            status: 'Success',
            msg: 'Reservation cancelled successfully',
        })
    } catch (error) {
        return res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
