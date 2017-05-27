const test = require('tape')

const Command = require('../src/command')

test(`Create simple command without args`, (t) => {
  const name = 'test'
  const command = new Command(name)

  t.same(command.name, 'test', `Name should be the same`)
  t.same(command.args.length, 0, `Args should have same length`)
  t.end()
})

test(`Create simple command with args`, (t) => {
  const name = 'test'
  const args = ['foo', 'bar']
  const command = new Command(name, args)

  t.same(command.name, 'test', `Name should be the same`)
  t.same(command.args.length, 2, `Args should have same length`)
  t.same(command.args, ['foo', 'bar'], `Args should be the same`)
  t.end()
})

test(`Create simple command with capitalized name`, (t) => {
  const name = 'Test'
  const command = new Command(name)

  t.same(command.name, 'test', `Name should be the same without capital letters`)
  t.end()
})

test(`Parse command string without args`, (t) => {
  const command = Command.parse('!test')

  t.same(command.name, 'test', `Name should be the same`)
  t.end()
})

test(`Parse command string with args`, (t) => {
  const command = Command.parse('!test foo bar')

  t.same(command.name, 'test', `Name should be the same`)
  t.same(command.args.length, 2, `Args should have length of two (2)`)
  t.same(command.args, ['foo', 'bar'], `Args should be the same`)
  t.end()
})
