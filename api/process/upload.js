const express = require('express');
const router  = express.Router()
const multer  = require('multer');
const fs      = require("fs");
const creds   =  require('../constants');
const file    = "";

const inMemoryStorage = multer.memoryStorage();
// const singleFileUpload = multer({ storage: inMemoryStorage });
const azureStorage = require('azure-storage');
const getStream = require('get-stream');

/**
 * Using multer to upload file
 * Storage shift Azzure
 */
const tstorage = multer.diskStorage({
    destination: function(req, file, cb){
        if (fs.existsSync('./uploads') === false) {
            fs.mkdir('./uploads', '0777', function(){
                console.log('Uploads Folder created!!');
            });
        }

        cb(null, './uploads/');
    },filename: function(req, file, cb){
        this.file = file.originalname;
        cb(null, this.file);
    }
});

const upload = multer({ storage: tstorage });

// INITIAL ROUTE
router.get('/', async (req, res) => {
    res.json({
        'status': 'success',
        'message': 'In upload Space'
    });
});

router.get('/api', async (req, res) => {
    res.json({
        'status': 'error',
        'message': 'Please send a post request to the known api.'
    });
});

/**
 * File Upload Process
 * */

const azureStorageConfig = {
    accountName: creds.account_name,
    accountKey: creds.key,
    blobURL: creds.url,
    containerName: creds.container
};

uploadFileToBlob = async (directoryPath, file) => {

    return new Promise((resolve, reject) => {

        const blobName     = getBlobName(file.originalname);
        const stream       = fs.createReadStream('./' + file.path);
        const streamLength = file.size;
        const blobService  = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey); 
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ filename: blobName, 
                    originalname: file.originalname, 
                    size: streamLength, 
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}/${directoryPath}/${blobName}` });
            }
        });
    });

};

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

const imageUpload = async(req, res, next) => {
    try {
        const upload = await uploadFileToBlob('file-uploads', req.file); // images is a directory in the Azure container

        var path = './uploads/' + req.file.originalname;
    
        fs.rmdir(path, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        
            console.log(`${path} is removed!`);
        });

        upload.status = 'success';
        upload.message = 'File uploaded successfully.'

        return res.status(200).json(upload);
    } catch (error) {
        return res.status(200).json({
            "status": "error",
            "message": "Something went wrong"
        });
    }
}

router.post('/image-save', upload.single('file'), imageUpload);

module.exports = router;