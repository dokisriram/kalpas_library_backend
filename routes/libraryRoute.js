import express from 'express';
import Library from '../models/Libraries.js'
import { getLoggedInUserRole } from '../common/verifyToken.js';
import User from '../models/Users.js';

const router = express.Router();

// get all libraries
router.get('/api/libraries', (req, res) => {
    Library.find({}).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// get a library by using id
router.get('/api/libraries/:id', (req, res) => {
    const id = req.params.id;
    Library.findById(id).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// create a library
router.post('/api/libraries', (req, res) => {
    const libraryObj = req.body.data;
    const newLibrary = new Library({
        name: libraryObj.name,
        books: []
    });

    newLibrary.save().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err);
    })
})


// update library
router.put('/api/libraries/:id', async (req, res) => {
    try {
        const libraryObj = req.body.data, id = req.params.id;
        const library = await Library.findById(id);
        library.name = libraryObj.name;
        const savedLibrary = await library.save()
        res.send(savedLibrary);
    } catch (error) {
        res.status(400).send(error);
    }
})

// delete library
router.delete('/api/libraries/:id', (req, res) => {
    const id = req.params.id;
    Library.deleteOne({ "_id": id }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// get all inventory from a library using id 
router.get('/api/libraries/:id/inventory', async (req, res) => {

    const id = req.params.id;
    Library.findById({ "_id": id }).populate('books').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err);
    })
})

// update inventory by using id 
router.post('/api/libraries/:id/inventory', (req, res) => {
    const id = req.params.id;
    const bookDetails = req.body.data;
    getLoggedInUserRole(req, async function (er, userEmail) {
        if (!er) {
            const user = await User.findOne({ email: userEmail })
            if (user.role == 'admin') {
                Library.findByIdAndUpdate({ "_id": id }, { "$push": { "books": bookDetails.bookId } }, { new: true }).populate('books').then((data) => {
                    res.send(data.books)
                }).catch((err) => {
                    res.status(400).send(err);
                })
            } else {
                res.status(400).send({ "message": "You are not authorized" });
            }

        } else {
            res.status(400).send(er);
        }
    })
})

// remove a specific inventory from a specific library by using its id
router.delete('/api/libraries/:id/inventory/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const libraryId = req.params.id;
    var _record = {};
    _record['books.$.id'] = bookId;

    getLoggedInUserRole(req, async function (er, userEmail) {
        if (!er) {
            const user = await User.findOne({ email: userEmail })
            if (user.role == 'admin') {

                Library.findByIdAndUpdate({ "_id": libraryId, "books.id": bookId }, { "$pull": { "books": bookId } }, { new: true }).then((data) => {
                    res.send(data)
                }).catch((err) => {
                    res.status(400).send(err);
                })
            } else {
                res.status(400).send({ "message": "You are not authorized" });
            }

        } else {
            res.status(400).send(er);
        }
    })
})


export default router;