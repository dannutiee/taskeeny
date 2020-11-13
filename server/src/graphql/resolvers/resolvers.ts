const Users = require("../../models/Users");

export const resolvers = {
  Query: {
    async users() {
      try {
        const users = await Users.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
