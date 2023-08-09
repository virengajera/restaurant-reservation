const { getConnection } = require('../lib/mysql_connection')
const utils = require('../lib/utils')

module.exports.deleteProfile = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        await query('DELETE FROM customer WHERE id=?', [res.locals.id])

        connection.release()

        utils.removeMultipleFiles(`./uploads/customer/${res.locals.id}/`)

        res.status(200).json({ status: 'Success', msg: 'Successfully Deleted' })

    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateProfile = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        let profileimage = req.files.profileimage[0].filename

        await query('UPDATE customer SET profileimage=? WHERE id=?', [
            profileimage,
            res.locals.id,
        ])

        connection.release()

        utils.organizeUploadFiles('customer', null, res.locals.id, [
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

module.exports.getCustomer = async function (req, res, next) {
    try {
        let [connection, query] = await getConnection()

        let sqlRead = 'SELECT * FROM customer WHERE id = ?'
        let values = [req.params.id]

        let customer = await query(sqlRead, values)

        connection.release()

        res.status(200).json(customer)
        
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}

module.exports.updateCustomer = async function (req, res, next) {
    try {
        let id = req.params.id
        let { firstname, phonenumber } = req.body

        const [connection, query] = await getConnection()

        let sqlUpdate =
            'UPDATE customer SET firstname = ?, phonenumber = ? WHERE id = ?'

        // approvalstatus = pending, approved, rejected
        let values = [firstname, phonenumber, id]

        await query(sqlUpdate, values)

        connection.release()

        return res.status(200).json({ msg: 'Customer Updated Successfully' })
    } catch (error) {
        res.status(400).json({ status: 'Failure', msg: error.message })
    }
}
