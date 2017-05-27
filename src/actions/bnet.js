const db = require('../db')

const code = (message, usage) => {
  message.channel.send(usage, { code: true })
}

const bnet = (bot, message) => {
  const usage = `Usage: !bnet <@user>`

  const users = Array.from(message.mentions.users.values())

  if (!users.length || users.length > 1) return code(message, usage)

  const user = users[0]

  db.bnet.findOne({ uid: user.id }, (err, bnet) => {
    if (err) return //TODO: Handle error
    if (!bnet) return message.reply(`Sorry, I couldn't find any Battle.net tag registered for that user.`)
    message.reply(`The user you were looking for have registered the Battle.net tag: ${bnet.bid}.`)
  })
}

bnet.register = (bot, message, args) => {
  const usage = `Usage: !bnet-register <tag>`

  if (!args.length || args.length > 1) return code(message, usage)

  const uid = message.author.id
  const bid = args[0]

  db.bnet.findAndModify({
    query: { uid: uid },
    update: { $set: { bid: bid } },
    upsert: true,
    new: true
  }, (err, bnet) => {
    if (err) return //TODO: Handle error
    return message.reply(`You have been registered with Battle.net tag: ${bid}.`)
  })
}

module.exports = bnet
