import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
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
            process.env.OTHER_TOKEN_SECRET,
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