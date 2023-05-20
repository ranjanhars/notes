const express =require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteControllers");
const auth = require("../middlewares/auth");
const noteRoutes = express.Router();

noteRoutes.get("/",auth,getNote);

noteRoutes.post("/",auth,createNote);

noteRoutes.delete("/:id",auth,deleteNote)

noteRoutes.put("/:id",auth,updateNote)

module.exports = noteRoutes;