import express from 'express';
import User from '../models/Users.js'
import jwt from 'jsonwebtoken'

const router = express.Router();

// register user
router.post('/api/users/register', async (req, res) => {
    const userObj = req.body.user;
    console.log(userObj)
    const existUser =await User.findOne({email: userObj.email});
    console.log(existUser)
    if(existUser){
        res.status(400).send({"message":"A user with this email already exists"});
    } else {
        const newUser = new User({
            books:[],
            email:userObj.email,
            name:userObj.name,
            password: userObj.password,
            role:userObj.role
        })
        newUser.save().then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(400).send(err.message);
        })
    }
})

// login user
router.post('/api/users/login', async (req, res) => {
    const userObj = req.body.user;
    try {
        const existUser =await User.findOne({email: userObj.email}).lean();
        console.log(existUser)
        if(existUser){
            if(existUser.password === userObj.password){
                const token = jwt.sign(userObj, "myToken");
                var userWithToken = {};
                userWithToken["token"] = token;
                var resObj = {...userWithToken, ...existUser}
                res.send(resObj);
            } else {
                res.status(400).send({"message":"email or password is incorrect"})
            }
        } else {
            res.status(400).send({"message":"email or password is incorrect"})
        }
    } catch (error) {
        res.status(400).send(error.message);   
    }
})



export default router;