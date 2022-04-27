import express from 'express';
import HomeController from '../app/Http/HomeController.js';

const router = express.Router();

router.get('/', HomeController.index);

export default router;
