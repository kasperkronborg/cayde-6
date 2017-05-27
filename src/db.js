const mongojs = require('mongojs')
const param = require('param')

const db = mongojs(param('db.url'), ['bnet'])

db.bnet.createIndex({ uid: 1, bid: 1 }, { unique: true })

module.exports = db
