#!/usr/bin/node

const request = require('request');

const id = process.argv[2];

// Check if ID is provided
if (!id) {
    console.error('Please provide a film ID.');
    process.exit(1);
}

request(`https://swapi-api.alx-tools.com/api/films/${id}`, (error, response, body) => {
    if (error) {
        console.error('Error fetching film:', error);
        process.exit(1);
    }

    if (response.statusCode !== 200) {
        console.error('Failed to fetch film:', response.statusCode);
        process.exit(1);
    }

    const film = JSON.parse(body);

    film.characters.forEach(url => {
        request(url, (error, response, characterBody) => {
            if (error) {
                console.error(`Error fetching character ${url}:`, error);
                return;
            }

            if (response.statusCode !== 200) {
                console.error(`Failed to fetch character ${url}:`, response.statusCode);
                return;
            }

            const character = JSON.parse(characterBody);
            console.log(character.name);
        });
    });
});
