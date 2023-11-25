import express from 'express'
import * as NotesController from '../controllers/note.js'
import { verifyAuth } from '../middleware/verifyAuth.js'


const router = express.Router()
router.post('/create', verifyAuth, NotesController.createNote)

router.get('/', verifyAuth, NotesController.getNote)
router.get('/:noteId', verifyAuth, NotesController.getSingleNote)

router.patch('/:noteId', verifyAuth, NotesController.updatedNote)
router.delete('/:noteId', verifyAuth, NotesController.deleteNote)

export default router