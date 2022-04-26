const { model, Schema } = require("mongoose");

const productSchema = new Schema (
    {
        nameOfProduct: {
            type: String,
            trim: true,
            maxlength: 30,
            required: true
        },
        brand: {
            type: String,
            trim: true,
            maxlength: 30,
            required: true
        },
        group: {
            type: String,
            trim: true,
            maxlength: 30
        },
         category: {
            type: String,
            enum: ["Food"||"Personal Hygiene"||"Cleaning"||"Alcoholic Beverages"||"Events"||"Makeup"||"Drink"||"Others"],
            required: true
        },
        source: {
            type: String
        },
        comment: {
            type: String,
            trim: true,
            maxlength: 2200,
        },
        vegan: {
            type: String,
            enum: ["Vegan" || "NotVegan"],
            required: true
        },
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Product', productSchema)