/***************************/
/** Router des ingrédients */
/***************************/

const ingredientRouter = require("express").Router();

const ingredientController = require("../controller/ingredient.controller");

// Routes sans les id
ingredientRouter
  .route("/")
  .get(ingredientController.getAll)
  // Pouvoir ajouter une recette
  .post(ingredientController.post);

// Routes avec les slugs
ingredientRouter
  .route("/:slug")
  .get(ingredientController.getBySlug)
  .put(ingredientController.update)
  .delete(ingredientController.delete);

module.exports = ingredientRouter;
