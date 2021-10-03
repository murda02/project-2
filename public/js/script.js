let movieBtn = document.getElementById('movie-btn');
let closeBtn = document.querySelector('#close-btn');
let popupModal = document.querySelector('.modal');

//function to compute the genre
function myGenre() {
    var genreList = document.getElementById("genreList");
    return genreList.options[genreList.selectedIndex].text;
}

// Function to compute the url formatting for genre based on user input
function computeGenre(inputGenre) {
    if (inputGenre) {
        inputGenre = inputGenre.toLowerCase();
        switch (inputGenre) {
            case "action": 
                parseGenre = "&with_genres=28";
                break;
            case "adventure":
                parseGenre = "&with_genres=12";
                break;
            case "animation":
                parseGenre = "&with_genres=16";
                break;
            case "comedy":
                parseGenre = "&with_genres=35";
                break;
            case "crime":
                parseGenre = "&with_genres=80";
                break;
            case "documentary":
                parseGenre = "&with_genres=99";
                break;
            case "drama":
                parseGenre = "&with_genres=18";
                break;
            case "family":
                parseGenre = "&with_genres=10751";
                break;
            case "fantasy":
                parseGenre = "&with_genres=14";
                break;
            case "history":
                parseGenre = "&with_genres=36";
                break;
            case "horror":
                parseGenre = "&with_genres=27";
                break;
            case "music":
                parseGenre = "&with_genres=10402";
                break;
            case "mystery":
                parseGenre = "&with_genres=9648";
                break;
            case "romance":
                parseGenre = "&with_genres=10749";
                break;
            case "science fiction":
                parseGenre = "&with_genres=878";
                break;
            case "tv movie":
                parseGenre = "&with_genres=10770";
                break;
            case "thriller":
                parseGenre = "&with_genres=53";
                break;
            case "war":
                parseGenre = "&with_genres=10752";
                break;
            case "western":
                parseGenre = "&with_genres=37";
                break;
    }
    }
}

// Function to compute the url formatting based on user input for release year
function computeYear(inputYear) {
    if (inputYear) parseYear = `&primary_release_year=${inputYear}`;
}

// Function to compute the url formatting based on user input for runtime
function computeTime(inputTime) {
    inputTime && (parseTime = `&with_runtime.lte=${inputTime}`);
}



// Movie submit button takes in genre, release year, and runtime, checks to make sure all exist, then runs makeUrl, otherwise alerts user to fill out info.
movieBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    getJokeApi();
    getDrinkApi();
    let genre = myGenre();
    let releaseYear = document.getElementById('year').value;
    let runtime = document.getElementById('runtime').value;
    if (genre && releaseYear && runtime) {
        makeUrl(genre, releaseYear, runtime);
    } else {
        popupModal.style.display='block';
    }
})

closeBtn.addEventListener('click', function() {
    popupModal.style.display = 'none';
    event.preventDefault();
});

async function getMovieApi(url) {
    const response = await fetch(url);
    var objects = await response.json();
    console.log(objects);
    let movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        var movieTitle = document.createElement("li");
        movieTitle.appendChild(document.createTextNode(objects.results[i].original_title));
        movieList.appendChild(movieTitle);
    }
}

// Function that develops the movie url by running all three compute functions above, and building the url with the results, then pulling data from the url
async function makeUrl(genre, releaseYear, runtime) {
    await computeGenre(genre);
    await computeYear(releaseYear);
    await computeTime(runtime);
    
    
    let api_url = `https://api.themoviedb.org/3/discover/movie?with_original_language=en${parseGenre}${parseYear}${parseTime}&sort_by=popularity.desc&api_key=a65d471e819b0a6c43ded7506d323429`;
    getMovieApi(api_url);
}

async function getJokeApi() {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming')
    var objects = await response.json();
    if (objects.type === 'single') {
        console.log(objects.joke)
    } else {
        console.log(objects.setup + " " + objects.delivery);
    }
}

async function getDrinkApi() {
    console.log('This function is initialized'); 
    const response = await fetch('www.thecocktaildb.com/api/json/v1/1/random.php')
    console.log('A response is created');
    var objects = await response.json(); // There's something off here. Will fix in next push
    console.log('The object is assigned');
    console.log(objects);
}