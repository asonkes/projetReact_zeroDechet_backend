/**************************************************/
/** Router principal - relie les autres "routers" */
/**************************************************/

const router = require("express").Router();
const ingredientRouter = require("./ingredient.router");
const recipeRouter = require("./recipe.router");
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const contactRouter = require("./contact.router");

router.get("/", (req, res) => {
  res.send("Bienvenue sur notre API", 200);
});

router.use("/ingredients", ingredientRouter);

router.use("/recipes", recipeRouter);

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/contact", contactRouter);

module.exports = router;
