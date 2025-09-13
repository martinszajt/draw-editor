// pages/_app.tsx
import { useState } from "react";
import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import "../styles/globals.css"; // ✅ keep your existing imports

const MyApp: AppType = ({ Component, pageProps }) => {
  // Create a QueryClient instance (only once per app)
  const [queryClient] = useState(() => new QueryClient());

  // Create a tRPC client
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* ✅ keep your existing providers/layouts here */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;
