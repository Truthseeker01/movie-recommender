function handleclick(movie){
    document.getElementById("detail-img").src = movie.image;
    document.querySelector("h3").textContent = movie.title;
    document.querySelector("span").textContent = `Rating: ${movie.rating}`;
    document.getElementById("description").textContent = movie.description;
}

function displayMovies (link){
    fetch(link)
    .then(res => res.json())
    .then(data => data.forEach(movie => {
        const image = document.createElement("img")
        image.src = movie.image
        document.getElementById("image-container").appendChild(image)
        image.addEventListener("click", () => handleclick(movie))
    }))
}

function handleSubmit(){
    const form = document.querySelector("form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const orginalRating = document.querySelector("span").textContent;
        document.querySelector("span").textContent = `Rating: ${document.getElementById("new-rating").value} Updated by: ${document.getElementById("name").value}`;
        const btn = document.createElement("button");
        btn.innerHTML = "x";
        document.querySelector("span").appendChild(btn);
        btn.addEventListener("click", () => {
            document.querySelector("span").textContent = orginalRating;
        });
        form.reset();
    });
};

function filterMoviesByGenre(){
        const btn = document.getElementById("button");
        btn.addEventListener("click", () => {
            document.getElementById("image-container").textContent = "";
            let dropDownValue = document.getElementById("genre").value;
            if (dropDownValue === "Action"){
                displayMovies("http://localhost:3000/action");
            } else if (dropDownValue === "Comedy"){
                displayMovies("http://localhost:3000/comedy");
            } else if (dropDownValue === "Sci-fi"){
                displayMovies("http://localhost:3000/sci-fi");
            } else if (dropDownValue === "Drama"){
                displayMovies("http://localhost:3000/drama");
            } else if (dropDownValue === "All"){
                main();
            }
        })
}

document.body.addEventListener("keydown", e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        return;
    }
    if(e.key === "D" || e.key === "d") {
        document.body.classList.toggle('dark-mode');
    }
    if(e.key === "H" || e.key === "h") {
        document.getElementById("overlay").classList.toggle("overlay");
    }    
})

handleSubmit();
filterMoviesByGenre();

function main(){
    displayMovies("http://localhost:3000/action");
    displayMovies("http://localhost:3000/comedy");
    displayMovies("http://localhost:3000/sci-fi");
    displayMovies("http://localhost:3000/drama");  
}
main();