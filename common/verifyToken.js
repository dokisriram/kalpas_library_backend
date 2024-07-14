import jwt from 'jsonwebtoken'
import User from '../models/Users.js'
import * as dotenv from 'dotenv'
dotenv.config()

// middleware function to validate bearer token 
function validateToken(req, res, next) {
    try {
        const signature = req.get('Authorization')
        const token = signature.split(' ')[1]
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function (e, s) {
                if (s) {
                    next()
                } else {
                    res.send("Invalid Token")
                }
            })
        } else {
            res.send("Token missing")
        }
    } catch (e) {
        console.error("validateToken", e)
    }
}

// checking for login user if user admin or not for library operation
export function getLoggedInUserRole(req, fn) {
    const signature = req.get('Authorization')
    const token = signature.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async function (e, s) {
        if (s) {
            const userEmail = s.email;
            fn(null, userEmail)
        } else {
            fn(e, null)
        }
    })
}

export default validateToken