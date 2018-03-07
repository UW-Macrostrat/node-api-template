const api = require('./api')
const larkin = require('./larkin')

/*
  Here you could create pools or connections to databases
*/
larkin.connectMySQL()

api.route('/test')
  .get((req, res, next) => {
    larkin.queryMySQL(req, res, 'call generate_series(1,1000000)', [])
  })

// api.route('/test')
//   .get((req, res, next) => {
//     console.log('here')
//     larkin.queryMySQL('call generate_series(1,1000000)', [], (error, result) => {
//       larkin.sendData(req, res, next, {
//         format: (api.acceptedFormats.standard[req.query.format]) ? req.query.format : "json",
//         bare: (api.acceptedFormats.bare[req.query.format]) ? true : false
//       }, {
//         data: result
//       });
//     })
//   })
  
api.route('/')
  .get(require('./routes/root'))

api.route('/types')
  .get(require('./routes/types'))

api.route('/hidden')
  .get(require('./routes/hidden'))

api.route('*')
  .get(require('./routes/catchall'))

api.use(function(err, req, res, next) {
  if (err.status !== 404) {
    return next()
  } else if (err.status === 404) {
    larkin.error(req, res, next, '404: Page not found', 404)
  } else {
    larkin.error(req, res, next, '500: Internal Server Error', 500)
  }
})

module.exports = api
