import User from '../models/user.model.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, {_id: 1, username:1, email:1 })
        res.json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteUser = async(req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if(!user) return res.status(400).json({message: "User not found"})

        await user.deleteOne();

        return res.status(200).json({ message: "User delete"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}