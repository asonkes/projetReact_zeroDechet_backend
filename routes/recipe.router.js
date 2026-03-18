/************************/
/** Router des recettes */
/************************/

const recipeRouter = require("express").Router();

recipeRouter.get("/", (req, res) => {
  res.send("Bienvenue sur la page des recettes");
});

recipeRouter.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  res.send(`Voici la recette ${slug}`, 200);
});

// Pouvoir ajouter une recette
recipeRouter.post("/", (req, res) => {
  const recipeInsert = req.body;
  res.send(recipeInsert, 201);
});

// Pouvoir modifier une recette
recipeRouter.put("/:slug", (req, res) => {
  const recipeSlug = req.params.slug;
  const recipeUpdated = req.body;

  recipeUpdated.slug = recipeSlug;

  res.send(recipeUpdated, 200);
});

// Pouvoir supprimer une recette
recipeRouter.delete("/:slug", (req, res) => {
  res.sendStatus(204);
});

module.exports = recipeRouter;
