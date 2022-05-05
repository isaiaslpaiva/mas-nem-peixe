const { Router } = require('express')
const uploadCloud = require('../configs/cloudinary.config')

const User = require('../models/User.models')

const router = Router()

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.user.id;
        const userFromDb = await User.findById(userId).select("name email image gender youAre")
        res.status(200).json(userFromDb)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/image', uploadCloud.single('image'), async (req, res) => {
    const userId = req.user.id
    const { path } = req.file
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {image: path}, {new: true}).select('-passwordHash')
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

module.exports = router