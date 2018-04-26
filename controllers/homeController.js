class HomeController {
  getView (req, res) {
    res.render('home', {
      title: '<u>Hello, It is a first page on Node.js app</u>',
      condition: true,
      listArr: ['Test task from array 1', 'Test task from array 2', 'Test task from array 3']
    });
  }
}

module.exports = new HomeController()
