const { recipes } = require("../fake/fakeDb");

const fakeRecipeService = {
  find: () => {
    return recipes;
  },

  findBySlug: (slug) => {
    return recipes.find((recipe) => {
      return recipe.slug === slug;
    });
  },

  create: (recipeToAdd) => {
    // Donc avec map, je transforme mon tableau en un autre tableau
    // Mais je ne garde que les id => [1, 2 etc]
    const idMax = Math.max(...recipes.map((recipe) => recipe.id));
    recipeToAdd.id = idMax + 1;
    recipes.push(recipeToAdd);

    return recipeToAdd;
  },

  update: (id, recipeToUpdate) => {
    return recipes.find((recipe) => {
      return recipe.id === id;
    });
  },

  delete: (id) => {
    return recipes.find((recipe) => {
      return recipe.id === id;
    });
  },
};

module.exports = fakeRecipeService;
