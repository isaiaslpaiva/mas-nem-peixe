const { Router } = require('express')

const Product = require('../models/Product.models')
const Comment = require('../models/Comment.models')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get all products", error})
    }
})

router.get('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const product = await Product.findById(productId).populate({
            path: "comments",
            select: ["comment", "userId"],
            populate: {
                path: "userId",
                select: "name"
            }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to get one product", error})
    }
})

module.exports = router;