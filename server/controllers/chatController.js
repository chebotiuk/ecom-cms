class ChatController {
  getView (req, res) {
    res.render('chat')
  }
}

module.exports = new ChatController()
