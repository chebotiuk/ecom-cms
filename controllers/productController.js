var Product = require('models/product')
var { HttpError } = require('../error');

class ProductsController {
  async getView (req, res) {
    const products = await Product.find()

    res.render('products', {
      products,
    });
  }

  read (req, res, next) {
    Product.find()
      .then(products => {
        res.send(products)
      })
      .catch(next)
  }

  readOne (req, res, next) {
    Product.findById(req.params.id)
      .then(product => {
        if (product) {
          res.send(product)
        } else {
          throw new HttpError(404, 'Product not found')
        }
      })
      .catch(next)
  }

  create (req, res, next) {
    const { name, description, wholesalePrice, price, marginRatio, categoryId } = req.body

    var newProduct = new Product({
      name,
      description,
      wholesalePrice,
      price,
      marginRatio,
      categoryId,
    });

    newProduct.save(err => {
      if (err) {
        next(err)
        return
      }

      res.send()
    });
  }
}

module.exports = new ProductsController()
