const axios = require('axios')

// Function to search for a movie by name using The Movie Database API
function movie(name){
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {query: name, page: '1'}, // Query parameters: movie name and page number (page 1)
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODczOTZiMzEwNDVlNWI5NTUzNTM3MGIyODI5Y2MwOSIsIm5iZiI6MTczNDUzOTQyOS45OTksInN1YiI6IjY3NjJmOGE1NjdjOTYzMjE4MDRhMmM0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qsaXSuFsln7-vVKs0bumcZCBTcIM9vMi6EBeqx1_iH0'
        }
    };
    
return axios
        .request(options)
        .then(res => {
            // Check if any results were returned from the API
            if (res.data.results.length > 0) {
                // Return the first movie's ID and title from the search results
                return {
                    id: res.data.results[0].id,
                    name: res.data.results[0].title
                };
            } else {
                // Throw an error if no movie was found
                throw new Error('No movie found.');
            }
        })
        // Log any errors encountered during the request
        .catch(err => console.error(err));
}

// Export the function so it can be used in other parts of the app
module.exports = movie