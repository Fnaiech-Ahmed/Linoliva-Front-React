import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchProducts } from "../services/products";
import { Card } from "@/components/ui/card";
import { Award, Leaf, Star } from "lucide-react";

import { useNavigate } from "react-router-dom";

// ...
export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts()
            .then(data => setProducts(data))
            .catch(err => console.error("Erreur API:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-accent to-gold animate-spin">
                <Leaf className="w-10 h-10 text-accent-foreground" />
            </div>
            <span className="text-lg text-primary font-medium mt-4">Chargement des produits...</span>
        </div>
    );
}



    const handleOrderClick = (product: any) => {
        // Rediriger vers la page /order avec les infos du produit
        navigate(`/order?productId=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&image=${encodeURIComponent(product.adresse_Image_Product)}`);
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-12">
                <Navbar />

                {/* Header */}
                <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-block mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center shadow-medium">
                                <Leaf className="w-8 h-8 text-accent-foreground" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                            Nos Huiles d'Olive
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Chaque huile est le fruit d'une sélection rigoureuse et d'un savoir-faire transmis
                            de génération en génération. Découvrez nos différentes cuvées.
                        </p>
                    </div>
                </section>

                {/* Liste des produits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                src={"https://www.huiledoliveitalienne.com/img/cms/blog/14/huile-d-olive.jpg"}
                                alt={p.name}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5">
                                <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                                <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-primary">{p.price} TND</span>
                                    <button
                                        onClick={() => handleOrderClick(p)}
                                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/80 transition-colors"
                                    >
                                        Commander
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
