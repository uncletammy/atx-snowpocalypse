module.exports = function(req,res) {

  let allParams = req.allParams();

  console.log('saving locations', allParams);

  Location
  .destroy({
    address: allParams.address.toLowerCase(),
  })
  .then(() => {

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
    .catch(() => {
      return res.serverError();
    })
    .then(() => {
      return res.ok();
    })

  })
  .catch(() => {
    return res.serverError();
  })

}