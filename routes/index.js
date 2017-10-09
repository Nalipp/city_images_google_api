const express = require('express');
const router = express.Router();
const geoData = require('./geoData');

/* GET home page. */
router.get('/search', function(req, res, next) {
  console.log('req.query', req.query);
  let address = req.query.address;
  let urlCount = req.query.urlCount;
  console.log(req.query);

  console.log('address', address);
  console.log('urlCount', urlCount);

  geoData.getData(address, result => {
    let data = {
      address: result.geoData.formatted_address,
      lat: result.geoData.geometry.location.lat,
      lng: result.geoData.geometry.location.lng
    }

    geoData.getRandomizedUrls(data, urlCount, resultUrls => {
      data['urls'] = resultUrls;
      res.render('index', {data: data}); 
    });
  });


  
});

module.exports = router;

