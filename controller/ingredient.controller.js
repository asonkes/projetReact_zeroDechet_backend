const { Request, Response } = require("express");
const fakeIngredientService = require("../services/fake/fakeIngredient.service");

const ingredientController = {
  /**
   * Récupérer toutes les ingrédients
   * @param {Request} req
   * @param {Response} res
   */
  getAll: (req, res) => {
    const ingredients = fakeIngredientService.find();

    // On renvoie un objet avec le total des tâches +  le tableau
    const dataToSend = {
      count: ingredients.length,
      ingredients,
    };

    res.status(200).json(dataToSend);
  },

  /**
   * Récupérer un ingrédient par slug
   * @param {Request} req
   * @param {Response} res
   */
  getBySlug: (req, res) => {
    const slug = req.params.slug;
    const ingredient = fakeIngredientService.findBySlug(slug);

    if (!ingredient) {
      res.status(404).json({
        statusCode: 404,
        message: "Ingrédient non trouvé",
      });
    }

    res.status(200).json(ingredient);
  },

  /**
   * Ajouter un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  insert: (req, res) => {
    const ingredientToAdd = req.body;
    const addedIngredient = fakeIngredientService.create(ingredientToAdd);

    // Rajout de l'url de la valeur ajoutée (respect des principes 'REST')
    res.location = `/api/ingredients/id/${ingredientToAdd.id}`;
    res.status(201).json(addedIngredient);
  },

  /**
   * Modifier un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {
    const id = +req.params.id;
    const recipeToUpdate = req.body;
    recipeToUpdate.id = req.body;

    const updatedRecipe = fakeIngredientService.update(recipeToUpdate);

    res.sendStatus(200).json(updatedRecipe);
  },

  /**
   * Supprimer un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  delete: (req, res) => {
    res.sendStatus(501);
  },
};

module.exports = ingredientController;
