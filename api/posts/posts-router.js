const router = require('express').Router();
const mw = require('../middleware/middleware.js');
const Post = require('./posts-model.js');
const Controller = require('./posts-controller.js')

router.get("/", Controller.getPosts)
router.get("/:id", mw.validateUserId, Controller.getPostById)

router.put("/:id", mw.validateUserId, mw.validatePost, Controller.updatePost)

router.post("/:id/posts", mw.validatePost, mw.validateUserId, Controller.addNewPost)


module.exports = router