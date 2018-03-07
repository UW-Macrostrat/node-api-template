const async = require('async')
const csv = require('csv-express')
const api = require('./api')
const meta = require('./meta')

const mysql = require('mysql')
const credentials = require('./credentials')
/*

Optional database modules

var mysql = require('mysql'),
    pg = require('pg'),
    credentials = require('./credentials')
*/

let larkin = {}

// If you want to use MySQL / MariaDB
larkin.connectMySQL = () => {
  // Non-blocking FTW
  this.pool = mysql.createPool(credentials.mysql)

  // Verify a connection has been made
  this.pool.getConnection((error, connection) => {
    if (error) {
      throw new Error('Unable to connect to MySQL. Please check your credentials')
    }
  })

  this.pool.on('connection', (connection) => {
    // We could in theory take note of each query for analytics here...
    // Or set a session, etc...
  })
}

larkin.queryMySQL = (req, res, sql, params) => {
  this.pool.getConnection((err, connection) => {
    let query = connection.query(sql, params)
    query
      .on('error', (error) => {
        // Remove the connection
        connection.release()
      })
      .on('fields', (fields) => {
        // the field packets for the rows to follow
        res.type('json')
        res.write('[')
      })
      .on('result', (row) => {
        // Pausing the connnection is useful if your processing involves I/O
        res.write(new Buffer(JSON.stringify(row)))

        // connection.pause()
        // 
        // processRow(row, () => {
        //   connection.resume()
        // })
      })
      .on('end', () => {
        // Remove the connection
        connection.release()
        res.write(']')
        res.status(200).end()
      })
  })
}
// 
// larkin.queryMySQL = (sql, params, callback) => {
//   this.pool.getConnection((err, connection) => {
//     connection.query(sql, params, (error, result) => {
//       // Remove the connection
//       connection.release()
//       if (error) {
//         return callback(error)
//       }
// 
//       callback(null, result)
// 
//     })
//   })
// }

  // If you want to use Postgres
larkin.queryPg = (db, sql, params, callback) => {
  pg.connect(`postgres://${credentials.pg.user}@${credentials.pg.host}/${db}`, (err, client, done) => {
    if (err) {
      console.log('error connecting to postgres', err)
      done()
      return callback(err)
    }
    let query = client.query(sql, params, (err, result) => {
      done()
      if (err) {
        return callback(err)
      }
      callback(null, result);
    })
  //  console.log(query.text, query.values);
  })
}

larkin.sendData = (req, res, next, options, outgoing) => {
  if (options && options.format === 'csv') {
    return res.csv(outgoing.data, true)
  }

  if (options && options.bare) {
    return res
      .set('Content-type', 'application/json charset=utf-8')
      .send(JSON.stringify(outgoing.data, null, 0))
  }

  larkin.finishSend(req, res, next, options, outgoing)
}

larkin.finishSend = (req, res, next, options, outgoing) => {
  let responseObject = {
    'v': api.version,
    'license': api.license,
    'data': outgoing.data
  }

  if ((options && options.compact) || outgoing.data.length <= 5) {
    return res
      .set('Content-type', 'application/json charset=utf-8')
      .send(JSON.stringify(responseObject, null, 0))
  }

  return res.json(responseObject)
}


larkin.info = function(req, res, next) {
  let formatted = req.originalUrl.replace(`/api/v${api.version}`, '').replace('/api', '').replace(/\/$/, '')
  this.defineRoute(formatted, (error, definition) => {
    if (error) {
      // TODO: Handle error
    }
    res.json({
      'success': definition
    })
  })
}

larkin.log = (file, line, msg) => {
  let date = new Date()
  let filename = file.split('/')

  console.log(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}  ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${date.getSeconds()}  ${filename[filename.length - 1]}  ${line}  ${msg}`)
}


// Send an error to the client
larkin.error = (req, res, next, message, code) => {
  let responseMessage = (message) ? message : 'Something went wrong.'

  res.status((code) ? code : 500)
  res.json({
      error: {
        message: responseMessage
      }
    })
}


// Will return all field definitions
larkin.defineFields = (route, callback) => {
  let routemeta = {}
  async.each(meta[route].options.fields, (field, callback) => {
    if (meta.define.hasOwnProperty(field)) {
      routemeta[field] = meta.define[field]
    } else {
      routemeta[field] = ''
    }
    callback()
  }, (error, result) => {
    callback(error, routemeta)
  })
}

// Get the metadata for a given route
larkin.defineRoute = (route, callback) => {
  this.defineFields(route, (error, fields) => {
    let routeDefinition = {
      'v': api.version,
      'description': meta[route].description,
      'options': {
        'parameters': meta[route].options.parameters,
        'output_formats': meta[route].options.output_formats,
        'examples': meta[route].options.examples
      }
    }
    routeDefinition.options.fields = fields
    callback(null, routeDefinition)
  })
}


module.exports = larkin
