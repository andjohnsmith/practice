const User = require('../models/user-model');

createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide user details',
    });
  }

  const username = req.body.username;
  console.log(req.body);
  const user = new User({ username });

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: user._id,
        message: 'User created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: 'User not created!' });
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
