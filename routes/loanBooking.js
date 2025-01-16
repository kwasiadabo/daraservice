const LoanBooking = require('../models/loanBooking')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    customer: Joi.number().required(),
    product: Joi.number().required(),
    principal: Joi.number().required(),
    cashCollateral: Joi.number().required(),
    assetCollateral: Joi.string().required(),
    purpose: Joi.string().required(),
    firstGuarantor: Joi.string().required(),
    firstGuarantorPhone: Joi.string().required(),
    firstGuarantorGPS: Joi.string().required(),
    firstGuarantorBusiness: Joi.string().required(),
    firstGuarantorIdType: Joi.string().required(),
    firstGuarantorIdNumber: Joi.string().required(),
    firstGuarantorRelationship: Joi.string().required(),
    firstGuarantorHouseHold: Joi.string().required(),
    firstGuarantorHouseHoldPhone: Joi.string().required(),
    businessName: Joi.string().required(),
    yearsInBusiness: Joi.string().required(),
    addressOfBusiness: Joi.string().required(),
    phoneOfBusiness: Joi.string().required(),
    dailySales: Joi.number().required(),
    banks: Joi.number().required(),
    bankLocation: Joi.string().required(),
    businessPartner: Joi.string().required(),
    estimatedAssetsValue: Joi.string().required(),
    typeOfStructure: Joi.string().required(),
    directionsToResidence: Joi.string().required(),
    directionsToBusiness: Joi.string().required(),
    secondGuarantor: Joi.string().required(),
    secondGuarantorPhone: Joi.string().required(),
    secondGuarantorGPS: Joi.string().required(),
    secondGuarantorBusiness: Joi.string().required(),
    secondGuarantorIdType: Joi.string().required(),
    secondGuarantorIdNumber: Joi.string().required(),
    secondGuarantorRelationship: Joi.string().required(),
    secondGuarantorHouseHold: Joi.string().required(),
    secondGuarantorHouseHoldPhone: Joi.string().required(),
    disbursementId: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertLoanBooking(
    req.body.customer,
    req.body.product,
    req.body.principal,
    req.body.cashCollateral,
    req.body.assetCollateral,
    req.body.purpose,
    req.body.firstGuarantor,
    req.body.firstGuarantorPhone,
    req.body.firstGuarantorGPS,
    req.body.firstGuarantorBusiness,
    req.body.firstGuarantorIdType,
    req.body.firstGuarantorIdNumber,
    req.body.firstGuarantorRelationship,
    req.body.firstGuarantorHouseHold,
    req.body.firstGuarantorHouseHoldPhone,
    req.body.businessName,
    req.body.yearsInBusiness,
    req.body.addressOfBusiness,
    req.body.phoneOfBusiness,
    req.body.dailySales,
    req.body.banks,
    req.body.bankLocation,
    req.body.businessPartner,
    req.body.estimatedAssetsValue,
    req.body.typeOfStructure,
    req.body.directionsToResidence,
    req.body.directionsToBusiness,
    req.body.secondGuarantor,
    req.body.secondGuarantorPhone,
    req.body.secondGuarantorGPS,
    req.secondGuarantorBusiness,
    req.body.secondGuarantorIdType,
    req.body.secondGuarantorIdNumber,
    req.body.secondGuarantorRelationship,
    req.body.secondGuarantorHouseHold,
    req.body.secondGuarantorHouseHoldPhone,
    req.body.disbursementId,
  )
  res.json(result[0])
})

router.delete('/:id', (request, response) => {
  LoanBooking.deleteLoanBooking(request.params.id).then((result) => {
    response.json(result[0])
  })
})

