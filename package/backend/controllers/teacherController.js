import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


const getTeachers = asyncHandler(async (req, res) => {
    const teachers = await User.find({ role: 'teacher' });
    res.status(200).json(teachers);
});


export { getTeachers }