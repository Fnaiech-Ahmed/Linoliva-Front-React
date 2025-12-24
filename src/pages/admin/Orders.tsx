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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
/*updateOrder*/
import { fetchOrders, deleteOrder,updateOrder } from "@/services/orders.service";
import { getTransactionsByReference } from "@/services/transactions.service";

import { toast } from "sonner";
import { CheckCircle, Edit, Trash2, Plus, X } from "lucide-react";

const ITEMS_PER_PAGE = 15;

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Modal détails
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loadingTx, setLoadingTx] = useState(false);

    // Modal modification
    const [editOpen, setEditOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [editTransactions, setEditTransactions] = useState([]);
    const [updating, setUpdating] = useState(false);

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
            const data = await getTransactionsByReference(order.referenceCommande);
            setTransactions(data);
        } catch (e) {
            toast.error("Erreur lors du chargement des transactions");
        } finally {
            setLoadingTx(false);
        }
    }

    async function openEditModal(order) {
        setEditingOrder({ ...order });
        setEditOpen(true);
        setLoadingTx(true);

        try {
            const data = await getTransactionsByReference(order.referenceCommande);
            setEditTransactions(data.map(tx => ({ ...tx })));
        } catch (e) {
            toast.error("Erreur lors du chargement des transactions");
            setEditTransactions([]);
        } finally {
            setLoadingTx(false);
        }
    }

    async function handleDeleteOrder(orderId) {
        try {
            const confirmed = window.confirm("Voulez-vous vraiment supprimer cette commande ?");
            if (!confirmed) return;

            await deleteOrder(orderId);
            toast.success("Commande supprimée !");
            loadOrders();
        } catch (err) {
            toast.error("Erreur lors de la suppression !");
        }
    }

    async function handleUpdateOrder() {
        if (!editingOrder) return;

        try {
            setUpdating(true);

            // Valider que les transactions ont les champs nécessaires
            const validTransactions = editTransactions.filter(
                tx => tx.productId && tx.nomProduit && tx.quantityEntered > 0
            );

            if (validTransactions.length === 0) {
                toast.error("Veuillez ajouter au moins une transaction valide");
                setUpdating(false);
                return;
            }

            
            const commandeDTO = {
                nomVendeur: editingOrder.nomVendeur || "",
                adresseVendeur: editingOrder.adresseVendeur || "",
                mfVendeur: editingOrder.mfVendeur || "",
                gsmVendeur: editingOrder.gsmVendeur || 0,
                titreAcheteur: editingOrder.titreAcheteur || 0,
                nomAcheteur: editingOrder.nomAcheteur || "",
                adresseAcheteur: editingOrder.adresseAcheteur || "",
                mfAcheteur: editingOrder.mfAcheteur || "",
                gsmAcheteur: editingOrder.gsmAcheteur || 0,
                proprietaireId: editingOrder.proprietaireId || null,
                tva: editingOrder.tva || 0,
            };

            const transactionsPayload = validTransactions.map(tx => ({
                id: tx.id || 0,
                productId: tx.productId,
                nomProduit: tx.nomProduit,
                quantityEntered: tx.quantityEntered,
                prixUnitaire: tx.prixUnitaire,
                referenceCommande: editingOrder.referenceCommande,
            }));

            await updateOrder(editingOrder.id, commandeDTO, transactionsPayload);

            toast.success("Commande mise à jour avec succès !");
            setEditOpen(false);
            loadOrders();
        } catch (err) {
            console.error("Erreur complète:", err);
            const errorMsg = err?.response?.data?.message || err?.message || "Erreur lors de la mise à jour";
            toast.error(errorMsg);
        } finally {
            setUpdating(false);
        }
    }

    function handleEditOrderField(field, value) {
        setEditingOrder(prev => ({ ...prev, [field]: value }));
    }

    function handleEditTransaction(index, field, value) {
        setEditTransactions(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    }

    function addNewTransaction() {
        setEditTransactions(prev => [
            ...prev,
            {
                id: 0,
                productId: 0,
                nomProduit: "",
                quantityEntered: 1,
                prixUnitaire: 0,
                referenceCommande: editingOrder?.referenceCommande || "",
            },
        ]);
    }

    function removeTransaction(index) {
        setEditTransactions(prev => prev.filter((_, i) => i !== index));
    }

    const getStatusBadge = () => {
        return <Badge variant="secondary">En attente</Badge>;
    };

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-display text-olive-dark">
                    Gestion des commandes
                </h1>
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
                                                    <TableCell className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => openOrderDetails(order)}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => openEditModal(order)}
                                                            //onClick={() => {}}
                                                            title="Modifier commande"
                                                            className="hover:bg-blue-500 hover:text-white"
                                                        >
                                                            <Edit className="h-4 w-4 text-current" />
                                                        </Button>

                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDeleteOrder(order.id)}
                                                            title="Supprimer commande"
                                                            className="hover:bg-red-600 hover:text-white"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-current" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

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

            {/* ================= MODAL DETAILS COMMANDE ================= */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Détails de la commande</DialogTitle>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <p><strong>Vendeur :</strong> {selectedOrder.nomVendeur}</p>
                                <p><strong>Acheteur :</strong> {selectedOrder.nomAcheteur}</p>
                                <p><strong>Adresse :</strong> {selectedOrder.adresseAcheteur}</p>
                                <p><strong>Référence :</strong> {selectedOrder.referenceCommande}</p>
                                <p><strong>Montant HT :</strong> {selectedOrder.montantTotalHT} DT</p>
                                <p><strong>TVA :</strong> {selectedOrder.tva ?? 0} %</p>
                                <p className="col-span-2 text-green-600 font-semibold">
                                    Total TTC : {selectedOrder.montantTotalTTC} DT
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Transactions liées</h3>
                                {loadingTx ? (
                                    <p>Chargement des transactions…</p>
                                ) : transactions.length === 0 ? (
                                    <p>Aucune transaction</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Produit</TableHead>
                                                <TableHead>Quantité</TableHead>
                                                <TableHead>Prix Unitaire</TableHead>
                                                <TableHead>Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {transactions.map((tx) => (
                                                <TableRow key={tx.productId}>
                                                    <TableCell>{tx.nomProduit}</TableCell>
                                                    <TableCell>{tx.quantityEntered}</TableCell>
                                                    <TableCell>{tx.prixUnitaire} DT</TableCell>
                                                    <TableCell>
                                                        {tx.prixUnitaire * tx.quantityEntered} DT
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button variant="secondary" onClick={() => setOpen(false)}>
                                    Fermer
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ================= MODAL MODIFICATION COMMANDE =================*/}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Modifier la commande</DialogTitle>
                    </DialogHeader>

                    {editingOrder && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Nom Vendeur</Label>
                                    <Input
                                        value={editingOrder.nomVendeur}
                                        onChange={(e) => handleEditOrderField("nomVendeur", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Adresse Vendeur</Label>
                                    <Input
                                        value={editingOrder.adresseVendeur || ""}
                                        onChange={(e) => handleEditOrderField("adresseVendeur", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>MF Vendeur</Label>
                                    <Input
                                        value={editingOrder.mfVendeur || ""}
                                        onChange={(e) => handleEditOrderField("mfVendeur", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>GSM Vendeur</Label>
                                    <Input
                                        type="number"
                                        value={editingOrder.gsmVendeur || 0}
                                        onChange={(e) => handleEditOrderField("gsmVendeur", parseInt(e.target.value) || 0)}
                                    />
                                </div>

                                <div>
                                    <Label>Nom Acheteur</Label>
                                    <Input
                                        value={editingOrder.nomAcheteur}
                                        onChange={(e) => handleEditOrderField("nomAcheteur", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Adresse Acheteur</Label>
                                    <Input
                                        value={editingOrder.adresseAcheteur}
                                        onChange={(e) => handleEditOrderField("adresseAcheteur", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>MF Acheteur</Label>
                                    <Input
                                        value={editingOrder.mfAcheteur || ""}
                                        onChange={(e) => handleEditOrderField("mfAcheteur", e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>GSM Acheteur</Label>
                                    <Input
                                        type="number"
                                        value={editingOrder.gsmAcheteur || 0}
                                        onChange={(e) => handleEditOrderField("gsmAcheteur", parseInt(e.target.value) || 0)}
                                    />
                                </div>

                                <div>
                                    <Label>TVA (%)</Label>
                                    <Input
                                        type="number"
                                        value={editingOrder.tva || 0}
                                        onChange={(e) => handleEditOrderField("tva", parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-semibold">Transactions</h3>
                                    <Button size="sm" onClick={addNewTransaction}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Ajouter
                                    </Button>
                                </div>

                                {loadingTx ? (
                                    <p>Chargement...</p>
                                ) : (
                                    <div className="space-y-3">
                                        {editTransactions.map((tx, index) => (
                                            <div key={index} className="border p-3 rounded-lg space-y-2">
                                                <div className="grid grid-cols-4 gap-2">
                                                    <div>
                                                        <Label className="text-xs">Produit ID</Label>
                                                        <Input
                                                            type="number"
                                                            value={tx.productId}
                                                            onChange={(e) =>
                                                                handleEditTransaction(index, "productId", parseInt(e.target.value) || 0)
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label className="text-xs">Nom Produit</Label>
                                                        <Input
                                                            value={tx.nomProduit}
                                                            onChange={(e) =>
                                                                handleEditTransaction(index, "nomProduit", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label className="text-xs">Quantité</Label>
                                                        <Input
                                                            type="number"
                                                            value={tx.quantityEntered}
                                                            onChange={(e) =>
                                                                handleEditTransaction(index, "quantityEntered", parseInt(e.target.value) || 1)
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label className="text-xs">Prix Unitaire</Label>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            value={tx.prixUnitaire}
                                                            onChange={(e) =>
                                                                handleEditTransaction(index, "prixUnitaire", parseFloat(e.target.value) || 0)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-semibold">
                                                        Total: {(tx.quantityEntered * tx.prixUnitaire).toFixed(2)} DT
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => removeTransaction(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => setEditOpen(false)}>
                                    Annuler
                                </Button>
                                <Button onClick={handleUpdateOrder} disabled={updating}>
                                    {updating ? "Mise à jour..." : "Enregistrer"}
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