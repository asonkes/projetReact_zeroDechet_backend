const { Request, Response } = require("express");
const fakeIngredientService = require("../services/fake/fakeIngredient.service");
const ingredientService = require("../services/mongo/ingredient.service");

const ingredientController = {
  /**
   * Récupérer toutes les ingrédients
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    try {
      // On essaye d'appeler le service donc 'await'
      const ingredients = await ingredientService.find();

      // On renvoie un objet avec le total des tâches +  le tableau
      const dataToSend = {
        count: ingredients.length,
        ingredients,
      };

      res.status(200).json(dataToSend);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur avec la DB`,
      });
    }
  },

  /**
   * Récupérer un ingrédient par slug
   * @param {Request} req
   * @param {Response} res
   */
  getBySlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      const ingredient = await ingredientService.findBySlug(slug);

      if (!ingredient) {
        res.status(404).json({
          statusCode: 404,
          message: "Ingrédient non trouvé",
        });
      }

      res.status(200).json(ingredient);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur avec la DB`,
      });
    }
  },

  /**
   * Ajouter un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  insert: async (req, res) => {
    const ingredientBody = req.body;

    try {
      // Si le nom existe déjà en DB, erreur
      const exists = await ingredientService.nameAlreadyExists(
        ingredientBody.name,
      );

      if (exists) {
        // Rajout de l'url de la valeur ajoutée (respect des principes 'REST')
        res.status(409).json({
          statusCode: 409,
          message: `L'ingrédient ${ingredientBody.name} existe déjà!`,
        });
      }
    } catch {
      res.status(500).json({
        statusCode: 500,
        message: `Erreur avec la DB`,
      });
    }
  },

  /**
   * Modifier un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  update: (req, res) => {
    const id = +req.params.id;
    const newIngredientInfos = req.body;
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
