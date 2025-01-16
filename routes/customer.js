const Customers = require('../models/customer')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const Joi = require('joi')

const upload = multer({
  limits: {
    files: 1, // allow only 1 file per request
    //fileSize: 1024 * 1024, // 1 MB (max file size)
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please Upload a jpg,jpeg or png file'))
    }
    cb(undefined, true)
  },
})

router.post('/', upload.single('img'), async (req, res) => {
  console.log(req.body)
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    fullName: Joi.string().required().label('Name'),
    dob: Joi.string().required().label('Date of Birth'),
    phone: Joi.string().required().label('Phone Number'),
    hometown: Joi.string().allow(''),
    placeOfBirth: Joi.string().allow(''),
    occupation: Joi.string().allow(''),
    nationality: Joi.string().allow(''),
    gender: Joi.string().required().label('Gender'),
    residentialAddress: Joi.string().allow(''),
    ghanaPostGPS: Joi.string().required().label('GPS Address'),
    directions: Joi.string().allow(''),
    idType: Joi.string().required().label('ID Type'),
    idNumber: Joi.string().required().label('ID Number'),
    marritalStatus: Joi.string().allow(''),
    nameOfSpouse: Joi.string().allow(''),
    phoneOfSpouse: Joi.string().allow(''),
    occupationOfSpouse: Joi.string().allow(''),
    religion: Joi.string().allow(''),
    placeOfWorship: Joi.string().allow(''),
    leaderOfPlaceOfWorship: Joi.string().allow(''),
    phoneOfPlaceOfWorship: Joi.string().allow(''),
    assignedOfficer: Joi.number().required('Assigned Staff'),
    association: Joi.number().allow(''),
    img: Joi.any(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    console.log(error)
    return res.status(400).send(error.details[0].message)
  }

  const buff = await sharp(req.file.buffer)
    .resize({ width: 130, height: 160 })
    .png()
    .toBuffer()
  const result = await Customers.insertCustomers(
    req.body.fullName,
    req.body.dob,
    req.body.phone,
    req.body.hometown,
    req.body.placeOfBirth,
    req.body.occupation,
    req.body.nationality,
    req.body.gender,
    req.body.residentialAddress,
    req.body.ghanaPostGPS,
    req.body.directions,
    req.body.idType,
    req.body.idNumber,
    req.body.marritalStatus,
    req.body.nameOfSpouse,
    req.body.phoneOfSpouse,
    req.body.occupationOfSpouse,
    req.body.religion,
    req.body.placeOfWorship,
    req.body.leaderOfPlaceOfWorship,
    req.body.phoneOfPlaceOfWorship,
    req.body.assignedOfficer,
    req.body.association,
    buff,
  )
  res.json(result[0])
  console.log(req.body)
})

router.put('/', upload.single('img'), async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    fullName: Joi.string().allow(''),
    gender: Joi.string().allow(''),
    id: Joi.number(),
    dob: Joi.string().required(),
    phone: Joi.string().allow(''),
    hometown: Joi.string().allow(''),
    placeOfBirth: Joi.string().allow(''),
    nationality: Joi.string().allow(''),
    occupation: Joi.string().allow(''),
    residentialAddress: Joi.string().allow(''),
    ghanaPostGPS: Joi.string().allow(''),
    idType: Joi.string().allow(''),
    idNumber: Joi.string().allow(''),
    directions: Joi.string().allow(''),
    marritalStatus: Joi.string().allow(''),
    nameOfSpouse: Joi.string().allow(''),
    phoneOfSpouse: Joi.string().allow(''),
    occupationOfSpouse: Joi.string().allow(''),
    religion: Joi.string().allow(''),
    placeOfWorship: Joi.string().allow(''),
    leaderOfPlaceOfWorship: Joi.string().allow(''),
    phoneOfPlaceOfWorship: Joi.string().allow(''),
    assignedOfficer: Joi.number(),
    association: Joi.any().allow(),
    img: Joi.any(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const buff = await sharp(req.file.buffer)
    .resize({ width: 130, height: 160 })
    .png()
    .toBuffer()
  const result = await Customers.updateCustomers(
    req.body.id,
    req.body.fullName,
    req.body.hometown,

    req.body.dob,
    req.body.placeOfBirth,
    req.body.occupation,

    req.body.phone,
    req.body.nationality,
    req.body.gender,
    req.body.residentialAddress,
    req.body.ghanaPostGPS,
    req.body.directions,
    req.body.idType,
    req.body.idNumber,
    req.body.marritalStatus,
    req.body.nameOfSpouse,
    req.body.phoneOfSpouse,
    req.body.occupationOfSpouse,
    req.body.religion,
    req.body.placeOfWorship,
    req.body.leaderOfPlaceOfWorship,
    req.body.phoneOfPlaceOfWorship,
    req.body.assignedOfficer,
    req.body.association,
    buff,
  )
  res.json(result[0])
})

