import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    altDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    urlRaw: {
        type: String,
        required: true,
    },
    urlThumb: {
        type: String,
        required: true,
    },
    urlDownload: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorPicUrl: {
        type: String,
        required: true,
    },
    publishDate: {
        type: String,
        required: true,
    },

})

const Image = mongoose.model("Image", imageSchema);

export default Image;