import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    borrower: {
        type: String
    },
    library: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'library'
    },
    coverImage:{
        type:String
    }
})

const Book = mongoose.model('book', bookSchema);

export default Book;