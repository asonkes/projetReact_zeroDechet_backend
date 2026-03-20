const { ingredients } = require("./fakeDb");

const fakeIngredientService = {
  // Va permettre de récupérer tous les ingrédient de notre DB
  find: () => {
    return ingredients;
  },

  findById: (id) => {
    // On utilise 'find' car dés que tu trouves 'élément avec ce slug, c'est ok
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);

    return ingredient;
  },

  findBySlug: (slug) => {
    // On utilise 'find' car dés que tu trouves 'élément avec ce slug, c'est ok
    const ingredient = ingredients.find(
      (ingredient) => ingredient.slug === slug,
    );

    return ingredient;
  },

  // Donc ici c'est pour créer un nouvel ingrédient
  create: (ingredientToAdd) => {
    // Donc avec map, je transforme mon tableau en un autre tableau
    // Mais je ne garde que les id => [1, 2 etc]
    let idMax;
    if (ingredients.length !== 0) {
      idMax = Math.max(...ingredients.map((ingredient) => ingredient.id));
      ingredientToAdd.id = idMax + 1;
    } else {
      idMax = 0;
    }

    ingredients.push(ingredientToAdd);

    return ingredientToAdd;
  },

  update: (id, ingredient) => {
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

  delete: (id) => {
    const index = ingredients.find((ingredient) => ingredient.id === id);

    if (index === -1) {
      return false;
    }

    ingredients.splice(index, 1);
    return true;
  },
};

module.exports = fakeIngredientService;
