const industri = require("../models/industri");
const user = require("../models/user");


let addApplicants = async (id_job, body, id) => {

  let user = await user.findOne({'_id' : id})

  let applicants = await industri.findOneAndUpdate(
    {'jobs._id' : id_job},
    { $push : { 'jobs.$.applicants' : body} },
    {
      "fields": { "jobs":0, },
     }
  )

  console.log(user);

  const applicantsNotFound = !applicants;
  if (applicantsNotFound) {
    console.log("gagal woy")
  } else {
    return applicants;
  }
}

let addIndustri = async (idUser, applicants) => {

  let industris = await user.findOneAndUpdate(
    { _id: idUser },
    { $push : { 'industri' : applicants }}
    )

  const industriNotFound = !industris;
  if (industriNotFound) {
    console.log(" gagal :( ")
  } else {
    return industris
  }
}

module.exports = { addApplicants, addIndustri }