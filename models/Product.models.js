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
            enum: ["Comida", "Higiene Pessoal", "Limpeza","Eventos","Beleza","Outros"],
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
        itIs: {
            type: String,
            enum: ["Vegano", "Vegetariano", "Origem Animal"],
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