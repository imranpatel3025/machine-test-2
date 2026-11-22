


const blogControler = require("../controler/blogcontroler")
const express = require("express")

const router = express.Router()

router.get("/", blogControler.sentBlog)

router.get("/:id", blogControler.sentBlogById)

router.post("/", blogControler.createBlog)

router.patch("/:id", blogControler.updateBlog)

router.delete("/:id", blogControler.deleteBlog)


module.exports = router;