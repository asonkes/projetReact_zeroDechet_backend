const { Request, Response } = require("express");
const authService = require("../services/mongo/auth.service");

const authController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  register: async (req, res) => {
    // Le controller va s'occuper juste de récupérer ce qu'il y a dans le body
    // Envoyer les informations dans le service pour que ça fasse un nouvel utilisateur
    // Si tout bien passé, on répond avec une 'réponse 201'
    try {
      // On récupère le body de la requête de l'utilisateur
      const userToAdd = req.body;

      if (await authService.pseudoAlreadyExists(userToAdd.username)) {
        return res.status(409).json({
          statusCode: 409,
          message: `Ce nom d'utilisateur est déjà utilisé!`,
        });
      }

      if (await authService.emailAlreadyExists(userToAdd.email)) {
        return res.status(409).json({
          statusCode: 409,
          message: `Cet email est déjà utilisé!`,
        });
      }

      // On tente d'ajouter l'utilisateur
      // Après avoir créé l'utilisateur
      // Ausinon met par défaut que l'adresse mail existe
      const userCreated = await authService.create(userToAdd);

      res.location(`/api/user/${userCreated.id}`);
      res.status(201).json({ id: userCreated._id, email: userCreated.email });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans la DB`,
      });
    }
  },

  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  login: async (req, res) => {
    try {
      // On récupère le body de la requête de l'utilisateur
      const credentials = req.body;

      const userFound = await authService.findByCredentials(credentials);

      // Si pas d'utilisateur
      if (!userFound) {
        res.status(401).json({
          statusCode: 401,
          message: `Les informations de connexion ne sont pas bonnes`,
        });
      } else {
        // Si l'utilisateur existe
        res.status(200).json({
          id: userFound._id,
          username: userFound.username,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur dans la DB`,
      });
    }
  },
};

module.exports = authController;
