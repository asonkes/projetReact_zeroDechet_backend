const { Request, Response } = require("express");
const fakeRecipeService = require("../services/fake/fakeRecipe.service");

const recipeController = {
  /**
   * Pour récupérer toutes les recettes
   * @param {Request} req
   * @param {Response} res
   */
  getAll: (req, res) => {
    const recipes = fakeRecipeService.find();

    const dataToSend = {
      count: recipes.length,
      recipes,
    };

    res.status(200).json(dataToSend);
  },

  /**
   * Pour récupérer une recette avec son slug
   * @param {Request} req
   * @param {Response} res
   */
  getBySlug: (req, res) => {
    const slug = req.params.slug;
    const recipe = fakeRecipeService.findBySlug(slug);

    if (!recipe) {
      res.status(404).json({
        statusCode: 404,
        message: "Recette non trouvée",
      });
    }

    res.status(200).json(recipe);
  },

  /**
   * Pour pouvoir ajouter une recette
   * Pour un utilisateur connecté et Admin
   * @param {Request} req
   * @param {Response} res
   */
  insert: (req, res) => {
    const recipeToAdd = req.body;
    const addedRecipe = fakeRecipeService.create(recipeToAdd);

    // Rajout de l'url de la valeur ajoutée (respect des principes 'REST')
    res.location = `/api/recipes/id/${recipeToAdd.id}`;
    res.status(201).json(addedRecipe);
  },

  /**
   * Pour pouvoir modifier uen recette
   * Pour la personne qui a créé la recette et Admin
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {
    const id = +req.params.id;
    const newRecipeInfos = req.body;
    const recipe = fakeRecipeService.findById(id);

    if (!recipe) {
      res.status(404).json({
        statusCode: 404,
        message: "Recette non trouvée",
      });
    }

    const updatedRecipe = fakeRecipeService.update(id, newRecipeInfos);

    res.status(200).json(updatedRecipe);
  },

  /**
   * Pour pouvoir supprimer une recette
   * Pour l'Admin
   * @param {Request} req
   * @param {Response} res
   */
  delete: (req, res) => {
    const id = +req.params.id;

    // Faire un if/else => car on renvoie pas de la même manière !
    if (fakeRecipeService.delete(id)) {
      return res.sendStatus(204);
    }

    return res.status(404).json({
      statusCode: 404,
      message: `Suppression impossible, la recette n'existe pas!`,
    });
  },
};

module.exports = recipeController;
