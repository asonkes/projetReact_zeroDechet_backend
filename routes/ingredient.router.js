/***************************/
/** Router des ingrédients */
/***************************/

const ingredientRouter = require("express").Router();
const ingredientController = require("../controller/ingredient.controller");
const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");
const roleAuthorizationMiddleware = require("../middlewares/roleAuthorizationMiddleware");

// Routes sans les id
ingredientRouter
  .route("/")
  .get(ingredientController.getAll)
  // Pouvoir ajouter une recette
  .post(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(["Admin"]),
    ingredientController.insert,
  );

// Routes avec les slugs
ingredientRouter.route("/:slug").get(ingredientController.getBySlug);

// Routes avec les id
ingredientRouter
  .route("/id/:id")
  .put(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(["Admin"]),
    ingredientController.update,
  )
  .delete(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(["Admin"]),
    ingredientController.delete,
  );

module.exports = ingredientRouter;
