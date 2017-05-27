const Discord = require('discord.js')
const param = require('param')

const Command = require('./src/command')
const bnet = require('./src/actions/bnet')

const bot = new Discord.Client()

bot.on('ready', () => {
  console.log('I\'m ready!')
})

bot.on('message', (message) => {
  if (message.author.id === bot.user.id) return

  const command = Command.parse(message.content)

  if (!command) return

  switch (command.name) {
    case 'bnet':
      return bnet(bot, message)
    case 'bnet-register':
      return bnet.register(bot, message, command.args)
  }
})

bot.login(param('bot.token'))
