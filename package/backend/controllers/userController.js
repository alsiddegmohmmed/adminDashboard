import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Course from '../models/coursesModel.js'
import generateToken from '../utils/generateToken.js';


// @desc Auth user/set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt with email: ${email}`);
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const countUsers = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments({});
    res.status(200).json({ count: userCount });
});

const countStudents = asyncHandler(async (req, res) => {
    const studentCount = await User.countDocuments({ role: 'student' });
    res.status(200).json({ count: studentCount });
});

const countTeachers = asyncHandler(async (req, res) => {
    const teacherCount = await User.countDocuments({ role: 'teacher' });
    res.status(200).json({ count: teacherCount });
});

 
// @desc Get all users
// @route GET /api/users
// @access Private/Teacher
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const getStudents = asyncHandler(async (req, res) => {
    const students = await User.find({ role: 'student' }).sort({createdAt: -1});
    res.status(200).json(students); // Make sure to send a proper status code
});

const getTeachers = asyncHandler(async (req, res) => {
    const teachers = await User.find({ role: 'teacher' }).sort({createdAt: -1});;
    // .sort({ last_review: -1 });
    res.status(200).json(teachers); 
})
// @desc Create a new user
// @route POST /api/users
// @access Private/Teacher
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Teacher
const deleteUser = asyncHandler(async (req, res) => {
    console.log('Delete user endpoint hit');
    console.log('User ID:', req.params.id);

    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        console.log('User deleted');
        res.status(200).json({ message: 'User removed' });
    } else {
        console.error('User not found');
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getCourseTitles = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).populate('createdBy', 'name');
    ; // Only fetch the title field
    res.status(200).json(courses);
  });
  


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getStudents,
    getTeachers, 
    countUsers,
    countStudents, 
    countTeachers,
    getCourseTitles,
};
