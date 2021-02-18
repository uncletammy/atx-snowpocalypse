/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  let locationCount = await Location.count();

  if (locationCount <=1) {
    await Location.create({
      address: '4900 Creekline Dr, Austin, TX 78745, USA'.toLowerCase(),
      lat : 30.21455,
      lng : -97.77618079999999,
      water: true,
      electricity: true,
      naughty: false
    });
  }

  return;

};
