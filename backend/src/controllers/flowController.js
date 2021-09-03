const Flow = require('../model/flow');

module.exports = {
    async index(request, response) {
        const { data } = request.headers;
        const users = await Flow.find ({
        })

        return response.json(users);
    },

    async store(request, response) {
        const {data} = request.body;

        const flow = await Flow.create({
            data
        })

        return response.json(flow);
    }
}