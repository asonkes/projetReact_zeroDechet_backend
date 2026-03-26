/***************************/
/** Router des ingrédients */
/***************************/

const ingredientRouter = require("express").Router();

const ingredientController = require("../controller/ingredient.controller");
const idValidatorMiddleware = require("../middlewares/idValidator.middleware");

// Routes sans les id
ingredientRouter
  .route("/")
  .get(ingredientController.getAll)
  // Pouvoir ajouter une recette
  .post(ingredientController.insert);

// Routes avec les slugs
ingredientRouter.route("/:slug").get(ingredientController.getBySlug);

// Routes avec les id
ingredientRouter
  .route("/id/:id")
  .put(ingredientController.update)
  .delete(ingredientController.delete);

module.exports = ingredientRouter;
