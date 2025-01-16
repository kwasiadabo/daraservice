const Vault = require('../models/vault')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    Cr: Joi.number().required(),
    narration: Joi.string().required(),
    tdate: Joi.date().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Vault.insertIntoVault(
    req.body.Cr,
    req.body.narration,
    req.body.tdate,
  )
  res.json(result[0])
})
router.get('/checkendofday/:tdate', (request, response) => {
  Vault.getCheckVaultTransfer(request.params.tdate).then((result) => {
    response.json(result[0])
  })
})

router.get('/balance', (request, response) => {
  Vault.getVaultBal().then((result) => {
    response.json(result[0])
  })
})

router.delete('/remove/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Vault.getDeleteFromVault(req.params.id)
  res.json(result[0])
})

router.put('/approve/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Vault.approveVaultEntry(req.params.id)
  res.json(result[0])
})

router.get('/', (request, response) => {
  Vault.getVault().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
