const Staff = require('../models/staff')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    nameOfStaff: Joi.string().required(),
    dob: Joi.string().required(),
    dateEmployed: Joi.string().required(),
    qualification: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    guarantorOne: Joi.string().allow(''),
    guarantorOnePhone: Joi.string().required(),
    guarantorTwo: Joi.string().required(),
    guarantorTwoPhone: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await Staff.insertStaff(
    req.body.nameOfStaff,
    req.body.dob,
    req.body.dateEmployed,
    req.body.qualification,
    req.body.phone,
    req.body.guarantorOne,
    req.body.guarantorOnePhone,
    req.body.guarantorTwo,
    req.body.guarantorTwoPhone,
  )
  res.json(result[0])
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    id: Joi.number().required(),
    nameOfStaff: Joi.string().required(),
    dob: Joi.string().required(),
    dateEmployed: Joi.string().required(),
    qualification: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    guarantorOne: Joi.string().allow(''),
    guarantorOnePhone: Joi.string().required(),
    guarantorTwo: Joi.string().required(),
    guarantorTwoPhone: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await Staff.updateStaff(
    req.body.id,
    req.body.nameOfStaff,
    req.body.dob,
    req.body.dateEmployed,
    req.body.qualification,
    req.body.phone,
    req.body.guarantorOne,
    req.body.guarantorOnePhone,
    req.body.guarantorTwo,
    req.body.guarantorTwoPhone,
  )
  res.json(result[0])
})

router.delete('/:id', (request, response) => {
  Staff.deleteStaff(request.params.id).then((result) => {
    response.json(result[0])
  })
})

router.get('/', (request, response) => {
  Staff.getAllStaff().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
