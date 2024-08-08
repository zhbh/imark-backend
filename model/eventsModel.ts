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
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    // },
    // location: {
    //     type: Number,
    //     default: 0,
    // },
    createTime: {
        type: Number,
        default: Date.now(),
    },
});

export default eventsSchema;
