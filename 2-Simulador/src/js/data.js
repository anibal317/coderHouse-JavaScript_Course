let sectionBlogCard = document.getElementById('blog');

fetch('../src/data/json/data.json')
    .then(response => response.json())
    .then(datos => {
        sectionBlogCard.innerHTML = ''
        datos.forEach(comment => {
            sectionBlogCard.innerHTML += `
            <div class="card col-4" style="width: 18rem;">
                <div class="card-body text-center">
                    <h5 class="card-title">${comment.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${comment.email}</h6>
                    <p class="card-text">${comment.body}</p>
                    <div class="alert alert-primary" role="alert">
                        Post ID: ${comment.postId}/ Comment ID: ${comment.id}
                    </div>
                </div>
            </div>
            `
        })
        console.log(datos[0])
    })