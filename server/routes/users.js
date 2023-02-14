const express = require("express")
const router = express.Router()
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const imgName = file.originalname;
    let newImgName = imgName.slice(0, imgName.lastIndexOf(".")).replace(" ", "-")
    newImgName = newImgName + "_" + new Date().getTime()
    const imgExt = imgName.slice(imgName.lastIndexOf("."))
    const fullName = newImgName + imgExt
    console.log('====================================');
    console.log(fullName);
    console.log(file);
    console.log('====================================');
    cb(null, fullName)
  }
})

var upload = multer({ storage: storage });

const UserModel = require("../models/user")


router.get('/', (req, res) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      res.json({ message: "Error", error: err })
    } else {
      res.json({ message: "Success", data })
    }
  })
  // res.send('GET request to the homepage')
})


router.get('/:id', (req, res) => {
  UserModel.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ message: "Error", error: err })
    } else {
      res.json({ message: "Success", data })
    }
  })
  // res.send('GET request to the homepage')
})


router.post('/', function (req, res) {
  console.log(req.file, req.body)
  // req.body['image'] = req.file.path
  UserModel.create(req.body, (err, data) => {
    if (err) {
      res.json({ message: "Error", error: err })
    } else {
      res.json({ message: "Success", data })
    }
  })
  // res.send(req.body)
})

router.post('/upload', upload.single('image'), function (req, res) {
  console.log(req.file, req.body)
  req.body['image'] = "http://localhost/" + req.file.path
  res.send(req.body)
})


router.put('/:id', function (req, res) {
  const filter = { _id: req.params.id };
  const update = req.body;
  UserModel.findOneAndUpdate(filter, update, (err, data) => {
    if (err) {
      res.json({ message: "Error", error: err })
    } else {
      res.json({ message: "Success", data })
    }
  })
});


router.delete('/:id', (req, res) => {
  UserModel.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.json({ message: "Error", error: err })
    } else {
      res.json({ message: "Success", data })
    }
  })
  // res.send('GET request to the homepage' + req.params.id)
})














module.exports = router;
