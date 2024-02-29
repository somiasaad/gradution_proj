
import translateModel from "../../../controllers/translate";
import express from 'express';

const router = express.Router();

router.get('/getdata', translateModel);


export default router;