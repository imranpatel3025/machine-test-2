
const { error } = require("node:console")
let blogs = require("../data/data");
const { title } = require("node:process");

function sentBlog(req, res){
    try{
        res.status(200).json({
            success : true,
            data : blogs
        })
    }catch(err){
        res.status(500).json({
            succes: false,
            message : `Somthing went wrong !!!`,
            error : err.message
        })
    }
}

function sentBlogById(req, res){
    try{

        let blogId = req.params.id;
        let blog = blogs.find(b => b.id === blogId)

        if(!blog){

            return res.status(404).json({
                success : false,
                message : `Blog with id ${blogId} is not found !!!`
            })
        }

        res.status(200).json({
            success : true,
            message : `Blog is fetched Successfully !!!`,
            data : blog
        })

    }catch(err){
        res.status(500).json({
            succes : false,
            message : `Somthing Went Wrong !!!`,
            error : err.message
        })
    }
}

function createBlog(req, res){
    try{
        let body = req.body

        if(!body.title || !body.body){
            return res.status(400).json({
                success : false,
                message : `Title and Body is required !!!`
            })
        }

        let newBlog = {
            title : body.title,
            body : body.body,
            userid : body.userid,
            id : Date.now().toString()
        }

        blogs.unshift(newBlog)
        res.status(201).json({
            success : true,
            message : `New Blog is Created Succesfully !!!`,
            data : newBlog
        })


    }catch(err){
        res.status(500).json({
            succes : false,
            message : `Somthing Went Wrong !!!`,
            error : err.message
        })
    }
}

function updateBlog(req, res){
    try{
        let updateId = req.params.id;
        let body = req.body;

        let getIndx = blogs.findIndex(blg => blg.id === updateId)

        if(getIndx === -1){
            return res.status(404).json({
                success : false,
                message : `Blog with id ${updateId} is not found !!!`
            })
        }

        if(!body.title || !body.body){
            return res.status(400).json({
                success : false,
                message : `Title and Body is required !!!`
            })
        }

        let updateObj = {
            ...blogs[getIndx],
            title : body.title,
            body : body.body
        }

        blogs[getIndx] = updateObj;

        res.status(200).json({
            success : true,
            message : `Blog is Updated Successfully !!!`,
            data : updateObj
        })

    }catch(err){
        res.status(500).json({
            succes : false,
            message : `Somthing Went Wrong !!!`,
            error : err.message
        })
    }
}

function deleteBlog(req,res){
    try{
        let removeId = req.params.id;
        let getIndex = blogs.findIndex(b => b.id === removeId)

        if(getIndex === -1){
            return res.status(404).json({
                success : false,
                message : `Remove Id is not found !!!`
            })
        }

        let removeBlog = blogs.splice(getIndex, 1)

        res.status(200).json({
            success : true,
            message : `Blog is Removed Successfully !!!`,
            data : removeBlog[0]
        })


    }catch(err){
        res.status(500).json({
            succes : false,
            message : `Somthing Went Wrong !!!`,
            error : err.message
        })
    }
}

module.exports = {
    sentBlog,
    sentBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}