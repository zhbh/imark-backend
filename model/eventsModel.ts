import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
    },
    expirationTime: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: "0,0",
    },
    createTime: {
        type: Number,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

export default eventsSchema;
