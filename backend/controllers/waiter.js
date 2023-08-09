const {getConnection} = require('../lib/mysql_connection')

module.exports.viewReservation = async function (req, res, next) {
    //join waiter and reservation table based on restaurantid, here is the table structure
    /*
    CREATE TABLE `waiter` (
  `id` int(11) NOT NULL,
  `restaurantid` int(11) NOT NULL,
  `restaurantownerid` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerid` (`customerid`),
  ADD KEY `restaurantid` (`restaurantid`);
    */
    try {
        let waiterid = res.locals.id
        let sqlRead = 'SELECT * FROM reservation WHERE restaurantid = (SELECT restaurantid FROM waiter WHERE id = ?)'
        const [connection, query] = await getConnection()
        let values = [waiterid]
        const result = await query(sqlRead, values)
        connection.release()
        res.status(200).json({msg: 'Successfully get reservation', result})
    } catch (error) {
        return res.status(400).json({status: 'Failure', msg: error.message})
    }
}