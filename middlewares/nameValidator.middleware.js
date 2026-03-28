/*********************************************************************************/
/** Middleware - Pour vérifier le name - ex : ajout de recette avec nom vulgaire */
/*********************************************************************************/

const leoProfanity = require("leo-profanity");

leoProfanity.loadDictionary("fr");

const tab = [
  "pute",
  "nique",
  "bite",
  "fuck",
  "putain",
  "baiser",
  "shit",
  "bitch",
];

const nameValidatorMiddleware = () => {
  return (req, res, next) => {
    // Si pas de body ou si pas de nom
    if (!req.body || !req.body.name) {
      return next();
    }

    const name = req.body.name.toLowerCase();
    const offensivesWordsLib = leoProfanity.check(name);

    const offensiveWords = tab.some((word) => name.includes(word));

    if (offensiveWords || offensivesWordsLib) {
      return res.status(400).json({
        statusCode: 400,
        message: "Nom inapproprié!",
      });
    }

    next();
  };
};

module.exports = nameValidatorMiddleware;
