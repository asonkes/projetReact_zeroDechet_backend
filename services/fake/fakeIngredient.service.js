const { ingredients } = require("./fakeDb");

const fakeIngredientService = {
  // Va permettre de récupérer toutes les tâches de notre DB
  // Pas de paramètre particulier, on veut tout récupérer
  find: () => {
    return ingredients;
  },

  findBySlug: (slug) => {
    // On utilise 'find' car dés que tu trouves 'élément avec ce slug, c'est ok
    return ingredients.find((ingredient) => {
      return ingredient.slug === slug;
    });
  },

  // Donc ici c'est pour créer un nouvel ingrédient
  create: (ingredientToAdd) => {
    // Donc avec map, je transforme mon tableau en un autre tableau
    // Mais je ne garde que les id => [1, 2 etc]
    const idMax = Math.max(...ingredients.map((ingredient) => ingredient.id));
    ingredientToAdd.id = idMax + 1;
    ingredients.push(ingredientToAdd);

    return ingredientToAdd;
  },
};

module.exports = fakeIngredientService;
