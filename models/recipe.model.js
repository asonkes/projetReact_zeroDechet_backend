/***********************/
/** Modèle - recettes  */
/***********************/

const { Schema, model, Types } = require("mongoose");
const User = require("../models/user.model");

// Schéma ==> 1er objet (description)
// Schéma ==> 2eme objet (options collection)
const recipeSchema = new Schema(
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
      enum: ["entree", "plat", "dessert"],
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
    price: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    number_person: {
      type: Number,
      required: true,
      default: 1,
    },
    timing_preparation: {
      type: Number,
      required: true,
      set: (value) => Math.round(value),
    },
    cooking: {
      type: Number,
      required: true,
      set: (value) => Math.round(value),
    },
    ingredients: [
      {
        ingredient: {
          type: Types.ObjectId,
          ref: "Ingredient",
          required: false,
        },
        name: {
          type: String,
          required: function () {
            return !this.ingredient;
          },
        },
        quantity_person: {
          type: Schema.Types.Mixed,
          required: true,
          set: (value) => {
            // Si c'est la string "au goût", on garde
            if (
              typeof value === "string" &&
              value.toLowerCase() === "au goût"
            ) {
              return "au goût";
            }

            // Si c'est un nombre, on arrondit au multiple de 0.25
            if (typeof value === "number") {
              return Math.round(value * 4) / 4;
            }

            // Sinon, erreur
            throw new Error("quantity_person doit être un nombre ou 'au goût'");
          },
        },
        unity: {
          type: String,
          required: true,
          enum: [
            "boite",
            "botte",
            "bouquet",
            "branche",
            "brin",
            "cube",
            "cuillere_cafe",
            "cuillere_soupe",
            "feuille",
            "filet",
            "g",
            "gousse",
            "piece",
            "pincee",
            "noix",
            "ml",
            "sachet",
            "tranche",
            "verre",
            "",
          ],
        },
      },
    ],
    preparation: {
      type: [String],
      required: true,
      set: (steps) => {
        if (!steps) return steps;
        return steps.map((step, index) => {
          if (!step) return step;
          const formattedStep =
            step.charAt(0).toUpperCase() + step.slice(1).toLowerCase();
          return `Étape ${index + 1}: ${formattedStep}`;
        });
      },
    },
    // pour l'ajout des recettes par l'utilisateur
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    collection: "recipe",
    timestamps: true,
  },
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
