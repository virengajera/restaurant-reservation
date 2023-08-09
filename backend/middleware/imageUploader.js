const multer = require('multer')
const path = require('path')
const utils = require('../lib/utils')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let tmppath;

        let originalUrl = req.originalUrl.split('/')
        if(originalUrl[2] == 'updaterestaurant' || originalUrl[2] == 'addrestaurant'){
            tmppath = `./tempuploads/restaurant/${req.res.locals.id}`
            utils.createDir(tmppath)
        }
        else {
            tmppath = `./tempuploads/${req.res.locals.user}/${req.res.locals.id}`
            utils.createDir(tmppath)
        }
        cb(null, tmppath)
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        cb(null, file.fieldname + path.extname(file.originalname))
    }
})

const uploadimage = multer({ storage: storage })

module.exports = {
    uploadimage
}