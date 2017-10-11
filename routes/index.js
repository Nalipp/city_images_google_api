const express = require('express');
const router = express.Router();
const geoData = require('./geoData');

router.get('/', function(req, res, next) {
  res.redirect('/search');
});

router.get('/search', function(req, res, next) {

  let address = req.query.address;
  let urlCount = req.query.urlCount;

  geoData.getData(address, result => {
    if (result.geoData) {
      let data = {
        address: result.geoData.formatted_address,
        lat: result.geoData.geometry.location.lat,
        lng: result.geoData.geometry.location.lng
      }

      geoData.getRandomizedUrls(data, urlCount, resultUrls => {
        data['urls'] = resultUrls;
        res.render('index', {data: data}); 
      });
    } else {
      res.render('index', {data: data = { 
        address: "not found", 
        urls: []
      }});
    }

  });
});

module.exports = router;

