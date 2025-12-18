import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Subscription from "./pages/Subscription";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ProductsManagement from "@/pages/admin/ProductsManagement";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "@/pages/admin/Register";
import SubscriptionSuccess from "@/pages/SubscriptionSuccess";
import OrderHistory from "@/pages/OrderHistory.tsx";
import Orders from "@/pages/admin/Orders.tsx";

const queryClient = new QueryClient();

// ⚡ Convert your routes to createBrowserRouter
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    { path: "/products", element: <Products /> },
    { path: "/order", element: <Order /> },
    { path: "/orders", element: <OrderHistory /> },

    // Auth
    { path: "/login", element: <Login /> },
    { path: "/subscription", element: <Subscription /> },
    { path: "/subscription/success", element: <SubscriptionSuccess /> },

    // Admin
    { path: "/admin/login", element: <Login /> },
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/orders", element: <Orders /> },
    { path: "/admin/products", element: <ProductsManagement /> },
    { path: "/auth/register", element: <Register /> },

    // 404
    { path: "*", element: <NotFound /> },
]);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />

            <AuthProvider>
                <RouterProvider
                    router={router}
                    future={{
                        v7_startTransition: true,
                       // v7_relativeSplatPath: true,
                    }}
                />
            </AuthProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
