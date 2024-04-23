import jwt from 'jsonwebtoken';
import { OTHER_TOKEN_SECRET, TOKEN_SECRET } from '../config.js';

export function createAccessToken(payload) {
    console.log(TOKEN_SECRET);
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        )
    })
}

export function createPasswordResetToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            OTHER_TOKEN_SECRET,
            {
                expiresIn: "5m"
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        )
    })
}