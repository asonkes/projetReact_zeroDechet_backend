/*******************************************************************************************/
/** Middleware - Vérification que l'id dans la route est = à l'id rajouté dans la requête  */
/*******************************************************************************************/
const User = require("../../models/user.model");

const userAuthorizationMiddleware = () => {
  return async (req, res, next) => {
    // Voir si id stocker dans la requête = au token la requête
    const userRouterId = req.params.id;
    console.log("userRouterId" + userRouterId);

    // On récupère ici l'id dans le token et qui a été rajouté dans la requête
    const userId = req.user.id;
    console.log("userId", userId);

    // On récupère le rôle de l'utilisateur car si Admin => tous les droits
    try {
      const tokenUser = await User.findById(userId);

      // Si on a pas récupéré d'utilisateur
      // Personne qui fait la requête a été supprimé de la DB
      if (!tokenUser) {
        return res.status(404).json({
          statusCode: 404,
          message: "Vous n'existez plus, dommage!",
        });
      } else {
        // Personne ici, qui fait la requête existe!
        // On va vérifier son rôle
        // Si Admin, ok il a accès
        if (tokenUser.role === "Admin") {
          next();
        } else if (userId === userRouterId) {
          // Si pas Admin
          // Si les 2 id correspondent, ce sont ses recettes qu'il a créé
          next();
        } else {
          // Si pas Admin
          // Et que se ne sont pas ses recettes
          res.status(403).json({
            statusCode: 403,
            message: `Vous n'avez pas les droits d'accéder à ces données`,
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans la DB`,
      });
    }
  };
};

module.exports = userAuthorizationMiddleware;
