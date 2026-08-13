import express from 'express';
const router = express.Router();
import {addStudent, deleteStudent, getStudents, updateStudent} from "../controllers/studentController.js"
router.get('/',getStudents);
router.post("/",addStudent);
router.delete("/:id",deleteStudent);
router.patch("/:id",updateStudent);

export default router;
