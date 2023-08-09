const { getConnection } = require('../lib/mysql_connection')

module.exports.getRestaurantByStatus = async function (req, res, next) {
    try {
        const [connection, query] = await getConnection()

        let approvalstatus = req.params.approvalstatus

        if (approvalstatus === undefined) {
            return res.status(400).json({
                status: 'Failure',
                msg: 'approval status parameter is required',
            })
        }

        let sqlRead = 'SELECT * FROM restaurant WHERE approvalstatus = ?'

        let values = [approvalstatus]

        let allRestaurant = await query(sqlRead, values)

        connection.release()

        res.status(200).json(allRestaurant)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateRestaurantStatus = async function (req, res, next) {
    try {
        let id = req.params.id
        let { approvalstatus } = req.body

        const [connection, query] = await getConnection()

        let sqlUpdate = 'UPDATE restaurant SET approvalstatus = ? WHERE id = ?'

        // approvalstatus = pending, approved, rejected
        let values = [approvalstatus, id]

        await query(sqlUpdate, values)

        connection.release()

        return res
            .status(200)
            .json({ msg: 'Restaurant Updated Successfully Added' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.getAdmin = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        let sqlRead = 'SELECT * FROM admin WHERE id = ?'
        let values = [req.params.id]

        let admin = await query(sqlRead, values)

        connection.release()

        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateAdmin = async function (req, res, next) {
    try {
        let id = req.params.id
        let { firstname } = req.body

        const [connection, query] = await getConnection()

        let sqlUpdate = 'UPDATE admin SET firstname = ? WHERE id = ?'

        let values = [firstname, id]

        await query(sqlUpdate, values)

        connection.release()

        return res.status(200).json({ msg: 'Admin Updated Successfully' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
