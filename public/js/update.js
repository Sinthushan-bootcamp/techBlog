const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    urlArray = window.location.href.split('/');
    const id = urlArray[urlArray.length - 1];
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
const deletePostHandler = async (event) => {
    urlArray = window.location.href.split('/');
    const id = urlArray[urlArray.length - 1];
    event.preventDefault();
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create post');
    }
};


document.querySelector('#deleteBtn').addEventListener('click', deletePostHandler);
  document
    .querySelector('.update-form')
    .addEventListener('submit', updatePostHandler);

