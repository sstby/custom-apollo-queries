import { ApolloLink, DefaultContext } from '@apollo/client';

export const abortLink = new ApolloLink((operation, forward) => {
  const { customQuerySignal } = operation.getContext();

  operation.setContext((context: DefaultContext) => ({
    ...context,
    fetchOptions: {
      signal: customQuerySignal,
    },
  }));

  return forward(operation);
});
