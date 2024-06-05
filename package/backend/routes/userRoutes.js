import express from "express"; 
import { getStudents } from "../controllers/studentController.js";
import { getTeachers } from "../controllers/teacherController.js";

import { 
  authUser,
  registerUser,
  logoutUser, 
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUser,
  deleteUser,
  createUser
} from "../controllers/userController.js";

import { protect, teacher } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';


const router = express.Router();
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/home/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/teacher-dashboard')
  .get(protect, teacher, (req, res) => res.send('Teacher Dashboard'));

router.route('/')
    .get(protect, teacher, getUsers)  // Changed from admin to teacher
    .post(protect, teacher, createUser); // Changed from admin to teacher

// router.route('/:id').put(protect, teacher, updateUser) ;
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);

router.route('/students')
    .get(protect, teacher, getStudents);

// Fetch teachers
router.route('/teachers')
    .get(protect, teacher, getTeachers);



export default router; 