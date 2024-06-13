import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const PORT = process.env.PORT

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/merndb'

export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const OTHER_TOKEN_SECRET = process.env.OTHER_TOKEN_SECRET

export const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const FRONT_URI = process.env.FRONT_URI || 'http://localhost:5173'

export const ORIGIN_CORS = process.env.ORIGIN_CORS

console.log("puerto",process.env.PORT);