import express from 'express'
import * as AuthController from '../controllers/user.js'
import {verifyAuth} from '../middleware/verifyAuth.js'


const router = express.Router()

router.post('/signup', AuthController.signUp)
router.post('/login', AuthController.login)

router.get('/', verifyAuth, AuthController.getAuthUser)

export default router