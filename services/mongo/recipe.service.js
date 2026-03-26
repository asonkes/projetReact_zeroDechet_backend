const recipeService = {
  find: () => {
    return recipes;
  },

  findById: async (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    return recipe;
  },

  findBySlug: async (slug) => {
    const recipe = recipes.find((recipe) => recipe.slug === slug);
    return recipe;
  },

  create: async (recipeToAdd) => {
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
