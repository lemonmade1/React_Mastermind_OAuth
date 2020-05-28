const express = require('express');
const router = express.Router();

const scoresCtrl = require('../../controllers/scores');

router.get('/', scoresCtrl.highScores);

/*----- Helper Functions -----*/
const checkAuth = (req, res, next) => {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.post('/', checkAuth, scoresCtrl.create);

module.exports = router;