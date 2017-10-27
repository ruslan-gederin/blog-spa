const Authentication = require('../controllers/authenticationController');
const Post = require('../controllers/postController');
const passportService = require('../passport/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {

    //signup to the blog
    app.post('/api/signup', Authentication.signup);

    //signin to the blog
    app.post('/api/signin', requireSignin,  Authentication.signin);

    //get all posts from mongo
    app.get('/api/posts', requireAuth, Post.fetchPosts);

    //get post by id from mongo
    app.get('/api/post/:id', requireAuth, Post.fetchPostById);

    //add post to mongo
    app.post('/api/post', requireAuth, Post.insertPost);

    //delete post by id from mongo
    app.delete('/api/post/:id', requireAuth, Post.deletePost);



    /*
     //delete post by id from mongo
     app.delete('/api/post/:id', (req, res) => Post.deletePost(req, res, db)); */

};
//
