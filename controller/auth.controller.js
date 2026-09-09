/*******************************************************/
/** Controller lié aux utilisateurs (authentification) */
/*******************************************************/

const { Request, Response } = require("express");
const authService = require("../services/auth.service");
const jwtUtils = require("../utils/jwt.utils");

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
      const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Ici on vérifie la validité de l'adresse mail
      if (!mailRegex.test(userToAdd.email)) {
        return res.status(400).json({
          statusCode: 400,
          message: `Votre adresse mail n'est pas valide !`,
        });
      }

      // Vérification longueur mot de passe
      if (!userToAdd.password || userToAdd.password.length < 6) {
        return res.status(400).json({
          statusCode: 400,
          message: "Votre mot de passe doit contenir au moins 6 caractères.",
        });
      }

      // Vérification correspondance mot de passe
      if (userToAdd.password !== userToAdd.confirmPassword) {
        return res.status(400).json({
          statusCode: 400,
          message: "Les mots de passe ne correspondent pas.",
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
        return res.status(401).json({
          statusCode: 401,
          message: `Votre compte n'existe pas. Merci de vous créer un compte.`,
        });
      }

      // Si l'utilisateur existe
      // On va générer un token
      // Si token fonctionne ==> erreur 500 ==> catch
      const token = await jwtUtils.generate(userFound);
      console.log(token);

      // On va renvoyer quelques infos de l'utilisateur + token
      res.status(200).json({
        id: userFound._id,
        email: userFound.email,
        token,
      });
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
