const Ingredient = require("../../models/ingredient.model");

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
    const ingredientToUpdate = ingredients.find(
      (ingredient) => ingredient.id === id,
    );

    ingredientToUpdate.name = ingredient.name;
    ingredientToUpdate.slug = ingredient.slug;
    ingredientToUpdate.category = ingredient.category;
    ingredientToUpdate.img = ingredient.img;
    ingredientToUpdate.description = ingredient.description;
    ingredientToUpdate.consumption = ingredient.consumption;
    ingredientToUpdate.recipe = ingredient.recipe;

    return ingredientToUpdate;
  },

  delete: async (id) => {
    const index = ingredients.findIndex((ingredient) => ingredient.id === id);

    if (index === -1) {
      return false;
    }

    ingredients.splice(index, 1);
    return true;
  },
};

module.exports = ingredientService;
