const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Add the SECRET
const SECRET = process.env.SECRET;

module.exports = {
  signup
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();

    const token = createJWT(user)

    // TODO: Send back a JWT instead of the user
    res.json({ token });
  } catch (err) {

    // Probably a duplicate email
    res.status(400).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}