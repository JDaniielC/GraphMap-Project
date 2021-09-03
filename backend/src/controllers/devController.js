const axios = require('axios');
const Dev = require('../model/dev');

module.exports = {
    async index(request, response) {
        const { user } = request.headers;
        const loggedUser = await Dev.findById(user);
        const users = await Dev.find ({
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

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return response.json(userExists);
        }

        const dataResponse = await axios.get(`https://api.github.com/users/${username}`); 

        const {name, bio, avatar_url:avatar} = dataResponse.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return response.json(dev);
    }
}