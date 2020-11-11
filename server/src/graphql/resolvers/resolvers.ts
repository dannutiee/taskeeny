// Todo make an index file only for export partial resolvers
export const resolvers = {
  Query: {
    me: () => {
      return {
        username: "Robin Wieruch",
      };
    },
  },
};
