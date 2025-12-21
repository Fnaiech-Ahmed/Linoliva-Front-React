import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "@/components/admin/AdminLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { fetchOrders } from "@/services/orders.service";
import { getTransactionsByReference } from "@/services/transactions.service";

import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const ITEMS_PER_PAGE = 15;

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Modal
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loadingTx, setLoadingTx] = useState(false);

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

    async function openOrderDetails(order) {
        setSelectedOrder(order);
        setOpen(true);
        setLoadingTx(true);

        try {
            const data = await getTransactionsByReference(
                order.referenceCommande
            );
            setTransactions(data);
        } catch (e) {
            toast.error("Erreur lors du chargement des transactions");
        } finally {
            setLoadingTx(false);
        }
    }

    const getStatusBadge = () => {
        return <Badge variant="secondary">En attente</Badge>;
    };

    // Pagination logic
    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleOrders = orders.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-display text-olive-dark">
                    Gestion des commandes
                </h1>
                <p className="text-muted-foreground">
                    Liste de vos commandes
                </p>

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
                                                    <TableCell>
                                                        #{order.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            order.referenceCommande
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.nomAcheteur}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.nomVendeur}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            order.montantTotalTTC
                                                        }{" "}
                                                        TND
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                openOrderDetails(
                                                                    order
                                                                )
                                                            }
                                                        >
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
                                        onClick={() =>
                                            setCurrentPage((p) => p - 1)
                                        }
                                    >
                                        Précédent
                                    </Button>

                                    <p>
                                        Page{" "}
                                        <strong>{currentPage}</strong> sur{" "}
                                        <strong>{totalPages}</strong>
                                    </p>

                                    <Button
                                        variant="outline"
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage((p) => p + 1)
                                        }
                                    >
                                        Suivant
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* ================= MODAL DETAILS COMMANDE ================= */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>
                            Détails de la commande
                        </DialogTitle>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6 text-sm">
                            {/* Infos */}
                            <div className="grid grid-cols-2 gap-4">
                                <p>
                                    <strong>Vendeur :</strong>{" "}
                                    {selectedOrder.nomVendeur}
                                </p>
                                <p>
                                    <strong>Acheteur :</strong>{" "}
                                    {selectedOrder.nomAcheteur}
                                </p>
                                <p>
                                    <strong>Adresse :</strong>{" "}
                                    {selectedOrder.adresseAcheteur}
                                </p>
                                <p>
                                    <strong>Référence :</strong>{" "}
                                    {
                                        selectedOrder.referenceCommande
                                    }
                                </p>
                                <p>
                                    <strong>Montant HT :</strong>{" "}
                                    {selectedOrder.montantTotalHT} DT
                                </p>
                                <p>
                                    <strong>TVA :</strong>{" "}
                                    {selectedOrder.tva ?? 0} %
                                </p>

                                <p className="col-span-2 text-green-600 font-semibold">
                                    Total TTC :{" "}
                                    {selectedOrder.montantTotalTTC} DT
                                </p>
                            </div>

                            {/* Transactions */}
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Transactions liées
                                </h3>

                                {loadingTx ? (
                                    <p>
                                        Chargement des transactions…
                                    </p>
                                ) : transactions.length === 0 ? (
                                    <p>Aucune transaction</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Produit
                                                </TableHead>
                                                <TableHead>
                                                    Quantité
                                                </TableHead>
                                                <TableHead>
                                                    Prix Unitaire
                                                </TableHead>
                                                <TableHead>
                                                    Total
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {transactions.map((tx) => (
                                                <TableRow
                                                    key={tx.id}
                                                >
                                                    <TableCell>
                                                        {tx.produitNom}
                                                    </TableCell>
                                                    <TableCell>
                                                        {tx.quantite}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            tx.prixUnitaire
                                                        }{" "}
                                                        DT
                                                    </TableCell>
                                                    <TableCell>
                                                        {tx.prixUnitaire *
                                                            tx.quantite}{" "}
                                                        DT
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    variant="secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    Fermer
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default Orders;
