const regex = /^!([^\s]+)(?:\s([\W\w\t .]+))?/

class Command {
  constructor(name, args=[]) {
    this.name = name.toLowerCase()
    this.args = args
  }
}

Command.parse = (string) => {
  const matches = regex.exec(string) || []

  if (matches.length) {
    const name = matches[1]

    if (matches[2]) { // has args
      const args = matches[2].split(' ')

      return new Command(name, args)
    }

    return new Command(name)
  }

  return null
}

module.exports = Command
