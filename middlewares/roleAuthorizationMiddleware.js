/**************************************************************************/
/** Middleware - Pour attribuer un rôle à l'utilisateur (user, admin etc) */
/**************************************************************************/

const User = require("../models/user.model");

const roleAuthorizationMiddleware = (roles) => {
  return async (req, res, next) => {
    // Il faut savoir qui fait la requête
    // Donc on doit récupérer l'id de l'utilisateur
    const userId = req.user.id;

    // On cherche l'utilisateur dans la db
    // Pour pouvoir vérifier son rôle
    try {
      const userInDB = await User.findById(userId);

      // Si pas de user trouvé dans la DB avec cet 'id'
      if (!userInDB) {
        res.status(404).json({
          statusCode: 404,
          message: `Vous n'existez plus dans la DB, dommage`,
        });
        // Si par contre on a trouvé un user
      } else {
        // On va vérifier si son rôle fait partie des rôles autorisés
        // Si ok, on continue la requête donc 'next'
        if (roles.includes(userInDB.role)) {
          next();
        } else {
          // Ici, c'est qu'il n'a pas le droit d'accéder
          res.status(403).json({
            statusCode: 403,
            message: `Nous n'avez pas les droits d'accès sur cette ressource.`,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans la DB`,
      });
    }
  };
};

module.exports = roleAuthorizationMiddleware;
