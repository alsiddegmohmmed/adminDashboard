import express from 'express';
import {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js';
import { protect, teacher } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
    .get(protect, teacher, getStudents)
    .post(protect, teacher, addStudent);

router.route('/:id')
    .put(protect, teacher, updateStudent)
    .delete(protect, teacher, deleteStudent);

export default router;
