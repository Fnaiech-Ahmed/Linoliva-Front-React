import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { getProducts, addProduct, updateProduct, deleteProduct } from "@/services/products";

export interface Product {
    id: number;
    name: string;
    price: number;
    barcode: string;
    description: string;
    adresse_Image_Product: string;
    family: string;
    subFamily: string;
    category: string;
    sub_Category: string;
}

const ProductsManagement = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [currentProduct, setCurrentProduct] = useState<Product>({
        id: 0,
        name: "",
        price: 0,
        barcode: "",
        description: "",
        adresse_Image_Product: "",
        family: "",
        subFamily: "",
        category: "",
        sub_Category: "",
    });

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/admin/login");
            return;
        }

        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch {
            toast.error("Erreur lors du chargement des produits");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (currentProduct.id === 0) {
                await addProduct(currentProduct);
                toast.success("Produit ajouté");
            } else {
                await updateProduct(currentProduct.id, currentProduct);
                toast.success("Produit mis à jour");
            }

            resetForm();
            loadProducts();

        } catch (err) {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const handleEdit = (p: Product) => {
        setCurrentProduct(p);
        setEditMode(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Supprimer ce produit ?")) return;

        try {
            await deleteProduct(id);
            toast.success("Produit supprimé");
            loadProducts();
        } catch {
            toast.error("Erreur lors de la suppression");
        }
    };

    const resetForm = () => {
        setCurrentProduct({
            id: 0,
            name: "",
            price: 0,
            barcode: "",
            description: "",
            adresse_Image_Product: "https://www.huiledoliveitalienne.com/img/cms/blog/14/huile-d-olive.jpg",
            family: "",
            subFamily: "",
            category: "",
            sub_Category: "",
        });
        setEditMode(false);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">

                <h1 className="text-3xl font-display text-olive-dark">Gestion des produits</h1>
                <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez des produits</p>

                <div className="grid gap-6 md:grid-cols-2">

                    {/* ---------- FORM ---------- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {editMode ? "Modifier le produit" : "Ajouter un produit"}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* 2 colonnes */}
                                <div className="grid grid-cols-2 gap-4">

                                    <InputField label="Nom" value={currentProduct.name}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, name: v })}
                                    />

                                    <InputField label="Prix (TND)" type="number" value={currentProduct.price}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, price: parseFloat(v) })}
                                    />

                                    <InputField label="Barcode" value={currentProduct.barcode}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, barcode: v })}
                                    />

                                    {/*<InputField label="URL Image" value={currentProduct.adresse_Image_Product}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, adresse_Image_Product: v })}
                                    />*/}

                                    <InputField label="Famille" value={currentProduct.family}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, family: v })}
                                    />

                                    <InputField label="Sous Famille" value={currentProduct.subFamily}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, subFamily: v })}
                                    />

                                    <InputField label="Catégorie" value={currentProduct.category}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, category: v })}
                                    />

                                    <InputField label="Sous Catégorie" value={currentProduct.sub_Category}
                                                onChange={(v) => setCurrentProduct({ ...currentProduct, sub_Category: v })}
                                    />

                                </div>

                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={currentProduct.description}
                                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit" className="flex-1">
                                        {editMode ? "Mettre à jour" : "Ajouter"}
                                    </Button>

                                    {editMode && (
                                        <Button type="button" variant="outline" onClick={resetForm}>
                                            Annuler
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </CardContent>
                    </Card>

                    {/* ---------- TABLE ---------- */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Liste des produits</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">

                                {loading ? (
                                    <p>Chargement...</p>
                                ) : products.length === 0 ? (
                                    <p>Aucun produit trouvé</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Produit</TableHead>
                                                <TableHead>Prix</TableHead>
                                                <TableHead>Famille</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {products.map((p) => (
                                                <TableRow key={p.id}>
                                                    <TableCell className="font-medium">{p.name}</TableCell>
                                                    <TableCell>{p.price} TND</TableCell>
                                                    <TableCell>{p.family}</TableCell>

                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="outline" onClick={() => handleEdit(p)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Button>

                                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}

                            </div>
                        </CardContent>
                    </Card>

                </div>

            </div>
        </AdminLayout>
    );
};

export default ProductsManagement;


// ---------- COMPONENT INPUT ----------
const InputField = ({
                        label,
                        type = "text",
                        value,
                        onChange
                    }: any) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
        />
    </div>
);
