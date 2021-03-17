const router = require('express').Router();
const mw = require('../middleware/middleware.js');
const Post = require('./posts-model.js');
const Controller = require('./posts-controller.js')

router.get("/", Controller.getPosts)

router.put("/", mw.validatePost, Controller.updatePost)


module.exports = router