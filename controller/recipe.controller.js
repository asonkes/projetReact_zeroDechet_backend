/*********************************/
/** Controller lié aux recettes  */
/*********************************/

const { Request, Response } = require("express");
const recipeService = require("../services/recipe.service");

const recipeController = {
  /**
   * Pour récupérer toutes les recettes
   * @param {Request} req
   * @param {Response} res
   */
  getAll: async (req, res) => {
    try {
      // On essaye d'appeler le service donc 'await'
      const recipes = await recipeService.find();

      // On renvoie un objet avec le total des tâches +  le tableau
      const dataToSend = {
        count: recipes.length,
        recipes,
      };

      res.status(200).json(dataToSend);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        StatusCode: 500,
        message: `Erreur de le DB`,
      });
    }
  },

  /**
   * Pour récupérer une recette avec son slug
   * @param {Request} req
   * @param {Response} res
   */
  getBySlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      const recipe = await recipeService.findBySlug(slug);

      if (!recipe) {
        res.status(404).json({
          statusCode: 404,
          message: "Recette non trouvée",
        });
      }

      res.status(200).json(recipe);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        statusCode: 404,
        message: `Erreur de la DB`,
      });
    }
  },

  /**
   * Pour pouvoir ajouter une recette
   * Pour un utilisateur connecté et Admin
   * @param {Request} req
   * @param {Response} res
   */
  insert: async (req, res) => {
    const recipeToAdd = req.body;

    try {
      // Si le nom existe déjà en DB, erreur
      const exists = await recipeService.nameAlreadyExists(recipeToAdd.name);

      if (exists) {
        return res.status(409).json({
          statusCode: 409,
          message: `La recette ${recipeToAdd.name} existe déjà!`,
        });
      } else {
        const insertedRecipe = await recipeService.create(recipeToAdd);

        // Rajout de l'url de la valeur ajoutée (respect des principes 'REST')
        res.location = `/api/recipes/id/${insertedRecipe.id}`;
        res.status(200).json(insertedRecipe);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur avec la DB`,
      });
    }
  },

  /**
   * Pour pouvoir modifier uen recette
   * Pour la personne qui a créé la recette et Admin
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const id = +req.params.id;
    const newRecipeInfos = req.body;
    const recipe = recipeService.findById(id);

    if (!recipe) {
      res.status(404).json({
        statusCode: 404,
        message: "Recette non trouvée",
      });
    }

    const updatedRecipe = recipeService.update(id, newRecipeInfos);

    res.status(200).json(updatedRecipe);
  },

  /**
   * Pour pouvoir supprimer une recette
   * Pour l'Admin
   * @param {Request} req
   * @param {Response} res
   */
  delete: async (req, res) => {
    const id = req.params.id;

    try {
      // Faire un if/else => car on renvoie pas de la même manière !
      if (await recipeService.delete(id)) {
        return res.sendStatus(204);
      } else {
        return res.status(404).json({
          statusCode: 404,
          message: `Suppression impossible, la recette n'existe pas!`,
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

module.exports = recipeController;
