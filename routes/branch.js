const Branch = require('../models/branch')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    branch: Joi.string().required(),
    location: Joi.string().required(),
    gps: Joi.string().required(),
    phone: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Branch.insertBranch(
    req.body.branch,
    req.body.location,
    req.body.gps,
    req.body.phone,
  )
  res.json(result[0])
})

router.get('/', (request, response) => {
  Branch.getBranches().then((result) => {
    response.json(result[0])
  })
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    branch: Joi.string().required(),
    location: Joi.string().required(),
    gps: Joi.string().required(),
    phone: Joi.string().required(),
    id: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Branch.updateBranch(
    req.body.id,
    req.body.branch,
    req.body.location,
    req.body.gps,
    req.body.phone,
  )
  res.json(result[0])
})

router.delete('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Branch.deleteBranch(req.params.id)
  res.json(result[0])
})

module.exports = router
