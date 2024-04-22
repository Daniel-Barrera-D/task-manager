import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const resetPassword = async(req, res) => {

    const { password } = req.body;
    const { id, resetToken } = req.params;

    try {
        
        const passwordHash = await bcrypt.hash(password, 10);

        await User.updateOne(
            {$and: [{_id: id}, {resetToken: resetToken}]},
            { $set: { password: passwordHash, resetToken: null }}
        );
        
        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}