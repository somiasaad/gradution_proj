import express from 'express';
import { auth } from '../../middleware/authentication.js';
import { createStatus, getUserStatus } from './statusController.js'
import { translation } from './../auth/auth.controller.js'
import translateModel from '../../../controllers/translate.js'
import { saveDate } from '../../modules/auth/auth.controller.js'
const router = express.Router();


router.get('/', (req, res) => {
    res.json('success')
})
router.post('/create', auth, createStatus)
router.get('/:userId', getUserStatus)
router.get('/home', translation);
router.get('/getdata/:lang', translateModel);
router.put('/saveDate', auth, saveDate)


export default router