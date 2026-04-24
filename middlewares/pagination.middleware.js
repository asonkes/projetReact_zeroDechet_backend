/*************************************/
/** Middleware - Pour la validation  */
/*************************************/

const { Request, Response } = require("express");
/**
 *
 * @param {Request} req
 * @param {Response} res
 *
 */
const paginationMiddleware = (model) => {
  return async (req, res, next) => {
    // On convertit la nombre de la page en "number" ausinon 1
    const page = parseInt(req.query.page) || 1;
    // Ici on indique la limite d'éléments que l'on veut et on convertit en nombre
    const limit = parseInt(req.query.limit) || 8;
    // Ici raisonnement :
    // (1-1) x 10 = 0
    // (2-1) x 10 = 10
    // (3-1) x 10 = 20 etc
    const skip = (page - 1) * limit;

    try {
      /** Promise.all ==> je fais 2 requêtes */
      const [items, totalItems] = await Promise.all([
        /** On récupère les éléments de la page */
        model.find().skip(skip).limit(limit),
        /** On compte le nombre total d'éléments dans la collection */
        model.countDocuments(),
      ]);

      req.pagination = {
        items,
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      };

      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur de la DB`,
      });
    }
  };
};

module.exports = paginationMiddleware;
