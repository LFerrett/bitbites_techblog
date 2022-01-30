const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('input[name="post_title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_title,
      postContent,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update your post');
  }
  document.location.replace('/dashboard');
};

const deleteClickHandler = async () => {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
