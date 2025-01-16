const Association = require('../models/association')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    association: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await Association.insertAssociation(req.body.association)
  res.json(result[0])
})

router.get('/', (request, response) => {
  Association.getAllAssociations().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
