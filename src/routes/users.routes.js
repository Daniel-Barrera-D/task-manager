import { Router } from "express";
import { getUsers, deleteUser } from '../controllers/users.controller.js'

const router = Router();

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser)

export default router