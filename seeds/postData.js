const { Post } = require('../models');

const postdata =
[
  {
    "post_title": "Be good at one server-side technology, but know the others too!",
    "postContent": "As a full-stack developer you should understand all the principles of the interaction between the client and the server, how to choose the right architecture for the current web project and set up a good-quality environment in which your web application can thrive.",
    "userId": 1
  },
  {
    "post_title": "Pick a Specialty",
    "postContent": "The overall point of a full-stack developer role is being able to do anything that needs doing. The role of a full-stack developer is ever-changing, where you may be working on web development one day, database management the next, and server administration a week later. Being able to pivot and apply your knowledge across platforms and disciplines is the core of a good developer.",
    "userId": 2
  },
  {
    "post_title": "Perfect Your Deployment Skills",
    "postContent": "Once you have your tools in place, the next step is to learn to deploy your front-end on the internet. At this stage, the development process is complete, and you’ve tested the website. All that’s left to do is to push the product to a live server. The right deployment skills will help a developer ensure there are no asset losses.",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;