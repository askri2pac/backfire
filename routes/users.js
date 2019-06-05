const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', userController.postSignup);

/*router.get('/signup', function(req, res, next) {
  res.send('respond with a resource');
});*/

module.exports = router;
