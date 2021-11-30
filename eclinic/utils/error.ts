import { ApolloError } from "@apollo/client";

export const parseGQLError = (error: ApolloError | undefined): string[] => {
  if (!error) return [];

  if (error && Array.isArray(error.graphQLErrors)) {
    return error.graphQLErrors.map(e => {
      try {
        return e.extensions.exception.errors[0].message;
      } catch (err2) {
        return error.message;
      }
    });
  } else {
    return [error.message];
  }
};
