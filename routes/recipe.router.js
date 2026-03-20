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
  .post(recipeController.insert);

//recipeRouter.route("/user/me").get(recipeController.getRecipesByUser);

// Routes avec les slugs
recipeRouter.route("/:slug").get(recipeController.getBySlug);

// Routes avec les id
recipeRouter
  .route("/id/:id")
  .put(recipeController.update)
  .delete(recipeController.delete);

module.exports = recipeRouter;
