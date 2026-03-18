/***************************/
/** Router des ingrédients */
/***************************/

const ingredientRouter = require("express").Router();

// Ici je vais aller chercher tous les ingrédients
ingredientRouter.get("/", (req, res) => {
  res.send("Bienvenue dans la page des ingrédients");
});

// Ici un ingrédient en particulier(id)
ingredientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Bienvenue sur l'ingrédient ${id}`);
});

// Ici un ingrédient en particulier(slug)
ingredientRouter.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  res.send(`Bienvenue sur l'ingrédient ${slug}`);
});

ingredientRouter.post("/", (req, res) => {
  const ingredientToInsert = req.body;
  res.send(ingredientToInsert, 201);
});

// On en a pas besoin pour l'instant
// Pouvoir modifier un ingrédient
ingredientRouter.put("/:slug", (req, res) => {
  const ingredientSlug = req.params.slug;
  const ingredientUpdated = req.body;

  ingredientUpdated.slug = ingredientSlug;

  res.send(ingredientUpdated, 200);
});

// On en a pas besoin
// Pouvoir supprimer un ingrédient
ingredientRouter.delete("/:slug", (req, res) => {
  res.sendStatus(204);
});

module.exports = ingredientRouter;
