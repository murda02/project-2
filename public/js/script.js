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
    createMovieCards(objects);
}

function createMovieCards(objects) {
    let cardsWrap = document.getElementById('cards_wrap');
    cardsWrap.innerHTML = `
    <h1>Returned Movies</h1>
    `;
    for (let i = 0; i < 5; i ++) {
        var cards = document.createElement('div');
        cards.innerHTML = `
        <div class="card_item">
            <div class="card_inner">
                <div class="card_top">
                    <h3>${objects.results[i].original_title}</h3>
                </div>
                <div class="card_bottom">
                    <div class="card_info">
                        <p class="description">${objects.results[i].overview}</p>
                        <button id="save-movie${i}">Save to User</button>
                    </div>
                </div>
            </div>
        </div>
        `
        cardsWrap.appendChild(cards);
        let saveMovie = document.getElementById(`save-movie${i}`);
        saveMovie.addEventListener('click', async function() {
            await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: objects.results[i].original_title,
                    overview: objects.results[i].overview,
                })
            });
        })
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
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,political,sexist,explicit');
        var objects = await response.json();
        let jokeLabel = document.getElementById("joke-label");
        jokeLabel.innerHTML = "";
        if (objects.type === 'single') {
            jokeLabel.appendChild(document.createTextNode(objects.joke));
        } else {
            jokeLabel.appendChild(document.createTextNode(objects.setup + " " + objects.delivery));
        }
    } catch (err) {
        jokeLabel.innerHTML = "Joke's on you! Our API isn't working!"
    }
}

async function getDrinkApi() { 
    const response = await fetch('https://thecocktaildb.com/api/json/v1/1/random.php');
    var drinkObjects = await response.json();
    createDrinkCard(drinkObjects);
}

function createDrinkCard(drinkObjects) {
    let cocktailCard = document.getElementById('cocktail-contents');
    cocktailCard.innerHTML = "";
    cocktailCard.innerHTML = `
    <div class="card" style="width: 25rem, display: inline">
        <h1>Cocktail</h1>
        <h3>${drinkObjects.drinks[0].strDrink}</h3>
        <p class=description>${drinkObjects.drinks[0].strInstructions}</p>
        <button id='save-drink'>Save Cocktail</button>
    </div>
    `
    let saveDrink = document.getElementById('save-drink');
    saveDrink.addEventListener('click', async function() {
        console.log('event listener works');
        await fetch('/api/drink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: drinkObjects.drinks[0].strDrink,
                description: drinkObjects.drinks[0].strInstructions,
            })
        });
        console.log('fetch worked!');
    })
}

getJokeApi();