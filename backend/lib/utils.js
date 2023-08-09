const fs = require('fs')

function createDir(path) {

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}

function moveFile(oldPath, newPath) {

    fs.renameSync(oldPath, newPath)
}

function moveMultipleFile(oldPaths, newPaths) {

    oldPaths.forEach((oldPath, idx, arr) => {

        fs.renameSync(oldPath, newPaths[idx])
    });
}

function organizeUploadFiles(usertype, ownerid,id, imagenames) {
    let oldPaths = []
    let newPaths = []
    let path;
    if(usertype == "restaurant"){
        path = `./tempuploads/${usertype}/${ownerid}`
    }
    else{
        path = `./tempuploads/${usertype}/${id}/`
    }
    imagenames.forEach(img => {
        oldPaths.push(`${path}/${img}`)
        newPaths.push(`./uploads/${usertype}/${id}/${img}`)
    })

    let newfolderpath = `./uploads/${usertype}/${id}`

    createDir(newfolderpath)
    console.log(oldPaths,newPaths)
    moveMultipleFile(oldPaths, newPaths)
}

function removeMultipleFiles(folderpath) {

    const files = fs.readdirSync(folderpath)

    for (const file of files) {
        fs.unlinkSync(folderpath + file);
    }
}

function removeDir(folderpath) {

    if (fs.existsSync(folderpath)) {
        fs.rmdirSync(folderpath, { recursive: true });
        console.log("Folder Deleted")
    }
}

module.exports = {
    createDir,
    moveFile,
    moveMultipleFile,
    organizeUploadFiles,
    removeMultipleFiles,
    removeDir
}