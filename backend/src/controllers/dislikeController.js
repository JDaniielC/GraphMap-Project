const Dev = require('../model/dev');

module.exports = {
    async store(request, response) {
        const {user} = request.headers;
        const { devId } = request.params; 

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists'});
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return response.json(loggedDev);
    }
}