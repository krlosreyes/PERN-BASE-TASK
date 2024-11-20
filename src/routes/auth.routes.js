import Router from 'express-promise-router';
import { getAllUsers, profile, signin, signout, signup }from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { signupSchema, signinSchema } from '../schemas/auth.schema.js';


const router = Router();

router.get('/users', getAllUsers );

router.post('/signin', validateSchema(signinSchema), signin );

router.post('/signup', validateSchema(signupSchema), signup );

router.post('/signout', signout );

router.get('/profile', isAuth, profile );

export default router;