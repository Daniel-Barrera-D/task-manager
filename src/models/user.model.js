import mongoose from "mongoose";
import Task from '../models/task.model.js'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

//Middleware pre en esquema usuario que se ejecutará al eliminar un usuario, aquí se eliminarán las tareas que pertenecen al usuario eliminado
userSchema.pre('deleteOne', { document: true, query: false } , async function(next) {
    try {
        //Elminar todas las tareas asociadas al User
        await Task.deleteMany({ user: this._id });
    } catch (error) {
        next(error);
    }
})

export default mongoose.model('User', userSchema);