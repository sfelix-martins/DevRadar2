const StoreDev = require('../services/StoreDev');
const Dev = require('../models/Dev');

class DevController {
    async store(req, res) {
        const dev = await StoreDev.run(req.body);

        return res.status(201).json(dev);
    }

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    }
}
module.exports = new DevController();