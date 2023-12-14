const User = require("../model/userModel");

exports.signup = async (req, res) => {
    try
    {
        const user = await User.find({email:req.body.email});
        if (user.length>0)
        {
            res.status(500).json({ message: "Email already registered !" });
        }
        else {
            await User.create(req.body);
            res.status(200).json({ message: "Registered successfully !" });
        } 
        
    }
    catch (e)
    {
        res.status(500).json({message:"Some error occurred !"})
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.find(req.body);
        if (user.length>0)
            res.status(200).json({ message: "Logged In Successfully !" });
        else
             res.status(500).json({ message: "User not registered !" });
    }
    catch (e)
    {
        res.status(500).json({ message: "Some error occurred !" });
    }

}
exports.students = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Some error occurred !' });
    }
};