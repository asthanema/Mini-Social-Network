const express = require('express');

// const bodyParser = require('body-parser');
// const { json } = require('express');

const app = express();
const Post = require('./models/post');

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://astha:LQK1wiYwerSc1rml@cluster0.zpr6s.mongodb.net/node-angular?retryWrites=true&w=majority',
)
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT,DELETE,OPTIONS');
    next();
}
);

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.use('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: documents
        });
    });
})



module.exports = app;