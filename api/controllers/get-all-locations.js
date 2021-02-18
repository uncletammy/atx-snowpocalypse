module.exports = function(req,res) {

  console.log('Fetching locations');

  Location.find({}).exec(function(nope, allLocations) {
    if (nope) {
      console.log('ERROR!', nope.message);
      return res.serverError();
    }

    console.log('Got locations:', allLocations);
    return res.ok(allLocations);

  });

}
