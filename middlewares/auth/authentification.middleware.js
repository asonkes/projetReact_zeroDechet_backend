/***********************************************************/
/** Middleware - Permet de voir si token est bien fournit
 *       Permet de voir si l'utilisateur est connecté
/***********************************************************/

const jwtUtils = require("../../utils/jwt.utils");

const authentificationMiddleware = () => {
  // Middleware va vérifier si un token a été fournit ou pas

  /**
   * @param {Request} req
   */
  return async (req, res, next) => {
    // Récupérer le header qui s'appelle authorization
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        statusCode: 401,
        message: `Vous devez être connecté`,
      });
    }
    // Si token pas ajouté => undefined
    // On met fin à la requête
    // personne non-connectée
    // On vérifie en + si token commence par "Bearer"
    // Vérifie si le header commence par "Bearer "
    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization;

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: `Vous devez être connecté`,
      });
    }

    // S'il y a un token
    try {
      // 1) On esssaie de le décoder
      const payload = await jwtUtils.decode(token);

      // 2) stocker le payload dans notre objet req
      // Comme ça on eput savoir quel est l'utilisateur qui s'est connecté
      req.user = payload;

      // On continue la requete
      next();
    } catch (err) {
      // Si erreur, décode plante, token erroné, fin de la requête
      res.status(401).json({
        statusCode: 401,
        message: `Vous devez être connecté`,
      });
    }

    console.log(authorization);
  };
};

module.exports = authentificationMiddleware;
