function handleclick(movie){
    document.getElementById("detail-img").src = movie.image;
    document.querySelector("h3").textContent = movie.title;
    document.querySelector("span").textContent = `Rating: ${movie.rating}`;
    document.getElementById("description").textContent = movie.description;
}

function displayMovies (){
    fetch("http://localhost:3000/movies")
    .then(res => res.json())
    .then(movies => movies.forEach(movie => {
        const image = document.createElement("img")
        image.src = movie.image
        document.getElementById("image-container").appendChild(image)
        image.addEventListener("click", () => handleclick(movie))
        
    } , filterMoviesByGenre(movies)
    ))
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

function handleFilter(movie){
    const image = document.createElement("img")
    image.src = movie.image
    document.getElementById("image-container").appendChild(image)
    image.addEventListener("click", () => handleclick(movie))
}

function filterMoviesByGenre(movies){
        const btn = document.getElementById("button");
        btn.addEventListener("click", () => {
            document.getElementById("image-container").textContent = "";
            let dropDownValue = document.getElementById("genre").value;
            if (dropDownValue === "Action"){
                const actionMovies = movies.filter(movie => movie.genre === "action");
                actionMovies.forEach(movie => handleFilter(movie));
            } else if (dropDownValue === "Comedy"){
                const comedyMovies = movies.filter(movie => movie.genre === "comedy");
                comedyMovies.forEach(movie => handleFilter(movie));
            } else if (dropDownValue === "Sci-fi"){
                const scifiMovies = movies.filter(movie => movie.genre === "sci-fi");
                scifiMovies.forEach(movie => handleFilter(movie));
            } else if (dropDownValue === "Drama"){
                const dramaMovies = movies.filter(movie => movie.genre === "drama");
                dramaMovies.forEach(movie => handleFilter(movie));
            } else if (dropDownValue === "All"){
                movies.forEach(movie => handleFilter(movie));
            } else if (dropDownValue === "Choose genre"){
                movies.forEach(movie => handleFilter(movie));
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



function main(){
    displayMovies(); 
    handleSubmit();
}
main();