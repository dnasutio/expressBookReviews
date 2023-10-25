const axios = require('axios');

// Task 10: Get a list of all books
axios({
    method: 'get',
    // This url was used to test the code in Github Codespaces
    // If running locally, then replace this with localhost
    url: 'https://zany-space-eureka-46jgpgw7gjwfjx45-5000.app.github.dev/',
})
    .then((response) => {
        console.log("---------------------------TASK 10-------------------------------");
        console.log(response.data);
        // Task 11: Get book details based on ISBN
        return axios({
            method: 'get',
            // Gets the book details for the first book in the database
            url: 'https://zany-space-eureka-46jgpgw7gjwfjx45-5000.app.github.dev/isbn/1',
        })
        .then((response) => {
            console.log("---------------------------TASK 11-------------------------------");
            console.log(response.data);
            // Task 12: Get book details based on author
            return axios({
                method: 'get',
                // Gets the book details for the the author Unknown
                url: 'https://zany-space-eureka-46jgpgw7gjwfjx45-5000.app.github.dev/author/Unknown',
            })
        })
        .then((response) => {
            console.log("---------------------------TASK 12-------------------------------");
            console.log(response.data);
            // Task 13: Get book details based on title
            return axios({
                method: 'get',
                // Gets the book details for the book The Epic of Gilgamesh
                url: 'https://zany-space-eureka-46jgpgw7gjwfjx45-5000.app.github.dev/title/The%20Epic%20Of%20Gilgamesh',
            })
        })
    })
    .then((response) => {
        console.log("---------------------------TASK 13-------------------------------");
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });