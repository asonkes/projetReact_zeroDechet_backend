const router = require("express").Router();
const ingredientRouter = require("./ingredient.router");
const recipeRouter = require("./recipe.router");

router.get("/", (req, res) => {
  res.send("Bienvenue sur notre API", 200);
});

router.use("/ingredients", ingredientRouter);

router.use("/recipes", recipeRouter);

module.exports = router;
