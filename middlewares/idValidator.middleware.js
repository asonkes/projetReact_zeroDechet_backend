const { Request, Response } = require("express");

const idValidatorMiddleware = () => {
  /**
   * Récupérer toutes les ingrédients
   * @param {Request} req
   * @param {Response} res
   */
  return (req, res, next) => {
    // Récupérer l'id dans la requête
    const id = +req.params.id;

    // Vérifier si l'id est bien un nombre
    if (isNaN(id)) {
      // Si pas un nombre, on stop la requête
      res.status(400).json({
        statusCode: 400,
        message: `L'\id doit être un nombre entier`,
      });
    }

    // Si c'est un nombre, on continue la requête comme si de rien n'était
    next();
  };
};

module.exports = idValidatorMiddleware;
