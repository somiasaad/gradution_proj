import express from 'express'
import { changePassword, forgetPassword, getUser, logout, removeAccount, resetPassword, sendToEmailAgain, signIn, signUp, updateDate, verfiyEmail, verfiyResetPassword } from './auth.controller.js'
import { auth } from '../../middleware/authentication.js'
import { uploadFile } from '../../middleware/uploadfile.js'

const userRouter = express.Router()

userRouter.post('/signup', uploadFile('image', 'user'), signUp)
userRouter.post('/signin', signIn)
userRouter.post('/sendagain', sendToEmailAgain)
userRouter.get('/verfiy/:token', verfiyEmail)
userRouter.get('/verfiyResetPassword/:token', verfiyResetPassword)
userRouter.put('/', auth, uploadFile('image', 'users'), updateDate)
userRouter.patch('/', auth, changePassword)
userRouter.post('/forgetPassword', forgetPassword)
userRouter.put('/resetPassword', resetPassword)
userRouter.get('/getme', auth, getUser)
userRouter.patch('/logout', auth, logout)
userRouter.delete('/delete', auth, removeAccount)


export default userRouter