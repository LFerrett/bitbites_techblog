const newFormHandler = async function(event) {
  event.preventDefault();

  const post_title = document.querySelector('input[name="post_title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      post_title: post_title,
      postContent: postContent,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler);