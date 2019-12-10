const Locker = require("../models/locker.model");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.get_all_lockers = (req, res, next) => {
  let free = req.query.free;
  console.log(free);
  if (free === "true") {
    Locker.find({ free: true, state: true })
      //.select("_id name description")
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  } else {
    Locker.find()
      .where({ state: true })
      .populate("student")
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
};

exports.create_locker = (req, res, next) => {
  const locker = new Locker({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    free: true
  });
  locker
    .save()
    .then(result => {
      res.status(201).json({
        message: "Casillero creado exitosamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_locker = (req, res, next) => {
  const id = req.params.lockerId;
  Locker.findById(id)
    //.select("_id name description")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found id for provided Id" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.update_locker = (req, res, next) => {
  const id = req.params.lockerId;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Locker.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Casillero actualizado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_locker = (req, res, next) => {
  const id = req.params.lockerId;
  Locker.updateOne({ _id: id }, { state: false })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Casillero eliminado"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.alquilar_locker = (req, res, next) => {
  const { lockerId } = req.params;
  const updateProps = {};

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Locker.updateOne({ _id: lockerId }, { $set: updateProps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Alquiler registrado exitosamente"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};

exports.terminar_alquiler = (req, res, next) => {
  const { lockerId, studentId } = req.params;
  Locker.findOne({ _id: lockerId }, (err, lock) => {
    if (err) {
      res.status(500).json({
        message: err
      });
    }
    lock.student = undefined;
    lock.free = true;
    lock.valor = undefined;
    lock.save((err, doc) => {
      if (err) {
        res.status(500).json({
          message: err
        });
      }
      res.status(200).json({
        message: "El alquiler  ha terminado"
      });
    });
  });
};

exports.notify_locker = (req, res, next) => {
  const { email, casillero } = req.body;
  const msg = {
    to: email,
    from: "asoelectronica.epn@gmail.com",
    subject: "AEIE RETIRO DE PERTENENCIAS PERSONALES",
    text: `Estimado/a estudiante, por favor acercarse a retirar sus pertenencias personales del casillero ${casillero} en caso de no renovar el alquiler del casillero`
    //html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        message: "Notificacion enviada"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
};
