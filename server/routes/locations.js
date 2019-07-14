const router = require('express').Router();
const passport = require('passport');
const locationController = require('../controllers/locations');
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(passportJWT, locationController.find);

router.route('/search')
  .post(passportJWT, locationController.search);

router.route('/upload')
  .post(passportJWT, locationController.upload);


module.exports = router;