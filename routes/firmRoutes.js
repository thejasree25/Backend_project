const express = require('express');
// const multer = require('multer');
// const path = require('path');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '..', 'uploads'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });

// Update add-firm route to handle image upload



router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);
router.post('/add-firm',verifyToken,firmController.addFirm);
module.exports = router;
