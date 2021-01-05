const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register", (req, res) => {
  const { name, email, password } = req.body
  user.findOne({ email })
    .then(result => {
      if (result) return res.status(400).json({ message: "Email sudah ada" });
      else {
        bcrypt.hash(password, 10, (err, password) => {
          user.create({name, email, password})
          .then((result) => res.status(200).json({
            code: 200,
            message: "Berhasil mendaftar",
            data: result,
          }))
          .catch((err) => res.json({ message : err.message}))
        })
      }
    })
})

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email })
  .then((user) => {
    if (!user) return res.status(404).json({ message: "Email tidak ada"})

    bcrypt.compare(password, user.password)
    .then((isMatch) => {

      if (isMatch) {
        const payload = { _id: user._id, name: user.name };
        jwt.sign(payload, "more", { expiresIn: '1h'}, (err, token) => {
          res.status(200).json({
            code: 200,
            accessToken: "Bearer " + token,
            data: user,
          })
        })
        
      } else res.json({ message: "Password salah"})
    })
  })
  .catch((err) => res.json({message: err.message}))
})

router.put("/ubah/:_id", (req, res) => {
  user.findOne({ _id : req.params._id })
  .then((profile) => {
    const status = profile.status < 1 ? 1 : profile.status;
    user.updateOne({ _id: req.params._id }, { ...req.body, status  })
    .then(() => { 
      res.status(200).json({
        code: 200,
        message: "Berhasil ubah data",
        data: req.body,
      })
  })
  .catch((err) => res.json({ message: err.message}))
  })
})

router.put("/add-industri/:_id/:idJob", (req, res) => {
  user.updateOne(
    { _id: req.params._id },
    { $push : { 'industri' : req.params.idJob }})
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Berhasil tambah industri",
        data: req.params.idJob,
      })
    })
    .catch((err) => { res.json({ message: err.message })})
})



module.exports = router;