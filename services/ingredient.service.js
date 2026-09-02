/***************************/
/** Service -  Ingredients */
/***************************/

const Ingredient = require("../models/ingredient.model");

const ingredientService = {
  // Va permettre de récupérer tous les ingrédient de notre DB
  find: async () => {
    try {
      const ingredients = await Ingredient.find();
      return ingredients;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findById: async (id) => {
    try {
      // On utilise 'find' car dés que tu trouves 'élément avec ce slug, c'est ok
      const ingredient = await Ingredient.findById(id);
      return ingredient;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findBySlug: async (slug) => {
    try {
      // On utilise 'find' car dés que tu trouves 'élément avec ce slug, c'est ok
      const ingredient = await Ingredient.findOne({ slug });
      return ingredient;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  findByName: async (name) => {
    try {
      const ingredient = await Ingredient.findOne({
        name: { $regex: name, $options: "i" },
      });
      return ingredient;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  nameAlreadyExists: async (name) => {
    try {
      const ingredient = await Ingredient.findOne({ name });

      // Si le nom de l'ingrédient existe => renvoi "vrai"
      if (ingredient) {
        return true;
      } else {
        // Si le nom de l'ingrédient n'existe pas => renvoi "faux"
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  // Donc ici c'est pour créer un nouvel ingrédient
  create: async (ingredient) => {
    try {
      // On va créer l'objet à ajouter à partir du modèle
      const ingredientToAdd = new Ingredient(ingredient);
      await ingredientToAdd.save();
      return ingredientToAdd;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  update: async (id, ingredient) => {
    try {
      const ingredientToUpdate = await Ingredient.findOne({ _id: id });

      if (!ingredientToUpdate) return false;

      // On fait les modifications
      ingredientToUpdate.name = ingredient.name;
      ingredientToUpdate.slug = ingredient.slug;
      ingredientToUpdate.category = ingredient.category;
      ingredientToUpdate.img = ingredient.img;
      ingredientToUpdate.description = ingredient.description;
      ingredientToUpdate.consumption = ingredient.consumption;
      ingredientToUpdate.recipe = ingredient.recipe;

      await ingredientToUpdate.save();

      return ingredientToUpdate;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  delete: async (id) => {
    try {
      const deleteIngredient = await Ingredient.deleteOne({ _id: id });

      if (deleteIngredient.deletedCount === 0) {
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

module.exports = ingredientService;
