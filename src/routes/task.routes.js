import { Router } from 'express'

const router = Router();

router.get('/tasks', (req, res) => res.send('Getting Tasks'));

router.get('/tasks/:id', (req, res) => res.send('Getting Task By Id'));

router.post('/tasks', (req, res) => res.send('Create Task'));

router.put('/tasks/:id', (req, res) => res.send('Updating Task By Id'));

router.delete('/tasks/:id', (req, res) => res.send('Deleting Task By Id'));

export default router;