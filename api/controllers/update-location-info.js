module.exports = function(req,res) {

  let allParams = req.allParams();

  console.log('saving locations', allParams);

  Location
  .destroy({
    address: allParams.address.toLowerCase(),
  })
  .exec(function(nope) {
    Location
    .create({
      address: allParams.address.toLowerCase(),
      electricity: allParams.electricity,
      water: allParams.water,
      meta: allParams.meta,
      lat: allParams.lat,
      lng: allParams.lng,
      naughty: allParams.naughty,
      name: allParams.name
    })
    .exec(function(nope, locationRecord) {
      return res.ok();
    });
  });
}