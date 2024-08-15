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
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    // },
    location: {
        type: String,
        default: "0,0",
    },
    createTime: {
        type: Number,
        default: Date.now(),
    },
});

export default eventsSchema;
