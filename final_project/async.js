const axios = require('axios');

const getBooks = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://zany-space-eureka-46jgpgw7gjwfjx45-5000.app.github.dev/',
        });

        console.log(response.data);
    }
    catch (error) {
        console.log(error);
    }
}

getBooks();
