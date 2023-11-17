fetch('../api/blog/list')
    .then(response => response.json())
    .then(data => {
        const blogListContainer = document.getElementById('blogList');
        const blogData = JSON.parse(data.message);

        blogData.forEach(blog => {
            const blogEntry = document.createElement('div');
            blogEntry.classList.add('blog-entry');

            const titleElement = document.createElement('h2');
            titleElement.textContent = blog.title;

            const authorElement = document.createElement('p');
            authorElement.textContent = 'Author: ' + blog.author;

            const contentElement = document.createElement('p');
            contentElement.textContent = blog.content;

            blogEntry.appendChild(titleElement);
            blogEntry.appendChild(authorElement);
            blogEntry.appendChild(contentElement);

            blogListContainer.appendChild(blogEntry);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
