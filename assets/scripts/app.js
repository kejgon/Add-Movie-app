const addMovieModal = document.getElementById('add-modal');
const addMovieBtn = document.querySelector('header button');

const backDrop = document.getElementById('backdrop');

const cancelMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');





const movies = [];

const updateUI = () => {
    if(movies.length === 0 ){

        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }

};



const closeMovieDeletionModal = () => {
    toggleBackDrop();
    deleteMovieModal.classList.remove('visible');
    };


const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }

      movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listMovies = document.getElementById('movie-list');
    listMovies.children[movieIndex].remove();
    // let lm = listMovies.children[movieIndex];
    // lm.remove(movies[movieIndex]);

    closeMovieDeletionModal();
    updateUI();

};


const startDeleteMovie = movieId => {

 deleteMovieModal.classList.add('visible');  
 toggleBackDrop(); 
 const concelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
 let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');


 confirmAddMovieBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
 confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

 concelDeletionBtn.addEventListener('click', closeMovieDeletionModal);


 concelDeletionBtn.addEventListener('click', closeMovieDeletionModal);
 confirmDeletionBtn.addEventListener(
     'click', 
     deleteMovieHandler.bind(null, movieId)
   
     );

//   deleteMovie(movieId);

};






const addNewMoviesElement = (id, title, image, rating) => {
    const newMoviesElement = document.createElement('li');
    newMoviesElement.classList = 'movie-element';

    newMoviesElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${image}" alt="${title}" >
    </div> 
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div> 
    `;
    
    newMoviesElement.addEventListener('click', startDeleteMovie.bind(null, id));
    const listMovies = document.getElementById('movie-list');
    listMovies.append(newMoviesElement);

};





const toggleBackDrop = () => {
    backDrop.classList.toggle('visible');
};


const closeMovieModel = () => {
addMovieModal.classList.remove('visible');
// addMovieModal();
};



const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackDrop();
    // clearMoviesInputs();

  
};




const clearMoviesInputs = () => {
for (const inputs of userInputs){
    inputs.value = '';
}
};


const cancelAddMovieHandler = ()=> {
    closeMovieModel();
   toggleBackDrop();
   clearMoviesInputs();

};




const addMovieHandle = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' ||
        imageUrlValue.trim() === ''||
        ratingValue.trim() === '' ||
        +ratingValue < 1 || ratingValue > 5 ){
          alert('Please Enter Valid Information');  
          return;
        }

    const newMovies = {
        id: Math.random().toString(),
        movieName: titleValue,
        movieImage: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovies);
    console.log(movies);
    closeMovieModel();
    toggleBackDrop();
    clearMoviesInputs();
    // Calling and forwarding added new movies elements
    addNewMoviesElement(
        newMovies.id,
         newMovies.movieName,
          newMovies.movieImage,
           newMovies.rating
           );

    updateUI();



};






const backDropClickHandler = () => {
    closeMovieModel();
    closeMovieDeletionModal();
    clearMoviesInputs();
};




addMovieBtn.addEventListener('click', showMovieModal);
backDrop.addEventListener('click',backDropClickHandler);
cancelMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandle);