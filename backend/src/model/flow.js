const {Schema, model} = require('mongoose');

const FlowSchema = new Schema({
    id: String,
    data: {
        label: String,
        payment: Number,
        since: String,
        discount: Number
    },
    position: {
        x: Number,
        y: Number
    },
    source: String,
    target: String,
}, {
    timestamps: true,
});

module.exports = model('flow', FlowSchema);