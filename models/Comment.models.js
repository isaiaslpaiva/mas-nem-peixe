const { model, Schema } = require("mongoose");

const commentSchema = new Schema (
    {
        comment: {
            type: String,
            trim: true,
            maxlength: 2200,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Comment', commentSchema)