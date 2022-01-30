const { Post } = require('../models');

const postdata =
[
  {
    "post_title": "Tech Tip",
    "postContent": "Don't eat the yellow snow",
    "userId": 1
  },
  {
    "post_title": "This is a great title",
    "postContent": "Wow a body",
    "userId": 2
  },
  {
    "post_title": "Third Header",
    "postContent": "What a great post!",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;