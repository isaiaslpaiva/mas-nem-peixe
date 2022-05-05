const { Router } = require('express')

const Product = require('../models/Product.models')
const Comment = require('../models/Comment.models')

const router = Router()

router.post('/', async (req, res) => {
    const { id } = req.user
    try {
        const product = await Product.create({ ...req.body, userId: id})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to create product", error})
    }
})

router.put('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true})
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: "Error while trying to update a product", error})
    }
})

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        await Product.findByIdAndDelete(productId)
        await Comment.deleteMany({ productId })
        res.status(204).json()
    } catch (error) {
        res.status(500).json({ message: "Error while trying to delete a product", error})
    }
})

module.exports = router;