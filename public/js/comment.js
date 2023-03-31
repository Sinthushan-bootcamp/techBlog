
const createCommentHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const content = document.querySelector('#content').value.trim();
    console.log(content);
    urlArray = window.location.href.split('/');
    const id = urlArray[urlArray.length - 1];
    console.log(id);
    if (content) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, post_id: id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

document
.querySelector('.comment-form')
.addEventListener('submit', createCommentHandler);