import express from 'express';
import Book from '../models/Books.js'
import User from '../models/Users.js';
import Library from '../models/Libraries.js';

import multer from 'multer';
import firebaseConfig from '../common/firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

// multer and firebase config for image uploading
initializeApp(firebaseConfig)
const storage = getStorage();
const upload = multer({storage:multer.memoryStorage()});


const router = express.Router();

// get all books
router.get('/api/books', (req, res) => {
    Book.find({}).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

// get a single book by id
router.get('/api/books/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const bookDetail = await Book.findById({ "_id": id })
        const borrower = await User.findById({ "_id": bookDetail.borrower })
        const author = await User.findById({ "_id": bookDetail.author })
        const library = await Library.findById({ "_id": bookDetail.library })
        bookDetail.author = author;
        bookDetail.borrower = borrower;
        bookDetail.library = library;
        res.send(bookDetail);
    } catch (error) {
        res.status(400).send(err.message);
    }
})


// create book 
router.post('/api/books', upload.single('filename'),async(req, res) => {
    var downloadUrl = ""
    if(req.file){
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "   "+ dateTime}`)
        const metadata = {
            contentType:req.file.mimetype
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        downloadUrl = await getDownloadURL(snapshot.ref)
    }
    const bookDetail = req.body;
    const book = new Book({
        name: bookDetail.name,
        author: bookDetail.author,
        borrower: bookDetail.borrower,
        library: bookDetail.library,
        coverImage:downloadUrl
    })
    book.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})


// update book by using id 
router.put('/api/books/:id', upload.single('filename'),async(req, res) => {
    var downloadUrl = ""
    if(req.file){
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "   "+ dateTime}`)
        const metadata = {
            contentType:req.file.mimetype
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        downloadUrl = await getDownloadURL(snapshot.ref)
    }

    const id = req.params.id;
    // const updateObj = req.body;
    // console.log(updateObj)
    var updateRecord = {};
    updateRecord['name'] = req.body.name;
    updateRecord['author'] = req.body.author;
    updateRecord['borrower'] = req.body.borrower;
    updateRecord['library'] = req.body.library;
    if(downloadUrl !== ""){
        updateRecord['coverImage'] = downloadUrl
    }
    
    Book.findByIdAndUpdate({ "_id": id }, { "$set": updateRecord }, { new: true }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

// delete book
router.delete('/api/books/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndDelete({ "_id": id }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

// borrow book
router.post('/api/borrow', (req, res) => {
    const bookObj = req.body.data;
    console.log(bookObj)
    Book.findByIdAndUpdate({ "_id": bookObj.id }, { "$set": { "borrower": bookObj.userId } }, { new: true }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

// return the book
router.put('/api/return/:id', (req, res) => {
    const id = req.params.id;
    Book.findByIdAndUpdate({ "_id": id }, { "$set": { "borrower": "" } }, { new: true }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err.message);
    })
})

// unique date and time generation function
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

export default router;