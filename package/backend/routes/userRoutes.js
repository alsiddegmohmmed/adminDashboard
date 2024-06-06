import express from "express"; 

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
  getTeachers, 
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
    
    router.route('/teachers')
    .get(getTeachers); 

// router.route('/:id').put(protect, teacher, updateUser) ;
router.route('/:id').delete( deleteUser).put( updateUser);

// router.route('/students')
//     .get(protect, teacher, getStudents);

// Fetch teachers




export default router; 