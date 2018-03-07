const express = require('express')
const cors = require('cors')
const api = express.Router()

api.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST']
}))

api.acceptedFormats = {
  'standard': {
    'json': true,
    'csv': true
  },
  'geo': {
    'geojson': true,
    'topojson': true,
  }
}

api.version = 1
api.license = 'CC-BY 4.0'

// Export the module
module.exports = api