router.put('/noimg', async (req, res) => {
  console.log(req.body)
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    fullName: Joi.string().allow(''),
    gender: Joi.string().allow(''),
    id: Joi.number(),
    dob: Joi.string().required(),
    phone: Joi.string().allow(''),
    hometown: Joi.string().allow(''),
    placeOfBirth: Joi.string().allow(''),
    nationality: Joi.string().allow(''),
    occupation: Joi.string().allow(''),
    residentialAddress: Joi.string().allow(''),
    ghanaPostGPS: Joi.string().allow(''),
    idType: Joi.string().allow(''),
    idNumber: Joi.string().allow(''),
    directions: Joi.string().allow(''),
    marritalStatus: Joi.string().allow(''),
    nameOfSpouse: Joi.string().allow(''),
    phoneOfSpouse: Joi.string().allow(''),
    occupationOfSpouse: Joi.string().allow(''),
    religion: Joi.string().allow(''),
    placeOfWorship: Joi.string().allow(''),
    leaderOfPlaceOfWorship: Joi.string().allow(''),
    phoneOfPlaceOfWorship: Joi.string().allow(''),
    assignedOfficer: Joi.number().allow(),
    association: Joi.any(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Customers.updateCustomerWithoutImage(
    req.body.id,
    req.body.fullName,
    req.body.hometown,

    req.body.dob,
    req.body.placeOfBirth,
    req.body.occupation,

    req.body.phone,
    req.body.nationality,
    req.body.gender,
    req.body.residentialAddress,
    req.body.ghanaPostGPS,
    req.body.directions,
    req.body.idType,
    req.body.idNumber,
    req.body.marritalStatus,
    req.body.nameOfSpouse,
    req.body.phoneOfSpouse,
    req.body.occupationOfSpouse,
    req.body.religion,
    req.body.placeOfWorship,
    req.body.leaderOfPlaceOfWorship,
    req.body.phoneOfPlaceOfWorship,
    req.body.assignedOfficer,
    req.body.association,
  )
  res.json(result[0])
})

router.post('/reassign', async (req, res) => {
  console.log(req.body)
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    officer: Joi.number().required(),
    newOfficer: Joi.number().required(),
    customer: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Customers.reAssignCustomerToOfficer(
    req.body.officer,
    req.body.newOfficer,
    req.body.customer,
  )
  res.json(result[0])
})

router.post('/assignOfficer', async (req, res) => {
  //console.log(req.body)
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    officer: Joi.number().required(),
    reason: Joi.string().allow(''),
    customer: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Customers.assignOfficer(
    req.body.officer,
    req.body.customer,
    req.body.reason,
  )
  res.json(result[0])
})

router.get('/count/customerCount', (request, response) => {
  Customers.customersCount().then((result) => {
    response.json(result[0])
  })
})

router.get('/officers/off', (request, response) => {
  Customers.Officers().then((result) => {
    response.json(result[0])
  })
})

router.get('/:id', (request, response) => {
  Customers.getCustomer(request.params.id).then((result) => {
    response.json(result[0])
  })
})

router.get('/officer/:officer', (request, response) => {
  Customers.getCustomerByOfficer(request.params.officer).then((result) => {
    response.json(result[0])
  })
})

router.get('/', (request, response) => {
  Customers.getAllCustomers().then((result) => {
    response.json(result[0])
  })
})

router.get('/userbynamepass/:UserName/:Password', (request, response) => {
  users
    .getUserByUserPassword(request.params.UserName, request.params.Password)
    .then((result) => {
      response.json(result[0])
    })
})

module.exports = router
