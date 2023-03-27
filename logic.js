
const apiKey="9ea0c11100f1a82b0f43b18ce9e7510c";
const baseurl=`https://api.themoviedb.org/3`;
const imgpath = "http://image.tmdb.org/t/p/original";
const trending="https://api.themoviedb.org/3/trending/all/day?api_key=9ea0c11100f1a82b0f43b18ce9e7510c";

const apipaths = {
    fetchallCateforis:`${baseurl}/genre/movie/list?api_key=${apiKey}`,
    fetchmovieList : (id)=> `${baseurl}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTredingapi : `${baseurl}/trending/all/day?api_key=${apiKey}`

}
console.log(apipaths.fetchallCateforis)

function init(){
    fetchTreandingMovies()
    fetchBulidsAllsection();
}


function fetchTreandingMovies(){
    fetchanbuildMoviesSection(apipaths.fetchTredingapi, "Trending Now")
    .then(list =>{
        buildbannerSection(list[0])
    })
}

// make img container
function buildbannerSection(movie){
    const bannercontent= document.getElementById("bannerseciton");
    const img=document.querySelector(".banner-conte")
   
    img.style.backgroundImage=`url(${imgpath}${movie.backdrop_path})`

    const div = document.createElement("Div");
    div.innerHTML=`
    <div class="info_collection">
        <h2 class="banner_title">${movie.title}</h2>
            <p class="banner_info">${movie.release_date}</p>
            <p class="banner_overview">${movie.overview}</p>
            <div class="action-buton-cont">
            <button class="action-button">play</button>
            <button class="action-button">more info</button>
        </div>
    </div>
    `
    div.className="banner-conte ";
    bannercontent.append(div)

    console.log(div)
}



function fetchBulidsAllsection(){
     fetch(apipaths.fetchallCateforis)
    .then(res => res.json())
    .then(categorys => {
        const category = categorys.genres;
        category.forEach(element => {
            fetchanbuildMoviesSection(
                apipaths.fetchmovieList(element.id),element.name)
        });
        
    })
   
}
function fetchanbuildMoviesSection(fetchurl ,cat){
    
  return  fetch(fetchurl)
    .then(res=>res.json())
    .then(res=> {
        const movies =  res.results
        BuildmovieSection(movies, cat)
        return movies;
       
    })
   

}
function BuildmovieSection(list, categoryname){
    
    const movtcont = document.getElementById("movie-cont");

    const moviesListHtml = list.map((item)=>{
        return `
        <img class="movie-item"  src="${imgpath}${item.backdrop_path}" alt="${item.title}">
        `
    }).join('');
    const movisectionHtml =`
   
    <h2 class="movie-seciton-heading">${categoryname}<span class="explore-nudge"> Explore All</span></h2>
    <div class="movie-row">
        ${moviesListHtml}
    </div>
    
    `
    const div = document.createElement("Div");
    div.className="movie-section";
    div.innerHTML=movisectionHtml;

        movtcont.append(div)

    

}

window.addEventListener('load', function(){
    init();
})