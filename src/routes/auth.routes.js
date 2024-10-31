import Router from 'express-promise-router';

import { getAllUsers, profile, signin, signout, signup }from '../controllers/auth.controller.js';

import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/users', getAllUsers );

router.post('/signin', signin );

router.post('/signup', signup );

router.post('/signout', signout );

router.get('/profile', isAuth, profile );

export default router;