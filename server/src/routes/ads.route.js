const express = require("express");
const router = express.Router();

const AdsController = require("../controllers/ads.controller");

//Show all ads
router.get("/", AdsController.get_all_ads);

//Add a new Ad
router.post("/", AdsController.create_ad);
//Show a Ad by Id
router.get("/:adId", AdsController.get_ad);
//Update a Ad by Id
router.patch("/:adId", AdsController.update_ad);
//Delete a Ad by Id
router.delete("/:adId", AdsController.delete_ad);

module.exports = router;
