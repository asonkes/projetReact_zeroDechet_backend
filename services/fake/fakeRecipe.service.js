const { recipes } = require("../fake/fakeDb");

const fakeRecipeService = {
  find: () => {
    return recipes;
  },

  findById: (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    return recipe;
  },

  findBySlug: (slug) => {
    const recipe = recipes.find((recipe) => recipe.slug === slug);
    return recipe;
  },

  create: (recipeToAdd) => {
    // Donc avec map, je transforme mon tableau en un autre tableau
    // Mais je ne garde que les id => [1, 2 etc]
    let idMax;
    if (recipes.length !== 0) {
      idMax = Math.max(...recipes.map((recipe) => recipe.id));
      recipeToAdd.id = idMax + 1;
    } else {
      idMax = 0;
    }

    recipes.push(recipeToAdd);

    return recipeToAdd;
  },

  update: (id, recipe) => {
    const recipeToUpdate = recipes.find((recipe) => recipe.id === id);

    // on fait les modifications
    recipeToUpdate.slug = recipe.slug;
    recipeToUpdate.name = recipe.name;
    recipeToUpdate.category = recipe.category;
    recipeToUpdate.description = recipe.description;
    recipeToUpdate.nbr_de_personnes = recipe.nbr_de_personnes;
    recipeToUpdate.temps_preparation = recipe.temps_preparation;
    recipeToUpdate.cuisson = recipe.cuisson;
    recipeToUpdate.ingredients = recipe.ingredients;
    recipeToUpdate.preparation = recipe.preparation;

    return recipeToUpdate;
  },

  delete: (id) => {
    const index = recipes.find((recipe) => recipe.id === id);

    // Si index n'existe pas, il sera = -1
    if (index === -1) {
      return false;
    }

    recipes.splice(index, 1);
    return true;
  },
};

module.exports = fakeRecipeService;
