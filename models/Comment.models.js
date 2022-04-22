const { model, Schema } = require("mongoose");

const commentSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        comment: {
            type: String,
            trim: true,
            maxlength: 2200,
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Comment', commentSchema)