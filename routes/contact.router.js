/*****************************************/
/** Router pour le formulaire de contact */
/*****************************************/

const contactController = require("../controller/contactController");
const contactRouter = require("express").Router();

contactRouter.route("/").post(contactController.sendMessage);

module.exports = contactRouter;
