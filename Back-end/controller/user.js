// import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../util/tokenGenerate.js';

export const signUpUser = async (req, res) => {
    try {
        // Check if a user with the same email exists
        const email = req.body.email;
        const existingUser = await User.findOne({email:email});
        if (existingUser) {
            return res.status(409).send('Email already exists');
        }
        // Hash the password
       // Hash the password
const hashedPassword = await bcrypt.hash(req.body.password, 10);

// Create a new user
const newUser = new User({
    ...req.body,
    password: hashedPassword
});

// Save the user to the database
await newUser.save();

        // Generate a token
        const token = generateToken(newUser._id);
        res.status(201).json({
            message: 'User registered successfully',
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }

 }


 export const loginUser = async(req, res ) => {
    try {
        const email = req.body.email;
        const isUser = await User.findOne({email:email});
        // check if the user exists
        if (!isUser) {
            return res.status(403).send('Invalid User!');
        }

        // Log the isUser object to inspect its structure
        console.log('isUser:', isUser);

        // verify the password
        const { password } = req.body;

        if (!password) {
            return res.status(400).send('Password is required');
        }

        // Log the password to verify its presence
        console.log('Password:', password);

        const passwordMatch = await bcrypt.compare(password, isUser.password);


        if (!passwordMatch) {
            return res.status(403).send('Invalid Password');
        }

        // generate the token
        const token = generateToken(isUser._id);

        res.status(200).json({ message: "Successfully Logged In", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in code');
    }
    
 }


 export const getAllUserDetail = async (req,res) => {

    try{
        const users = await User.find().select('-password'); // Fetch all users from the database
        res.status(200).json(users); // Send the users as a JSON response

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
    
 }