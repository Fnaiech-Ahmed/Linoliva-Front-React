import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Package, ShoppingCart, Euro } from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";
import { fetchOrders } from "@/services/orders.service";
import { fetchProducts } from "@/services/products.ts";

const Dashboard = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/admin/login");
            return;
        }

        loadData();
    }, [navigate]);

    async function loadData() {
        try {
            const [ordersData, productsData] = await Promise.all([
                fetchOrders(),
                fetchProducts(),
            ]);

            setOrders(ordersData);
            setProducts(productsData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Calculs dynamiques
    const commandesEnAttente = orders.length;
    const produitsEnStock = products.length;
    const revenusMois = orders.reduce((sum, o) => sum + o.montantTotalTTC, 0);

    // 🔥 3 dernières commandes
    const recentOrders = orders.slice(-3).reverse();

    const stats = [
        {
            title: "Commandes en attente",
            value: commandesEnAttente,
            icon: ShoppingCart,
            color: "text-olive",
        },
        {
            title: "Produits en stock",
            value: produitsEnStock,
            icon: Package,
            color: "text-gold",
        },
        {
            title: "Revenus du mois",
            value: `${revenusMois.toFixed(3)} TND`,
            icon: Euro,
            color: "text-olive-dark",
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-display text-olive-dark">Tableau de bord</h1>
                <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>

                {/* Cartes statistiques */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {loading ? (
                        <p>Chargement…</p>
                    ) : (
                        stats.map((stat, index) => (
                            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </CardTitle>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* QUICK ACTIONS + RECENT ORDERS */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions rapides</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link to="/admin/orders">
                                <Button variant="outline" className="w-full justify-start">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Gérer les commandes
                                </Button>
                            </Link>
                            <Link to="/admin/products">
                                <Button variant="outline" className="mt-3 w-full justify-start">
                                    <Package className="mr-2 h-4 w-4" />
                                    Gérer les produits
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* 🔥 Commandes récentes dynamiques */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Commandes récentes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Aucune commande récente</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentOrders.map((order, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                            <span className="text-sm">
                                                {order.clientName ?? "Client"} — {order.montantTotalTTC} TND
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(order.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
