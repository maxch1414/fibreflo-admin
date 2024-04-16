import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { ShowEngineers } from "./routes/engineers/show";

import "@/globals.css";
import RootLayout from "./layouts/root";
import { ShowTimesheets } from "./routes/timesheets/show";
import { ShowTimesheet } from "./routes/timesheets/showSingle";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/engineers", element: <ShowEngineers /> },
      {
        path: "/timesheets",
        element: <ShowTimesheets />,
      },
      {
        path: "/timesheets/:id",
        element: <ShowTimesheet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
