const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim(); //get UPDATED post title from title field
    const content = document.querySelector('#content').value.trim(); //get UPDATED post content from content field
    // get post id
    urlArray = window.location.href.split('/');
    const id = urlArray[urlArray.length - 1];
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, { //call the update method on the /api/posts/:id route
        method: 'PUT',
        body: JSON.stringify({ title, content }), // include title and content in put request body
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // redirect to dashboard after post has been updated
      } else {
        alert('Failed to create post');
      }
    }
  };
  
const deletePostHandler = async (event) => {
    event.preventDefault();
    // get post id
    urlArray = window.location.href.split('/');
    const id = urlArray[urlArray.length - 1];

    const response = await fetch(`/api/posts/${id}`, { //call the delete method on the /api/posts/:id route
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
    if (response.ok) {
        document.location.replace('/dashboard'); // redirect to dashboard after post has been deleted
    } else {
        alert('Failed to create post');
    }
};

  // event listener to check if delete button was clicked
document.querySelector('#deleteBtn').addEventListener('click', deletePostHandler);
  // event listener to check if update post form has been submitted  
document.querySelector('.update-form').addEventListener('submit', updatePostHandler);

