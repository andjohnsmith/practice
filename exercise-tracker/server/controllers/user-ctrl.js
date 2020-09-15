const User = require('../models/user-model');

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide user details',
    });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    });
  });
};

retrieveUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      res.status(400).json({ success: false, error: err });
    }
    return res.status(200).json({ success: true, users });
  }).catch((err) => console.log(err));
};

module.exports = {
  createUser,
  retrieveUsers,
};
