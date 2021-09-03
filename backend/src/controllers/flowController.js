const axios = require('axios');
const Flow = require('../model/flow');

module.exports = {
    async index(request, response) {
        const { user } = request.headers;
        const loggedUser = await Flow.findById(user);
        const users = await Flow.find ({
            $and: [
                { _id: { $ne: user}},
                { _id: { $nin: loggedUser.likes}},
                { _id: { $nin: loggedUser.dislikes}},
            ],
        })

        return response.json(users);
    },

    async store(request, response) {
        const {username} = request.body;

        const userExists = await Flow.findOne({ user: username });

        if (userExists) {
            return response.json(userExists);
        }

        const dataResponse = await axios.get(`https://api.github.com/users/${username}`); 

        const {name, bio, avatar_url:avatar} = dataResponse.data;

        const flow = await Flow.create({
            name,
            user: username,
            bio,
            avatar
        })

        return response.json(Flow);
    }
}