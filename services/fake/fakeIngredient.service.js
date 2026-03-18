const { ingredients } = require("./fakeDb");

const fakeIngredientService = {
  // Va permettre de récupérer toutes les tâches de notre DB
  // Pas de paramètre particulier, on veut tout récupérer
  find: () => {
    return ingredients;
  },

  findBySlug: (slug) => {
    // On utilise 'find' car dés que tu trouves 'élément avec cet id, c'est ok
    return ingredients.find((ingredient) => {
      return ingredient.slug === slug;
    });
  },
};

module.exports = fakeIngredientService;
