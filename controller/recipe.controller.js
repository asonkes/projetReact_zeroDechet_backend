const recipeController = {
  getAll: (req, res) => {
    res.sendStatus(501);
  },

  getBySlug: (req, res) => {
    res.sendStatus(501);
  },

  getByUser: (req, res) => {
    res.sendStatus(501);
  },

  // serait pour un utilisateur connecté
  // admin
  post: (req, res) => {
    res.sendStatus(501);
  },

  // serait pour l'auteur de la recette
  // amdin
  update: (req, res) => {
    res.sendStatus(501);
  },

  // serait juste pour l'admin
  delete: (req, res) => {
    res.sendStatus(501);
  },
};

module.exports = recipeController;