router.get('/check/:customer/:disbursementId', (request, response) => {
  LoanBooking.checkEntriesBeforeSummary(
    request.params.customer,
    request.params.disbursementId,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/checkproduct/:customer', (request, response) => {
  LoanBooking.checkProductExistence(request.params.customer).then((result) => {
    response.json(result[0])
  })
})

router.get('/checkprincipal/:customer', (request, response) => {
  LoanBooking.checkPrincipalExistence(request.params.customer).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/checkfirstguarantor/:customer', (request, response) => {
  LoanBooking.checkFirstGuarantorExistence(request.params.customer).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/checksecondguarantor/:customer', (request, response) => {
  LoanBooking.checkSecondGuarantorExistence(request.params.customer).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get(
  '/paymentschedule/:disbursementid/:customer',
  (request, response) => {
    LoanBooking.getPaymentSchedule(
      request.params.disbursementid,
      request.params.customer,
    ).then((result) => {
      response.json(result[0])
    })
  },
)

router.get('/:customer/:disbursementId', (request, response) => {
  LoanBooking.getLoanBooking(
    request.params.customer,
    request.params.disbursementId,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/summary/:customer/:disbursementId', (request, response) => {
  LoanBooking.getLoanBookingSummary(
    request.params.customer,
    request.params.disbursementId,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/report/:startDate/:endDate', (request, response) => {
  LoanBooking.LoanBookingsReport(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/bookedloans', (request, response) => {
  LoanBooking.viewLoanBookings(request.params.dateCompleted).then((result) => {
    response.json(result[0])
  })
})

router.get('/booked', (request, response) => {
  LoanBooking.getLoansBooked().then((result) => {
    response.json(result[0])
  })
})

router.get('/', (request, response) => {
  Disbursement.getAllDisbursement().then((result) => {
    response.json(result[0])
  })
})

router.get('/details/:bookingId', (request, response) => {
  LoanBooking.getLoanBookedDetails(request.params.bookingId).then((result) => {
    response.json(result[0])
  })
})

router.get('/reschedule/:startDate/:endDate', (request, response) => {
  LoanBooking.getLoansForReschedule(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.post('/product', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    customer: Joi.number().required(),
    product: Joi.number().required(),
    disbursementId: Joi.number().required(),
    cashCollateral: Joi.number(),
    interestRate: Joi.number().required(),
    frequency: Joi.string().required(),
    duration: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertProductIntoLoanBooking(
    req.body.customer,
    req.body.product,
    req.body.disbursementId,
    req.body.cashCollateral,
    req.body.interestRate,
    req.body.frequency,
    req.body.duration,
  )
  res.json(result[0])
})

router.put('/principal', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    customer: Joi.number().required(),
    principal: Joi.number().required(),
    purpose: Joi.string().allow(''),
    disbursementId: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertPrincipalIntoLoanBooking(
    req.body.customer,
    req.body.principal,
    req.body.purpose,
    req.body.disbursementId,
  )
  res.json(result[0])
})

router.put('/guarantorone', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    firstGuarantorName: Joi.string().required().label('Name of Guarantor'),
    firstGuarantorGpsAddress: Joi.string().required().label('Address'),
    firstGuarantorPhone: Joi.string().required().label('Phone'),
    firstGuarantorBusiness: Joi.string().required().label('Business'),
    firstGuarantorIdType: Joi.string().required().label('ID Type'),
    firstGuarantorIdNumber: Joi.string().required().label('ID Number'),
    firstGuarantorRelationship: Joi.string().required().label('Relationship'),
    firstGuarantorHouseholdPerson: Joi.string()
      .required()
      .label('House Hold Person'),
    firstGuarantorHouseholdPersonPhone: Joi.string()
      .required()
      .label('House Hold Phone'),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertFirstGuarantor(
    req.body.customer,
    req.body.disbursementId,
    req.body.firstGuarantorName,
    req.body.firstGuarantorGpsAddress,
    req.body.firstGuarantorPhone,
    req.body.firstGuarantorBusiness,
    req.body.firstGuarantorIdType,
    req.body.firstGuarantorIdNumber,
    req.body.firstGuarantorRelationship,
    req.body.firstGuarantorHouseholdPerson,
    req.body.firstGuarantorHouseholdPersonPhone,
  )
  res.json(result[0])
})

router.put('/guarantortwo', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    secondGuarantorName: Joi.string().required().label('Name of Guarantor'),
    secondGuarantorGpsAddress: Joi.string().required().label('Address'),
    secondGuarantorPhone: Joi.string().required().label('Phone'),
    secondGuarantorBusiness: Joi.string().required().label('Business'),
    secondGuarantorIdType: Joi.string().required().label('ID Type'),
    secondGuarantorIdNumber: Joi.string().required().label('ID Number'),
    secondGuarantorRelationship: Joi.string().required().label('Relationship'),
    secondGuarantorHouseholdPerson: Joi.string()
      .required()
      .label('House Hold Person'),
    secondGuarantorHouseholdPersonPhone: Joi.string()
      .required()
      .label('House Hold Phone'),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertSecondGuarantor(
    req.body.customer,
    req.body.disbursementId,
    req.body.secondGuarantorName,
    req.body.secondGuarantorGpsAddress,
    req.body.secondGuarantorPhone,
    req.body.secondGuarantorBusiness,
    req.body.secondGuarantorIdType,
    req.body.secondGuarantorIdNumber,
    req.body.secondGuarantorRelationship,
    req.body.secondGuarantorHouseholdPerson,
    req.body.secondGuarantorHouseholdPersonPhone,
  )
  res.json(result[0])
})

router.put('/businessdetails', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    businessName: Joi.string().required(),
    yearsInBusiness: Joi.string().required(),
    addressOfBusiness: Joi.string().required(),
    phoneOfBusiness: Joi.string().required(),
    dailySales: Joi.number().required(),
    bank: Joi.string().allow(''),
    bankLocation: Joi.string().allow(''),
    businessPartner: Joi.string().allow(''),
    estimatedAssetValue: Joi.number().allow(0),
    typeOfStructure: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertBusinessDetails(
    req.body.customer,
    req.body.disbursementId,
    req.body.businessName,
    req.body.yearsInBusiness,
    req.body.addressOfBusiness,
    req.body.phoneOfBusiness,
    req.body.dailySales,
    req.body.bank,
    req.body.bankLocation,
    req.body.businessPartner,
    req.body.estimatedAssetValue,
    req.body.typeOfStructure,
  )
  res.json(result[0])
})

router.put('/directions', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    directionsToResidence: Joi.string().required(),
    directionsToBusiness: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.insertDirections(
    req.body.customer,
    req.body.disbursementId,
    req.body.directionsToResidence,
    req.body.directionsToBusiness,
  )
  res.json(result[0])
})

router.put('/complete', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    disbursementId: Joi.number().required().label('Disbursement ID'),
    customer: Joi.number().required().label('Customer'),
    period: Joi.number(),
    interestRate: Joi.number().required().label('Interest Rate'),
    dateOfBooking: Joi.date().required().label('Date of Booking'),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.completeLoanBooking(
    req.body.customer,
    req.body.disbursementId,
    req.body.period,
    req.body.interestRate,
    req.body.dateOfBooking,
  )
  res.json(result[0])
})

router.post('/reschedule', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  // console.log(req.body)
  const schema = Joi.object({
    dateCompleted: Joi.string().required().label('Date of Booking'),
    duration: Joi.number().required().label('Duration'),
    customer: Joi.number().required().label('Customer'),
    disbursementId: Joi.number().required().label('Disbursement ID'),
    bookingId: Joi.number().required().label('Booking Id'),
    chequeId: Joi.number().required().label('Cheque Id'),
    amount: Joi.number().required().label('amount'),
    interestRate: Joi.number().required().label('Interest Rate'),
    frequency: Joi.string().required().label('Frequency'),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LoanBooking.rescheduleLoanBooking(
    req.body.dateCompleted,
    req.body.duration,
    req.body.customer,
    req.body.disbursementId,
    req.body.bookingId,
    req.body.chequeId,
    req.body.amount,
    req.body.interestRate,
    req.body.frequency,
  )
  res.json(result[0])
})

module.exports = router
