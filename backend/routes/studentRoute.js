import express from 'express';
const router = express.Router();
import {addStudent, getStudents} from "../controllers/studentController.js"
router.get('/',getStudents);
router.post("/",addStudent);
export default router;
