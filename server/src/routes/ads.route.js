const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AdsController = require("../controllers/ads.controller");

//Show all ads
router.get("/", AdsController.get_all_ads);

//Add a new Ad
router.post("/", auth, AdsController.create_ad);
//Show a Ad by Id
router.get("/:adId", auth, AdsController.get_ad);
//Update a Ad by Id
router.put("/:adId", auth, AdsController.update_ad);
//Delete a Ad by Id
router.delete("/:adId", auth, AdsController.delete_ad);

module.exports = router;
