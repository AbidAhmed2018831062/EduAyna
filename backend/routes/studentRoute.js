import express from 'express';
const router = express.Router();
import {getStudents} from "../controllers/studentController.js"
router.get('/',getStudents);

export default router;
