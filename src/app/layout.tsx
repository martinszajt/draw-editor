'use client'

import { ReactNode, useState } from "react";
import { trpc } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import "../styles/globals.css";
import { geistMono, geistSans } from "@/utils/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
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
        <html lang="en">
          <body className={`${geistSans.className} ${geistMono.className} font-sans`}>{children}</body>
        </html>
      </QueryClientProvider>
    </trpc.Provider>
  );
}