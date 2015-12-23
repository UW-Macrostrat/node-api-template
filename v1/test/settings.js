module.exports = {
  port: 5555,
  get host () {
    return "http://localhost:" + this.port
  }
}
