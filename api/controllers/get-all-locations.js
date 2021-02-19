module.exports = function(req,res) {

  console.log('Fetching locations');

  Location.find({}).exec(function(nope, allLocations) {
    if (nope) {
      console.log('ERROR!', nope.message);
      return res.serverError();
    }

    return res.ok(allLocations);

  });

}
