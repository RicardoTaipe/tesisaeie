const Ads = require("../models/ads.model");
const mongoose = require("mongoose");

exports.get_all_ads = (req, res, next) => {
  Ads.find()
    .select("_id title description date")
    .sort({ date: "desc" })
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

exports.create_ad = (req, res, next) => {
  const ad = new Ads({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    date: new Date()
  });
  ad.save()
    .then(result => {
      res.status(201).json({
        message: "Created ad succesfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_ad = (req, res, next) => {
  const id = req.params.adId;
  Ads.findById(id)
    .select("_id title description date")
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

exports.update_ad = (req, res, next) => {
  console.log(req.body);
  const id = req.params.adId;

  const updateProps = { date: new Date() };

  for (const props of Object.keys(req.body)) {
    updateProps[props] = req.body[props];
  }

  Ads.updateOne({ _id: id }, { $set: updateProps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Ad updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_ad = (req, res, next) => {
  const id = req.params.adId;
  Ads.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Ad deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
