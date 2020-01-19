const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

class StoreDev {
    async run({ github_username, techs, latitude, longitude }) {
        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { avatar_url, name = login, bio } = response.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                avatar_url,
                name,
                bio,
                techs: techsArray,
                location
            });

            const sendSocketMessageTo = findConnections(
              {latitude, longitude},
              techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return dev;
    }
}
module.exports = new StoreDev();