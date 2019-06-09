'use strict'

const config = require('config')
const logger = require('log4js').getLogger('DBMain')

const db = require('knex')({
  client: 'mysql2',
  connection: config.get('db_main'),
  pool: { min: 0, max: 100 }
}).on('query', q => logger.debug(q.sql, q.bindings))

module.exports.db = db
