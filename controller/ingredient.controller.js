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
    console.log(id);

    const newIngredientInfos = req.body;
    console.log(req.body);

    const ingredient = fakeIngredientService.findById(id);

    if (!ingredient) {
      res.status(404).json({
        statusCode: 404,
        message: "Ingrédient non trouvé",
      });
    }

    const updatedIngredient = fakeIngredientService.update(
      id,
      newIngredientInfos,
    );

    res.status(200).json(updatedIngredient);
  },

  /**
   * Supprimer un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  delete: (req, res) => {
    const id = +req.params.id;

    if (fakeIngredientService.delete(id)) {
      return res.sendStatus(204);
    }

    return res.status(404).json({
      statusCode: 404,
      message: `Suppression impossible, l'ingrédient n'existe pas!`,
    });
  },
};

module.exports = ingredientController;
