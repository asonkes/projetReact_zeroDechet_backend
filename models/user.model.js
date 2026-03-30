/****************************/
/** Modèle - urtilisateurs  */
/****************************/

const { Schema, model, Types } = require("mongoose");
const Recipe = require("./recipe.model");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
      // valeur par défaut
      default: "User",
    },
    // Fait le lien avec les recettes que l'utilisateur préfère
    favorites: [
      {
        // id
        type: Types.ObjectId,
        // correspond au nom du modèle Mongoose
        ref: "Recipe",
      },
    ],
  },
  {
    collection: "user",
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
