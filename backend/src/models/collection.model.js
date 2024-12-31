import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    collectionName: {
        type: String,
        require: true,
    },
    items:{
        type: Array,
        default:[]
    },
})

const Collection = mongoose.model("Collection", imageSchema);

export default Collection;