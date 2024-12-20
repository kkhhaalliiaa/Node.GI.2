// Select elements from the DOM that we will interact with
const movieForm = document.querySelector('form')
const search = document.querySelector('input')
const movieTitle = document.getElementById('movie-title')
const recommedationList = document.getElementById('recommedation-list')
const message = document.getElementById('message')

// Add an event listener to the form to handle the 'submit' event
movieForm.addEventListener('submit' , (e) => {
    e.preventDefault()// Prevents the form from submitting and refreshing the page

    const movieSearch = search.value // Get the value typed by the user in the input field


    fetch(`/search?movie=${movieSearch}`)
    
    // Handle the response from the server
    .then((response)=>{

        response.json().then((data) =>{
            // Set the movie title from the response
            movieTitle.textContent = data.movie.name
            
            // Clear any existing recommendations and show a loading message
            recommedationList.innerHTML = ''
            message.innerHTML = 'Loading...'

            // Check if recommendations are available in the response
            if(data.recommedations.length <= 0){

                // If no recommendations were found, display a message
                message.innerText = 'No reccomendations found.'


            } else {
                  // If there are recommendations, display them in a list
                for(let i = 0; i < data.recommedations.length; i++){
                    // Create a new list item for each recommendation
                let movie = document.createElement('li')
                movie.innerHTML = data.recommedations[i].name
                recommedationList.appendChild(movie) // Append the recommendation to the list (Parent being the UL)
                
                // Clear the loading message once the recommendations are displayed
                message.innerHTML = '' 
            }}

        })
    })
})