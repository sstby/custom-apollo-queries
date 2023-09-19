import { onError } from "@apollo/client/link/error";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError?.name === "AbortError") {
    console.log("Aborted");
    return;
  }
});
