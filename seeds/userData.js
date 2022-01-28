const { User } = require('../models');

const userdata =
[
  {
    "username": "Lauren",
    "password": "lauren"
  },
  {
    "username": "Mattie",
    "password": "mattie"
  },
  {
    "username": "Dustin",
    "password": "dustin"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;

