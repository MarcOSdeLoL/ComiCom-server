const { Schema, model } = require("mongoose");

const comicSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            trim: true,
            set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
        },
        number: {
            type: Number,
            required: [true, 'Number is required']
        },
        pages: {
            type: Number,
            required: [true, 'Number of pages is required.'],
        },
        cover: {
            type: String,
            default: ''
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        forSale: {
            type: Boolean,
            default: false
        }
        
    },
    {
        timestamps: true,
    }
)
const Comic = model("Comic", comicSchema)

module.exports = Comic;