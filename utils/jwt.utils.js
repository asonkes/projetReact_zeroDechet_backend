/**********************/
/** Création du token */
/**********************/

const jwt = require("jsonwebtoken");

// On va créer un objet dans lequel il y aura 2 fonctions
// 1) Créer le token à partir de certaines infos
// 2) L'autre qui permet de décoder un token et récupérer les infos contenues dedans

// Récupération des variables d'environnement pour créer(décoder) le token
// Se trouve dans le fichier ".env"
const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

const jwtUtils = {
  generate: (user) => {
    return new Promise((resolve, reject) => {
      // Création du "payload" avec certaines données de l'utilisateur
      // Claims (données) que l'on va mettre dans notre payload

      const payload = {
        id: user._id,
        role: user.role,
      };

      // Paramétrer les options pour créer notre token
      const options = {
        // Choix de l'algo de hashage du token, par défaut H256
        algorithm: "HS512",
        // Choix de la date d'expiration du token
        // Ici '3d' = "3jours"
        expiresIn: "3d",
        // Information sur "à qui" est destiné le token
        audience: JWT_AUDIENCE,
        // Information sur "qui" envoie le token (notre api)
        issuer: JWT_ISSUER,
      };

      // Création du token, on a besoin:
      // 1) payload (informations à stocker dans le token)
      // 2) un secret (c'ets le code secret qui va nous servir à encoder et à décode le jeton)
      // 3) Peut pas être mis sur git
      jwt.sign(payload, JWT_SECRET, options, (error, token) => {
        // Si erreur, param 'error' sera rempli et 'token' vide
        if (error) {
          console.log(error);
          return reject(error);
        }

        // Si tt s'est bien passé, param 'error' vide et 'token' sera rempli
        resolve(token);
      });
    });
  },

  // décodage du token
  decode: (token) => {
    return new Promise((resolve, reject) => {
      // Si pas de paramètre, promesse non tenue
      if (!token) {
        return reject(new Error("Pas de token reçu!"));
      }

      // si token, on le décoder
      // ON utilise alors la méthode verify qui a des paramètres
      // 1) 1er param = token à décoder
      // 2) 2eme param = c'est le secret
      // 3) 3eme param = ce sont les options pour le décoder
      // 4) 4eme param = fonction qui sera lancée à la fin de la vérification

      // On créé les options
      const options = {
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
      };

      jwt.verify(token, JWT_SECRET, options, (error, payload) => {
        // Si erreur pendant le décodage => "error" rempli et "payload" vide
        if (error) {
          return reject(error);
        }

        // Si pas d'erreur pendant le décodage => "error" vide et "payload" rempli
        resolve(payload);
      });
    });
  },
};

module.exports = jwtUtils;
