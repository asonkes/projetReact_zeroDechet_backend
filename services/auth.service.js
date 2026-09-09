/********************************/
/** Service -  Authentification */
/********************************/

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const authService = {
  // Ici on va recevoir 'email' et 'password'
  // Donc on appelle ca 'credentials
  findByCredentials: async (credentials) => {
    try {
      const userFound = await User.findOne({ email: credentials.email });

      // Si on trouve pas l'utilisateur
      if (!userFound) {
        return undefined;
      }

      // Si on trouve qqchose
      // On vérifie le password
      const checkPassword = await bcrypt.verify(
        userFound.password,
        credentials.password,
      );

      // Si le password correspond pas au password hashé
      // On sort
      if (!checkPassword) {
        return undefined;
      } else {
        return userFound;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  create: async (user) => {
    try {
      const hashedPassword = await bcrypt.hash(user.password);

      user.password = hashedPassword;

      delete user.confirmPassword;

      const userToCreate = User(user);
      await userToCreate.save();
      return userToCreate;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  pseudoAlreadyExists: async (username) => {
    try {
      const pseudoUser = await User.findOne({ username });

      // On vérifie si le username existe => true
      if (pseudoUser) {
        return true;
      } else {
        // sinon ==> false
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  emailAlreadyExists: async (email) => {
    try {
      const emailUser = await User.findOne({ email });

      // si utilisateur avec cet email trouvé => true
      if (emailUser) {
        return true;
        // sinon false
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },
};

module.exports = authService;
