/************************/
/** Router des recettes */
/************************/

const recipeRouter = require("express").Router();
const recipeController = require("../controller/recipe.controller");
const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");
const nameValidatorMiddleware = require("../middlewares/nameValidator.middleware");
const userAuthorizationMiddleware = require("../middlewares/auth/userAuthorization.middleware");

// Routes sans les 'id'
recipeRouter
  .route("/")
  .get(recipeController.getAll)
  // Pouvoir ajouter une recette
  .post(
    authentificationMiddleware(),
    nameValidatorMiddleware(),
    recipeController.insert,
  );

//recipeRouter
// .route("/user/me") ==> pk pas /user/:id ????
// .get(
//  authentificationMiddleware(),
//  userAuthorizationMiddleware(),
// recipeController.getByUser);

// Routes avec les slugs
recipeRouter.route("/:slug").get(recipeController.getBySlug);

// Routes avec les id
recipeRouter
  .route("/id/:id")
  .put(nameValidatorMiddleware(), recipeController.update)
  .delete(recipeController.delete);

module.exports = recipeRouter;
