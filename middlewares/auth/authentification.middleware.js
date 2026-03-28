/***********************************************************/
/** Middleware - Permet de voir si token est bien fournit  */
/***********************************************************/

const authentificationMiddleware = () => {
  // Middleware va vérifier si un token a été fournit ou pas

  /**
   * @param {Request} req
   */
  return (req, res, next) => {
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
    next();

    console.log(authorization);
  };
};

module.exports = authentificationMiddleware;
