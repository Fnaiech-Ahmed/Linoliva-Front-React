import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { createCommande } from "@/services/commande.service";

const Order = () => {
    const [searchParams] = useSearchParams();
    const { toast } = useToast();

    /* ===============================
       Produit depuis l’URL
    =============================== */
    const productId = searchParams.get("productId");
    const productName = searchParams.get("name") || "";
    const productPrice = parseFloat(searchParams.get("price") || "0");
    const productImage = searchParams.get("image") || "";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        quantity: "1",
        notes: ""
    });

    const totalPrice =
        productPrice * parseInt(formData.quantity || "1", 10);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.postalCode
        ) {
            toast({
                title: "Erreur",
                description: "Veuillez remplir tous les champs obligatoires",
                variant: "destructive"
            });
            return;
        }

        try {
            /* -------- BODY COMMANDE -------- */
            const commandeBody = {
                nomVendeur: "Linoliva",
                adresseVendeur: "Tunis",
                mfVendeur: "1254MD",

                nomAcheteur: formData.name,
                adresseAcheteur: formData.phone,
                mfAcheteur: ""
            };

            /* -------- TRANSACTIONS -------- */
            const transactions = [
                {
                    productId: Number(productId),
                    nomProduit: productName,
                    prixUnitaire: productPrice,
                    quantityEntered: Number(formData.quantity),
                    ptht: totalPrice,
                    tva: 0,
                    pttc: totalPrice
                }
            ];

            /* -------- API CALL -------- */
            await createCommande(commandeBody, transactions);

            toast({
                title: "Commande envoyée ✔",
                description: `Merci ${formData.name}, nous vous contacterons sous 24h`
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                postalCode: "",
                quantity: "1",
                notes: ""
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Erreur",
                description: "Erreur lors de l’envoi de la commande",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center shadow-medium">
                                <ShoppingCart className="w-8 h-8 text-accent-foreground" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Commander
                        </h1>
                        <p className="text-muted-foreground">
                            Remplissez le formulaire pour passer votre commande
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* FORMULAIRE */}
                        <Card className="p-8 shadow-soft">
                            <h2 className="text-2xl font-bold mb-6">
                                Informations de livraison
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label>Nom complet *</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Email *</Label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Téléphone *</Label>
                                        <Input
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label>Adresse *</Label>
                                    <Input
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({ ...formData, address: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Code postal"
                                        value={formData.postalCode}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                postalCode: e.target.value
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Ville"
                                        value={formData.city}
                                        onChange={(e) =>
                                            setFormData({ ...formData, city: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
  <Label>Quantité *</Label>
  <div className="flex items-center gap-3 mt-2">
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() =>
        setFormData({
          ...formData,
          quantity: String(Math.max(1, Number(formData.quantity) - 1))
        })
      }
    >
      –
    </Button>

    <Input
      type="number"
      min="1"
      value={formData.quantity}
      onChange={(e) =>
        setFormData({ ...formData, quantity: e.target.value })
      }
      className="w-20 text-center"
    />

    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() =>
        setFormData({
          ...formData,
          quantity: String(Number(formData.quantity) + 1)
        })
      }
    >
      +
    </Button>
  </div>
</div>


                                <Textarea
                                    placeholder="Notes (optionnel)"
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({ ...formData, notes: e.target.value })
                                    }
                                />

                                <Button type="submit" className="w-full text-lg py-6">
                                    <CheckCircle2 className="mr-2" />
                                    Valider la commande
                                </Button>
                            </form>
                        </Card>

                        {/* RÉCAP */}
                        <Card className="p-8 shadow-soft">
                            <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>

                            <div className="flex gap-4">
                                <img
                                    src={productImage}
                                    className="w-24 h-24 rounded object-cover"
                                />
                                <div>
                                    <h3 className="font-bold">{productName}</h3>
                                    <p>{productPrice.toFixed(2)} TND</p>
                                </div>
                            </div>

                            <div className="mt-4 border-t pt-4 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-accent">
                  {totalPrice.toFixed(2)} TND
                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Order;
