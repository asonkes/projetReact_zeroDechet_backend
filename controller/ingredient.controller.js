/***********************************/
/** Controller lié aux ingrédients */
/***********************************/

const { Request, Response } = require("express");
const ingredientService = require("../services/ingredient.service");

const ingredientController = {
  /**
   * Récupérer toutes les ingrédients
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    try {
      res.status(200).json(req.pagination);
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
    const ingredientToAdd = {
      ...req.body,
      slug: req.body.name.toLowerCase().replace(/\s+/g, "-"),
    };

    try {
      // Si le nom existe déjà en DB, erreur
      const exists = await ingredientService.nameAlreadyExists(
        ingredientToAdd.name,
      );

      // Si le nom existe déjà
      if (exists) {
        return res.status(409).json({
          statusCode: 409,
          message: `L'ingrédient ${ingredientToAdd.name} existe déjà!`,
        });
        // Si le nom n'existe pas encore, on va la créer
      } else {
        const insertedIngredient =
          await ingredientService.create(ingredientToAdd);

        res.location(`/api/location/ingredients/${insertedIngredient.id}`);
        res.status(200).json(insertedIngredient);
      }
    } catch (err) {
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
  update: async (req, res) => {
    const id = req.params.id;

    try {
      const newIngredientInfos = req.body;
      const ingredient = await ingredientService.findById(id);

      if (!ingredient) {
        res.status(404).json({
          statusCode: 404,
          message: "Ingrédient non trouvé",
        });
      }

      const updatedIngredient = await ingredientService.update(
        id,
        newIngredientInfos,
      );

      res.status(200).json(updatedIngredient);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans la DB`,
      });
    }
  },

  /**
   * Supprimer un ingrédient
   * (Pour l'admin ==> à voir si le temps)
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const id = req.params.id;

    try {
      if (await ingredientService.delete(id)) {
        return res.sendStatus(204);
      } else {
        console.log(id);
        return res.status(404).json({
          statusCode: 404,
          message: `Suppression impossible, l'ingrédient n'existe pas!`,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur de la DB`,
      });
    }
  },
};

module.exports = ingredientController;
