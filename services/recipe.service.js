/************************/
/** Service -  Recettes */
/************************/

const Recipe = require("../models/recipe.model");

const recipeService = {
  // Va permettre de récupérer toutes les recettes de notre DB
  find: async (query) => {
    // Récupérer ce que l'on a reçu d ela query, rajouter des filtres de recherche
    const { ingredients } = query;

    // On vérifie que les ingrédients se trouvent dans la query
    // Pour créer un nouveau filtre
    // Il faut initialiser un filtre vide
    const ingredientFilter = {};

    if (ingredients) {
      const ingredientList = ingredients.split(",");
      ingredientFilter["ingredients.ingredient"] = { $in: ingredientList };
    }

    try {
      const recipes = await Recipe.find(ingredientFilter).populate(
        "ingredients.ingredient",
      );
      return recipes;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      const recipe = await Recipe.findById(id);
      return recipe;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findBySlug: async (slug) => {
    try {
      const recipe = await Recipe.findOne({ slug });
      return recipe;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findByUser: async (userId) => {
    try {
      const recipeUser = await Recipe.find({ user: userId }).populate(
        "ingredients.ingredient",
      );
      return recipeUser;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  nameAlreadyExists: async (name) => {
    try {
      const recipe = await Recipe.findOne({ name });

      // Si le nom de la recette existe => renvoi "vrai"
      if (recipe) {
        return true;
      } else {
        // Si le nom de la recette n'existe pas => renvoi "faux"
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (recipe) => {
    try {
      // On va créer l'objet à ajouter à partir du modèle
      const recipeToAdd = new Recipe(recipe);
      await recipeToAdd.save();
      return recipeToAdd;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  update: async (id, recipe) => {
    try {
      const recipeToUpdate = await Recipe.findOne({ _id: id });

      if (!recipeToUpdate) return false;

      // on fait les modifications
      recipeToUpdate.name = recipe.name;
      recipeToUpdate.slug = recipe.slug;
      recipeToUpdate.category = recipe.category;
      recipeToUpdate.description = recipe.description;
      recipeToUpdate.price = recipe.price;
      recipeToUpdate.number_person = recipe.number_person;
      recipeToUpdate.timing_preparation = recipe.timing_preparation;
      recipeToUpdate.cooking = recipe.cooking;
      recipeToUpdate.difficulty = recipe.difficulty;
      recipeToUpdate.ingredients = recipe.ingredients;
      recipeToUpdate.preparation = recipe.preparation;

      await recipeToUpdate.save();

      return recipeToUpdate;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  delete: async (id) => {
    try {
      const deleteRecipe = await Recipe.deleteOne({ _id: id });

      if (deleteRecipe.deletedCount === 0) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = recipeService;
