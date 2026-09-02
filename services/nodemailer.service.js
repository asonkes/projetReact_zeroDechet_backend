/*************************/
/** Service - Nodemailer */
/*************************/

/* Ici nodemailer est importé dans le fichier */
const nodemailer = require("nodemailer");

/* Récupération des variables dans le fichier .env */
const { EMAIL_USER, EMAIL_PASS } = process.env;

/* Création d'un transporteur pour envoyer nos messages de manière automatique */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const nodemailerService = {
  /* Configuration les options du mail */
  sendEmail: ({ lastname, firstname, email, message }) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: EMAIL_USER,
        replyTo: email,
        to: EMAIL_USER,
        subject: `Nouveau message du projet 'Zéro déchet' de l'utilisateur ${firstname} ${lastname}`,
        text: `
            Nom : ${lastname}
            Prénom : ${firstname}
            Email : ${email}
            Message: ${message}
            `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        }

        resolve(info);
      });
    });
  },
};

module.exports = nodemailerService;
