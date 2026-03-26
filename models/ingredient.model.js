const { Schema, model } = require("mongoose");

// Schéma ==> 1er objet (description)
// Schéma ==> 2eme objet (options collection)
const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value) => {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["fruit", "legume"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      set: (value) => {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },
    consumption: {
      type: [String],
      required: true,
      set: (values) => {
        if (!Array.isArray(values)) return values;
        return values.map((value) => value.trim().toLowerCase());
      },
      enum: [
        "janvier",
        "fevrier",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "aout",
        "septembre",
        "octobre",
        "novembre",
        "decembre",
      ],
    },
  },
  {
    // nom de la collection dans mongoDB
    collection: "ingredient",
    // Permet de rajouter 2champs (createdAt et updatedAt)
    timestamps: true,
  },
);

// On créé un modèle à partir du schéma
// 1er param(nom du modèle)
// 2eme param(schéma du modèle)
const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
