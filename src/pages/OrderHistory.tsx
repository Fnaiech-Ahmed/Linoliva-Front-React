import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageCheck, Clock, Truck, XCircle } from "lucide-react";

export default function OrderHistory() {
    // Données statiques pour le moment
    const orders = [
        {
            id: "CMD-2025-001",
            date: "12 Déc 2025",
            product: "Huile d’Olive Extra Vierge – 1L",
            quantity: 2,
            total: 58.0,
            status: "livré",
            image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
        },
        {
            id: "CMD-2025-002",
            date: "08 Déc 2025",
            product: "Huile d’Olive Bio – 0.5L",
            quantity: 1,
            total: 28.0,
            status: "en cours",
            image: "https://images.unsplash.com/photo-1576181380641-e48e3a0d9c91"
        },
        {
            id: "CMD-2025-003",
            date: "05 Déc 2025",
            product: "Huile d’Olive Premium – 2L",
            quantity: 1,
            total: 75.0,
            status: "annulé",
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2"
        }
    ];

    const statusBadge = (status: string) => {
        switch (status) {
            case "livré":
                return <Badge className="bg-green-600 text-white"><PackageCheck className="w-4 h-4 mr-1" /> Livré</Badge>;
            case "en cours":
                return <Badge className="bg-yellow-500 text-white"><Truck className="w-4 h-4 mr-1" /> En cours</Badge>;
            case "annulé":
                return <Badge className="bg-red-600 text-white"><XCircle className="w-4 h-4 mr-1" /> Annulé</Badge>;
            default:
                return <Badge><Clock className="w-4 h-4 mr-1" /> En attente</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center shadow-medium">
                                <Clock className="w-8 h-8 text-accent-foreground" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-4">
                            Historique des commandes
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Consultez toutes vos commandes passées et en cours.
                        </p>
                    </div>

                    {/* Liste Commandes */}
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {orders.map((order) => (
                            <Card
                                key={order.id}
                                className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 border-border"
                            >
                                <div className="flex gap-5">
                                    <img
                                        src={order.image}
                                        alt={order.product}
                                        className="w-24 h-24 rounded-lg object-cover shadow"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-foreground">
                                                    {order.product}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Commande : <span className="font-medium">{order.id}</span>
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Date : {order.date}
                                                </p>
                                            </div>

                                            {statusBadge(order.status)}
                                        </div>

                                        <div className="flex justify-between items-center mt-4 border-t pt-3">
                                            <p className="text-muted-foreground">
                                                Quantité : <span className="font-semibold">{order.quantity}</span>
                                            </p>
                                            <p className="text-xl font-bold text-accent">{order.total.toFixed(2)} TND</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
