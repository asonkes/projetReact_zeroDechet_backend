/**************************************************/
/** Router principal - relie les autres "routers" */
/**************************************************/

const router = require("express").Router();
const ingredientRouter = require("./ingredient.router");
const recipeRouter = require("./recipe.router");
const authRouter = require("./auth.router");

router.get("/", (req, res) => {
  res.send("Bienvenue sur notre API", 200);
});

router.use("/ingredients", ingredientRouter);

router.use("/recipes", recipeRouter);

router.use("/auth", authRouter);

module.exports = router;
