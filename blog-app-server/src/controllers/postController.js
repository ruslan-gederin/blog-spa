const Post = require('../model/post');
const mongoose = require('mongoose');

function validateRequest(req) {
    return !(!req.body.post || !req.body.preview || !req.body.title );
}

exports.fetchPosts = (req, res, next) => {
    Post.find().sort({$natural: -1}).exec((err, posts) => {
        if (err) {
            return next(err);
        }

        return res.send(posts);
    });
};

exports.fetchPostById = (req, res, next) => {
    const criteria = {'_id': mongoose.Types.ObjectId(req.params.id)};

    Post.findOne(criteria, (err, post) => {
        if (err) {
            return next(err);
        }

        return res.send(post);
    });
};

exports.insertPost = (req, res, next) => {

    if (!validateRequest(req)) {
        return res.send(
            {'error': 'An error has occurred during inserting new post in mongo. Some params are empty'});
    }

    const post = new Post({
        post: req.body.post,
        title: req.body.title,
        date: req.body.date,
        preview: req.body.preview
    });

    post.save((err) => {
        if (err) {
            return next(err);
        }

        res.send(post);
    });
};

exports.deletePost = (req, res, next) => {
    const criteria = {'_id': mongoose.Types.ObjectId(req.params.id)};

    Post.remove(criteria, (err) => {
        if (err) {
            return next(err);
        } else {
            return res.send('Post ' + req.params.id + ' deleted!');
        }
    });
};
