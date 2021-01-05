const express = require('express');
const router = express.Router();
const industri = require("../models/industri");

router.get("/", (req, res) => {
  industri.find({},{ jobs : 0 })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          code: 200,
          message: "Berhasil Get Data",
          data: result,
        })
      } else {
        res.status(404).json({
          code: 404,
          message: "Tidak ada data"
        })
      }
    })
})

router.get("/detail/:_id", (req, res) => {
  industri.findOne({ _id : req.params._id})
    .then((result) => {
        res.status(200).json({
          code: 200,
          message: "Berhasil get data",
          data: result,
        })
    })
    .catch((err) => {
      res.status(404).json({
        code: 404,
        message: "Data tidak ditemukan",
    })
  })
})

router.get("/get-job/:_id", (req, res) => {
  industri.findOne({"jobs._id" : req.params._id})
  .then((result) => {
    const { _id, name } = result;
    const jobs = result.jobs.filter(item => String(item._id) === String(req.params._id))
    res.status(200).json({
      code: 200,
      message: "Berhasil get data",
      data: { _id, name ,jobs},
    })
  })
  .catch((err) => res.json({ message: err.message }))
})

router.post("/tambah", (req, res) => {
  const { name, desc, address } = req.body;
  console.log(req.body);
  industri.create({ name, desc, address })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Berhasil tambah industri",
        data: req.body,
      })
    }).catch((err) => {
      res.status().json({
        message: err.message,
      })
    });
})

router.put("/tambah-job/:_id", (req, res) => {
  industri.updateOne(
    { _id : req.params._id},
    { $push : { jobs : req.body}})
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Berhasil tambah job",
        data: {'jobs' : req.body }
      })
    })
    .catch((err) => res.json({ message: err.message }))
})

router.put("/ubah-job/:_id", (req, res) => {
  console.log(req.body)
  industri.updateOne(
    { 'jobs._id' : req.params._id}, { '$set': {
      "jobs.$.job_desc":req.body.job_desc,
    }
  
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Berhasil update job",
        data: req.body
      })
    })
    .catch((err) => res.json({ message: err.message }))
})

router.put("/add-applicants/:_id", (req, res) => {
    industri.updateOne(
      { 'jobs._id' : req.params._id },
      { $push : { 'jobs.$.applicants' : req.body} }
    )
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Berhasil mendaftar pekerjaan",
        data: {"jobs" : { 'applicants' : req.body} }
      })
    })
    
})

router.put("/ubah/:_id", (req, res) => {
  industri.updateOne(
    { _id : req.params._id }, req.body )
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Berhasil ubah Data",
        data: req.body
      })
    })
    .catch((err) => {
      res.status().json({
        message: err.message
      })
    })
})

module.exports = router;