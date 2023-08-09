const { getConnection } = require('../lib/mysql_connection')

module.exports.searchAllRestaurant = async function (req, res, next) {
    try {

        const [connection, query] = await getConnection();
        
        let search_name = req.query.name ? req.query.name : "";
        let tag = req.query.tag ? req.query.tag : "";
        let location = req.query.location ? req.query.location : "";
        let approvalstatus = "approved"

        let sqlRead = "SELECT * FROM restaurant WHERE name LIKE ? AND tags LIKE ? AND location LIKE ? AND approvalstatus = ?";

        let values = ['%' + search_name + '%','%' + tag + '%','%' + location + '%',approvalstatus]

        let allRestaurant = await query(sqlRead , values);

        connection.release();

        res.status(200).json(allRestaurant);

    } catch (error) {
        res.status(400).json({ status: "Failure", msg: error.message });
    }


}

module.exports.searchRestaurantById = async function (req, res, next) {
    try {

        const [connection, query] = await getConnection();

        let sqlRead = "SELECT * FROM restaurant WHERE id = ?";
        let values = [req.params.id]

        let restaurant = await query(sqlRead , values);

        connection.release();

        res.status(200).json(restaurant);

    } catch (error) {
        res.status(400).json({ status: "Failure", msg: error.message });
    }
}