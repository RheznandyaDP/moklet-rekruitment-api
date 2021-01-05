const express = require('express');
const router = express.Router();
// const user = require('../models/user');
// const industri = require('../models/industri');
// const userService = require('../service/user')
const transaksiService = require('../service/transaksiService')


router.put("/:_id/:idUser", async (req, res) => {
  const applicants = await transaksiService.addApplicants(req.params._id,req.body, req.params.idUser);
  const industri = await transaksiService.addIndustri(req.params.idUser, applicants);
  const data = {...applicants._doc, ...industri._doc};

  if (applicants && industri) {
    return res.status(300).send(data) 
  } else {
    return res.status(404).send("gagal")
  }
})

module.exports = router;

