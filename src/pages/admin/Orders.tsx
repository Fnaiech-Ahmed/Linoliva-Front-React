import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "@/components/admin/AdminLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { fetchOrders } from "@/services/orders.service";
import { Order } from "@/types/Order";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const ITEMS_PER_PAGE = 15;

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/admin/login");
            return;
        }

        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch (err) {
            toast.error("Erreur lors du chargement des commandes");
        } finally {
            setLoading(false);
        }
    }

    const getStatusBadge = () => {
        return <Badge variant="secondary">En attente</Badge>;
    };

    // Pagination logic
    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-display text-olive-dark">Gestion des commandes</h1>
                <p className="text-muted-foreground">Liste de vos commandes</p>

                <Card>
                    <CardHeader>
                        <CardTitle>Toutes les commandes</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {loading ? (
                            <p>Chargement…</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Référence</TableHead>
                                                <TableHead>Acheteur</TableHead>
                                                <TableHead>Vendeur</TableHead>
                                                <TableHead>Total TTC</TableHead>
                                                <TableHead>Statut</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {visibleOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell>#{order.id}</TableCell>
                                                    <TableCell>{order.referenceCommande}</TableCell>
                                                    <TableCell>{order.nomAcheteur}</TableCell>
                                                    <TableCell>{order.nomVendeur}</TableCell>
                                                    <TableCell>{order.montantTotalTTC} TND</TableCell>
                                                    <TableCell>{getStatusBadge()}</TableCell>

                                                    <TableCell>
                                                        <Button size="sm" variant="outline">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-between items-center mt-4">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                    >
                                        Précédent
                                    </Button>

                                    <p>
                                        Page <strong>{currentPage}</strong> sur <strong>{totalPages}</strong>
                                    </p>

                                    <Button
                                        variant="outline"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                    >
                                        Suivant
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default Orders;
