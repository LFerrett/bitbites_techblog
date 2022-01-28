const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "Tech Tip",
    "postContent": "Don't eat the yellow snow",
    "userId": 1
  },
  {
    "postTitle": "This is a great title",
    "postContent": "Wow a body",
    "userId": 2
  },
  {
    "postTitle": "Third Header",
    "postContent": "What a great post!",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;