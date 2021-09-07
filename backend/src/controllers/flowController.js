const Flow = require('../model/flow');

module.exports = {
    async index(request, response) {
        const flow = await Flow.find({});

        return response.json(flow);
    },

    async store(request, response) {
        const {elements} = request.body;
        await Flow.deleteMany();
        const flow = await Flow.insertMany(
            elements
        )

        return response.json(flow);
    }
}