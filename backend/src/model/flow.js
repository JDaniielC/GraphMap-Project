const {Schema, model} = require('mongoose');

const FlowSchema = new Schema({ }, {
    timestamps: true,
});

module.exports = model('flow', FlowSchema);