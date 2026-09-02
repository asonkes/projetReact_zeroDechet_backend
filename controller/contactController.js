/********************************************/
/** Controller lié au formulaire de contact */
/********************************************/

const { Request, Response } = require("express");
const nodemailerService = require("../services/nodemailer.service");

const contactController = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  sendMessage: async (req, res) => {
    try {
      const { lastname, firstname, email, message } = req.body;
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
      const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameRegex.test(lastname) || !nameRegex.test(firstname)) {
        return res.status(400).json({
          statusCode: 400,
          message: `Votre nom et votre prénom doivent contenir uniquement des lettres.`,
        });
      }

      if (!mailRegex.test(email)) {
        return res.status(400).json({
          statusCode: 400,
          message: `Votre adresse mail n'est pas valide !`,
        });
      }

      if (!message || message.trim().length < 20) {
        return res.status(400).json({
          statusCode: 400,
          message: `Votre message doit comporter au moins 20 caractères.`,
        });
      }

      await nodemailerService.sendEmail({
        lastname,
        firstname,
        email,
        message,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Votre message a bien été envoyé`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: `Erreur lors de l'envoi du message`,
      });
    }
  },
};

module.exports = contactController;
