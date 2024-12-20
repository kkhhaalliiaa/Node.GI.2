const axios = require('axios')

// Function to get movie recommendations based on a given movie ID
function recommend(id){
    // Calls for the API request to get recommendations for the specified movie ID
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}/recommendations`,
        params: {language: 'en-US', page: '1'},// Query parameters: set language to English and request the first page of results
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODczOTZiMzEwNDVlNWI5NTUzNTM3MGIyODI5Y2MwOSIsIm5iZiI6MTczNDUzOTQyOS45OTksInN1YiI6IjY3NjJmOGE1NjdjOTYzMjE4MDRhMmM0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qsaXSuFsln7-vVKs0bumcZCBTcIM9vMi6EBeqx1_iH0'
        }
    };
    
     // Send the API request and handle the response
    return axios
    .request(options)

    .then(res => { 
        // Takes the 'results' array from the API response (list of recommended movies)
        let results =  res.data.results

        // Initialize an empty array to store movie recommendations in 
        let recommendations = []

        // Loop through each recommended movie and push its title to the recommendations array above
        for (let movie of results){
            recommendations.push(
            {
                name: movie.title // Only pushing the movie title (could also add other properties if needed like pic,descriptions, or genre )
            }
        )
        }

        // Return the array of movie recommendations
    return recommendations

    // If an error occurs during the API request, log the error to the console
    }).catch(err => console.error(err));
}

// Uncomment the following line to test the function with a specific movie ID
// recommend(342584).then(data => console.log(data))


// Export the function so it can be used in other parts of the app
module.exports = recommend