const {model, Schema } = require('mongoose');

const userSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["Masculino", "Feminino", "Não-Binário"],
            required: true,
        },
        youAre: {
            type: String,
            required: true,
            enum: ["Vegan", "Vegetariano(a)", "Intolerante/Alérgico à alguns alimentos", "Consome produtos animais"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        },
        image: {
            type: String
        },
        Comment: [{
            type: Schema.Types.ObjectId,
            ref: "Comment",
          }],
    },
    {
        timestamp: true
    }
);

module.exports = model('User', userSchema)