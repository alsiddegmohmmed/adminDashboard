import express from "express"; 
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
  createUser,
  getStudents,
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
  .get((req, res) => res.send('Teacher Dashboard'));

router.route('/')
    .get( getUsers)  // Changed from admin to teacher
    .post( createUser); // Changed from admin to teacher

    router.route('/students')
    .get( getStudents);     

// router.route('/:id').put(protect, teacher, updateUser) ;
router.route('/:id').delete( deleteUser).put( updateUser);

// router.route('/students')
//     .get(protect, teacher, getStudents);

// Fetch teachers
router.route('/teachers')
    .get( getTeachers);



export default router; 