

//-------------------------------------------- NavBar Start -------------------------------


$('.NavBar-icon').click(() => {
    if (document.getElementById('navBar').style.transform === 'translateX(-82%)') {
        $('nav').css('transform', 'translateX(0%)');
    } else {
        $('nav').css('transform', 'translateX(-82%)');
    }
});





//----------------------------------------------- apis ------------------------------------

let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=91f847ee5ef729223c3c4fc973c5d03b&language=en-US&page=1`;
let popular = `https://api.themoviedb.org/3/movie/popular?api_key=91f847ee5ef729223c3c4fc973c5d03b&language=en-US&page=1`;
let topRate = `https://api.themoviedb.org/3/movie/top_rated?api_key=91f847ee5ef729223c3c4fc973c5d03b&language=en-US&page=1`;
let trending = `https://api.themoviedb.org/3/trending/movie/day?api_key=91f847ee5ef729223c3c4fc973c5d03b`;
let upComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=91f847ee5ef729223c3c4fc973c5d03b&language=en-US&page=1`;


//------------------------------------- get api contant --------------------------------

async function getMovies(x) {
    let apiResponed = await fetch(x);
    let result = await apiResponed.json()
    let apifinal = result.results;
    let cartona = ``;
    apifinal.map((y) => {
        cartona += `  <div class="col-md-4 ">
      <div class="style-contant  position-relative ">
          <img id="poster" class="w-100" src="https://image.tmdb.org/t/p/w500${y.poster_path}" alt="">
        <div class="style-contant-text position-absolute text-black w-100 text-center">
           <h3 id="title" class="p-4 text-black">${y.title || ''}</h3>
           <p id="overView" >${y.overview || ''}</p>
           <p id="overView" >Original language: ${y.original_language || ''}</p>
           <p id="rate" class="text-black p-1">Vote Average: ${y.vote_average || ''}</p>
           <p id="rate" class="text-black p-1">Vote Count: ${y.vote_count || ''}</p>
           <p id="date" class="p-2">${y.release_date || ''}</p>
        </div>  
        </div>
        </div>`

    })
    document.getElementById('htmlDataContainer').innerHTML = cartona;
};

//------------------------------------------ clicks ----------------------------------

$('#nowPlaying').click(() => getMovies(nowPlaying));
$('#popular').click(() => getMovies(popular));
$('#topRated').click(() => getMovies(topRate));
$('#trending').click(() => getMovies(trending));
$('#upcoming').click(() => getMovies(upComing));


//--------------------------------------------search---------------------------------------

getMovies(nowPlaying);

let moviesSearch = document.getElementById('moviesSearchInput');
moviesSearch.addEventListener('input', () => {
    let result = moviesSearch.value
    let searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=91f847ee5ef729223c3c4fc973c5d03b&language=en-US&page=1&include_adult=false&query=${result}`
    if (result.length === 0) {
        getMovies(nowPlaying)
    } else {
        getMovies(searchApiUrl)
    }

});


//---------------------------------------- inputs ----------------------------------------

let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let pw = document.getElementById('passwordInput');
let rePw = document.getElementById('rePasswordInput');



// --------------------------------------- regex Start ----------------------------------------

//-----------------------------------------   Name  -----------------------------------------

function nameVal() {
    let regexName = /^([a-z]|\d|\w){5,12}$/i;
    if (regexName.test(nameInput.value) === true) {
        return true;
    }
    else {
        document.getElementById('nameError').innerHTML = 'User Name must contain between 5 to 12 letters number or . or _    ';
        return false;
    }
};


//---------------------------------------------  E-Mail -----------------------------------

function emailval() {

    let regexEmail = /^([a-z]|\d|\w)+@[a-z]+(\.com)$/;

    if (regexEmail.test(emailInput.value) === true) {
        return true;
    }
    else {
        document.getElementById('emailError').innerHTML = 'incorrect email form ';
        return false;
    }
};

// ---------------------------------------- PhoneNumber -----------------------------------

function PhoneVal() {
    let regexPhone = /^01[01258][0-9]{8}$/;
    if (regexPhone.test(phoneInput.value) === true) {
        return true;
    } else {
        document.getElementById('phoneError').innerHTML = 'incorrect phone number form';
    }
};

//--------------------------------------  age  --------------------------------------

function ageVal() {
    let ageRegex = /^[1-9]{1}[0-9]{1}$/;
    if (ageRegex.test(ageInput.value) === true) {
        return true;
    } else {
        document.getElementById('ageError').innerHTML = 'incorrect age form';
    }
};

// -------------------------------- password -------------------------------------------

function passwordval() {

    let regexPw = /^([a-z]|\d|\w){6,12}$/i;
    if (regexPw.test(pw.value) === true && pw.value === rePw.value) {
        return true;
    }
    else {
        document.getElementById('passwordError') = 'password must contain between 6 to 12 letters numbers or _';
        return false;
    }
};

//------------------------------------------ check -----------------------------------

function checkInputs() {
    if (nameInput.value.length === 0) {
        document.getElementById('nameError').innerHTML = 'please Enter your name';

    }
    if (emailInput.value.length === 0) {
        document.getElementById('emailError').innerHTML = 'please fill the input';
    }
    if (phoneInput.value.length === 0) {
        document.getElementById('phoneError').innerHTML = 'please fill the input';
    }
    if (ageInput.value.length === 0) {
        document.getElementById('ageError').innerHTML = 'please fill the input';
    }
    if (pw.value.length === 0) {
        document.getElementById('passwordError').innerHTML = 'please fill the input';
    }
    if (rePw.value !== pw.value) {
        document.getElementById('unmatchedError').innerHTML = 'Unmatched password';
    }
    if (nameInput.value.length === 0 || emailInput.value.length === 0 || ageInput.value.length === 0 || phoneInput.value.length === 0 || pw.value.length === 0 || pw.value !== rePw.value) {
        return false;
    } else {

        return true;
    }
};


//----------------------------------- send click --------------------------------------

$('#Send').click((e) => {
    e.preventDefault();
    if (checkInputs() === true) {
        if (nameVal() === true && emailval() === true && PhoneVal() === true
            && ageVal() === true && passwordval() === true) {

            $('#done').css('display', 'flex');
            $('#done').fadeOut(5000);
            clearForm();
        }
    }
});



//----------------------------------------- clear Form --------------------------------------

function clearForm() {
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    ageInput.value = '';
    pw.value = '';
    rePw.value = '';
};
