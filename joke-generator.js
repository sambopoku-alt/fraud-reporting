const fetch = require('node-fetch');

async function getRandomJoke() {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const joke = await response.json();
        console.log(`${joke.setup} - ${joke.punchline}`);
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
}

getRandomJoke();