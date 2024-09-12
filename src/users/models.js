import {Schema, model} from "mongoose";

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    biography : {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    urlImage: {
        type: String,
        required: false
    },
    giveLikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    receiveLikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }]
})

userSchema.index({ username: 1 }, { unique: true });

export const User = model("User", userSchema)