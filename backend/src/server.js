const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);


mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.o6fxw.mongodb.net/nilson?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333)