const Recipe = require("../../models/recipe.model");
const { ingredients } = require("../fake/fakeDb");
const { nameAlreadyExists } = require("./ingredient.service");

const recipeService = {
  // Va permettre de récupérer toutes les recettes de notre DB
  find: async () => {
    try {
      const recipes = await Recipe.find().populate("ingredients.ingredient");
      return recipes;
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
    const recipeToUpdate = recipes.find((recipe) => recipe.id === id);

    // on fait les modifications
    recipeToUpdate.name = recipe.name;
    recipeToUpdate.slug = recipe.slug;
    recipeToUpdate.category = recipe.category;
    recipeToUpdate.description = recipe.description;
    recipeToUpdate.price = recipe.price;
    recipeToUpdate.number_person = recipe.number_person;
    recipeToUpdate.timing_preparation = recipe.timing_preparation;
    recipeToUpdate.cooking = recipe.cooking;
    recipeToUpdate.ingredients = recipe.ingredients;
    recipeToUpdate.preparation = recipe.preparation;

    return recipeToUpdate;
  },

  delete: (id) => {
    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index === -1) {
      return false;
    }

    recipes.splice(index, 1);
    return true;
  },
};

module.exports = recipeService;
