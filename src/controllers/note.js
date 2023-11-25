import Note from "../models/note.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//create a note
export const createNote = async (req, res, next) => {
  const { title, description, imageUrl, visitedDate, tags } = req.body;
  const userId = req.user.id
  try {
    if (!title && !description && !imageUrl && !visitedDate && !tags) {
      throw createHttpError(400, "Form fields must not be empty");
    }
    const newNote = await Note.create({
      userId: userId,
      title: title,
      description: description,
      imageUrl: imageUrl,
      visitedDate: visitedDate,
      tags: tags,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
//get all notes
export const getNote = async (req, res, next) => {
  const userId = req.user.id
  try {
    const notes = await Note.find({userId: userId}).sort({ _id: -1 }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//get a single note
export const getSingleNote = async(req, res, next) => {
  const noteId = req.params.noteId
  const userId = re.user.id
  try {
    if(!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id')
    }
    const note = await Note.findById(noteId).exec()
    if(!note.userId.equals(userId)){
      throw createHttpError(401, "You cannot access this note")
    }
    if(!note) {
      throw createHttpError(404, 'Note not found')
    }
    res.status(200).json(note)

  } catch (error) {
    next(error)

  }
}

//update a note
export const updatedNote = async (req, res, next) => {
  const userId = req.user.id
  const noteId = req.params.noteId
  const {title, description, imageUrl, visitedDate, tags} = req.body
  try {
    if(!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id')
    }
    if(!title && !description && !imageUrl && !visitedDate && !tags) {
      throw createHttpError(404, 'form fields must not be empty')
    }
    const note = await Note.findById(noteId).exec()
    if(!note.userId.equals(userId)){
      throw createHttpError(401, "You cannot access this note")
    }
    if(!note){
      throw createHttpError(404, "Note not found")
    }
      
    note.title = title || note.title
    note.description = description || note.description
    note.imageUrl = imageUrl || note.imageUrl
    note.visitedDate = visitedDate || note.visitedDate
    note.tags = tags || note.tags
    const updatedNote = await note.save()
    res.status(200).json(updatedNote)

  } catch (error) {
    next(error)

  }
}

//delete a note
export const deleteNote = async(req, res, next) => {
  const noteId = req.params.noteId
  const userId = re.user.id
  try {
    if(!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id')
    }
    const note = await Note.findById(noteId).exec()
    if(!note.userId.equals(userId)){
      throw createHttpError(401, "You cannot access this note")
    }
    if(!note){
      throw createHttpError(404, "Note not found")
    }
    await note.deleteOne()
    res.status(200).json('note deleted successfully')
  } catch (error) {
    next(error)
  }
}
