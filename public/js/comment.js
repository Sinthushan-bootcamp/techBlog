
const createCommentHandler = async (event) => {
    event.preventDefault(); //stops normal submission process

    const content = document.querySelector('#content').value.trim(); //get comment from content field
    // get post id
    urlArray = window.location.href.split('/');
    const id = urlArray[urlArray.length - 1];
    // if a comment was written then call the create comment api route
    if (content) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, post_id: id}), // pass in the comment and the post id as the body of the post request
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`); // redirect back to the post once comment has been created
      } else {
        alert('Failed to create comment');
      }
    }
  };
// event listener to check if comment form has been submitted
document
.querySelector('.comment-form')
.addEventListener('submit', createCommentHandler);