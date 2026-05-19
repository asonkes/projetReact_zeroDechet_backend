/************************/
/** Router des recettes */
/************************/

const recipeRouter = require("express").Router();
const recipeController = require("../controller/recipe.controller");
const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");
const nameValidatorMiddleware = require("../middlewares/nameValidator.middleware");
const userAuthorizationMiddleware = require("../middlewares/auth/userAuthorization.middleware");
const roleAuthorizationMiddleware = require("../middlewares/roleAuthorizationMiddleware");
const paginationMiddleware = require("../middlewares/pagination.middleware");
const Recipe = require("../models/recipe.model");

// Routes sans les 'id'
recipeRouter
  .route("/")
  .get(paginationMiddleware(Recipe), recipeController.getAll)
  // Pouvoir ajouter une recette
  .post(
    authentificationMiddleware(),
    nameValidatorMiddleware(),
    recipeController.insert,
  );

// Pour voir les recettes que l'utilisateur a créé
recipeRouter
  .route("/user/:id")
  .get(
    authentificationMiddleware(),
    userAuthorizationMiddleware(),
    recipeController.getByUser,
  );

// Routes avec les slugs
recipeRouter.route("/:slug").get(recipeController.getBySlug);

// Routes avec les id
recipeRouter
  .route("/id/:id")
  .put(
    authentificationMiddleware(),
    userAuthorizationMiddleware(),
    nameValidatorMiddleware(),
    recipeController.update,
  )
  // Demander à Aurélien si logique que l'utilisateur puisse ajouter, modifier mais pas supprimer ses recettes
  .delete(
    authentificationMiddleware(),
    roleAuthorizationMiddleware(["Admin"]),
    recipeController.delete,
  );

module.exports = recipeRouter;
