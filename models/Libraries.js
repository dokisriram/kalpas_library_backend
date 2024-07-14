import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    name: { type: String },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    }]
})

const Library = mongoose.model('library', librarySchema);

export default Library;