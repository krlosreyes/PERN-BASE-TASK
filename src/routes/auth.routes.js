import { Router } from 'express'

const router = Router();

router.post('/signin', (req, res) => res.send('Signin'));

router.post('/signup', (req, res) => res.send('Signup'));

router.post('/signout', (req, res) => res.send('Log Out'));

router.get('/profile', (req, res) => res.send('User profile'));

export default router;