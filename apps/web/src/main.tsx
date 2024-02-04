import React from "react";
import ReactDOM from "react-dom/client";
import { CSSReset, ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Theme } from "./theme.ts";
import { AccountAbstractionProvider } from "./store/accountAbstractionContext.tsx";
import { router } from "./router.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 30000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      cacheTime: 60000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ChakraProvider theme={Theme}>
                <CSSReset />
                <AccountAbstractionProvider>
                    <Flex flexDir="column" h="100vh">
                        <RouterProvider router={router} />
                    </Flex>
                </AccountAbstractionProvider>
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
