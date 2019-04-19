const express = require('express');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({storage: storage});

const authController = require('../controllers/auth-controller');
const router = new express.Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

router.post('/set-push-token', authController.setPushToken);

router.get('/get-user/:token', authController.getUserByToken);

router.post('/upload', upload.single('avatar'), authController.uploadImage);

module.exports = router;