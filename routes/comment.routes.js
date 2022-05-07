const { Router } = require('express')

const Comment = require('../models/Comment.models')
const Product = require('../models/Product.models')

const router = Router()

router.post('/:productId', async (req, res) => {
    const { productId } = req.params
    const { id } = req.user
    try {
        const newComment = {...req.body, productId, userId: id}
        const commentFromDb = await Comment.create(newComment)

        await Product.findByIdAndUpdate(productId, {
            $push: {comments: commentFromDb._id}
        })
        res.status(200).json(commentFromDb)
    } catch (error) {
        res.status(500).json({message: "Error while trying to create new comment", error})
    }
})

router.get('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const comments = await Comment.find({productId}).populate(
            "userId productId",
            "username nameOfProduct"
        )
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({message: "Error while trying to get comments", error})
    }
})

router.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params
    const { id } = req.user

    try { 
        const comment = await Comment.findById(commentId)

        if (comment.userId != id) {
            res.status(400).json("User can only delete own comment")
            return
        }

        await Comment.findByIdAndDelete(commentId)

        await Product.findByIdAndUpdate(comment.productId, {
            $pull: {comments: commentId}
        })
        res.status(200).json({ message: "Comment deleted"})
    } catch (error) {
        res.status(500).json({message: "Error while trying to delete comment", error})
    }
})

router.put('/:commentId', async (req, res) => {
    const { commentId } = req.params
    const { id } = req.user
    try {
        const updatedComment = await Comment.findOneAndUpdate( {_id: commentId, userId: id}, req.body, {new: true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json({message: "Error while trying to update comment", error})
    }
})


module.exports = router;