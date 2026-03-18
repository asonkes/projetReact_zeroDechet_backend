/************************/
/** Router des recettes */
/************************/

const recipeRouter = require("express").Router();

const recipeController = require("../controller/recipe.controller");

// Routes sans les 'id'
recipeRouter
  .route("/")
  .get(recipeController.getAll)
  // Pouvoir ajouter une recette
  .post(recipeController.post);

recipeRouter
  .route("/:slug")
  .get(recipeController.getBySlug)
  .put(recipeController.update)
  .delete(recipeController.delete);

module.exports = recipeRouter;
