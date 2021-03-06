const Sale = require("../models/sale.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.get_all_sales = (req, res, next) => {
  Sale.find()
    //.select('_id name description')
    .sort({ date: "desc" })
    .populate("user")
    .populate("products.product")
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.create_sale = async (req, res, next) => {
  UpdateStock(req.body.products, respuesta => {
    if (respuesta == false) {
      return res.json({
        mensaje: "No hay productos para guardar"
      });
    }
    const sale = new Sale({
      _id: new mongoose.Types.ObjectId(),
      date: req.body.date,
      total_value: req.body.total_value,
      products: respuesta,
      user: req.body.user
    });

    sale
      .save()
      .then(result => {
        res.status(201).json({
          message: "Venta creada exitosamente",
          createdSale: {
            result
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};

UpdateStock = async (products, callback) => {
  let productos_id = [];
  products.forEach(element => {
    productos_id.push(element.product);
  });

  let respuesta = [];
  Product.find({})
    .where("_id")
    .in(productos_id)
    .exec(async (err, data) => {
      for (let i = 0; i < data.length; i++) {
        let cantidad = products.find(p => p.product == data[i]._id).quantity;

        if (cantidad <= data[i].stock) {
          cantidad_nueva = data[i].stock - cantidad;

          let modifico = await Product.findOneAndUpdate(data[i]._id, {
            stock: cantidad_nueva
          });

          if (modifico != false) {
            respuesta.push({
              product: mongoose.Types.ObjectId(data[i]._id),
              quantity: cantidad
            });
          }
        }
      }

      callback(respuesta.length == 0 ? false : respuesta);
    });
};

exports.get_sale = (req, res, next) => {
  const id = req.params.saleId;
  Sale.findOne(id)
    //.select('name price _id')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found id for provided Id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update_sale = (req, res, next) => {
  const id = req.params.saleId;

  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Sale.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Sale updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_sale = (req, res, next) => {
  const id = req.params.saleId;
  Sale.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Sale deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
