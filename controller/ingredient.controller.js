const { Request, Response } = require("express");
const fakeIngredientService = require("../services/fake/fakeIngredient.service");

const categoryController = {
  /**
   * Récupérer toutes les tâches
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
   * Récupérer toutes les tâches
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
   * Récupérer toutes les tâches
   * @param {Request} req
   * @param {Response} res
   */
  post: (req, res) => {
    res.sendStatus(501);
  },

  /**
   * Récupérer toutes les tâches
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {
    res.sendStatus(501);
  },

  /**
   * Récupérer toutes les tâches
   * @param {Request} req
   * @param {Response} res
   */
  delete: (req, res) => {
    res.sendStatus(501);
  },
};

module.exports = categoryController;
