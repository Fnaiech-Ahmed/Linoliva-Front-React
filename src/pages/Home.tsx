import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Leaf, Award, Heart, Truck, Mail, Phone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-olives.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-b
                  from-primary/40
                  to-primary/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-block mb-6 animate-float">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-medium">
              <Leaf className="w-12 h-12 text-accent-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 animate-slide-up">
            Linoliva
          </h1>
          
          <p className="text-xl md:text-3xl text-primary-foreground/90 mb-4 font-light animate-slide-up" style={{ animationDelay: "0.2s" }}>
            L'Excellence de l'Huile d'Olive Artisanale
          </p>
          
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Découvrez notre huile d'olive extra vierge, produite traditionnellement 
            dans nos oliveraies provençales. Saveurs authentiques et qualité premium.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/products">
              <Button size="lg" className="bg-accent hover:bg-gold text-accent-foreground font-semibold text-lg px-8 py-6 shadow-medium hover:shadow-soft transition-all duration-300 hover:scale-105">
                Découvrir Nos Huiles
              </Button>
            </Link>
            <Link to="/order">
              <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold text-lg px-8 py-6 transition-all duration-300 hover:scale-105">
                Commander Maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              L'Art de l'Huile d'Olive
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Depuis 1950, nous perpétuons la tradition méditerranéenne de production d'huile d'olive. 
              Chaque goutte reflète notre passion pour l'excellence et le respect de la nature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-card border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">100% Naturelle</h3>
              <p className="text-muted-foreground">
                Première pression à froid, sans additifs ni conservateurs. 
                Pure expression du fruit de l'olivier.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-card border-border">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Qualité Premium</h3>
              <p className="text-muted-foreground">
                Certifiée extra vierge, notre huile est régulièrement primée 
                dans les concours internationaux.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 hover:-translate-y-2 bg-card border-border">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">Tradition & Passion</h3>
              <p className="text-muted-foreground">
                Savoir-faire familial transmis de génération en génération 
                pour un goût authentique incomparable.
              </p>
            </Card>
          </div>

          {/* Process Section */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border">
            <h3 className="text-3xl font-display font-bold text-center mb-8 text-foreground">Notre Processus Artisanal</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { num: "01", title: "Récolte", desc: "Cueillette manuelle à maturité optimale" },
                { num: "02", title: "Pressage", desc: "Extraction à froid dans les 24h" },
                { num: "03", title: "Filtration", desc: "Méthode traditionnelle douce" },
                { num: "04", title: "Mise en bouteille", desc: "Conservation optimale garantie" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-display font-bold text-accent mb-3">{step.num}</div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-primary">
            Pourquoi Choisir Linoliva ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Excellence Certifiée</h3>
                <p className="text-muted-foreground">
                  Médailles d'or aux concours internationaux, certification AOP et labels bio
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Bienfaits Santé</h3>
                <p className="text-muted-foreground">
                  Riche en antioxydants, vitamines E et acides gras essentiels
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Production Éco-Responsable</h3>
                <p className="text-muted-foreground">
                  Agriculture raisonnée, respect de l'environnement et du terroir
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Livraison Soignée</h3>
                <p className="text-muted-foreground">
                  Emballage protecteur, expédition rapide partout en France
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
                Contactez-Nous
              </h2>
              <p className="text-lg text-muted-foreground">
                Une question ? Notre équipe est à votre écoute
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 bg-card border-border">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Email</h3>
                <a href="mailto:contact@olea-huile.fr" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@linoLiva.tn
                </a>
              </Card>

              <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 bg-card border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Téléphone</h3>
                <a href="tel:+216 22589195" className="text-muted-foreground hover:text-primary transition-colors">
                    +216 22589195
                </a>
              </Card>

              <Card className="p-8 text-center hover:shadow-medium transition-all duration-300 bg-card border-border">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Adresse</h3>
                <p className="text-muted-foreground">
                  Borj louzir<br />
                  2700 Ariana, Tunis
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to="/order">
                <Button size="lg" className="bg-gradient-to-r from-accent to-gold hover:from-gold hover:to-accent text-accent-foreground font-semibold text-lg px-12 py-6 shadow-medium hover:shadow-soft transition-all duration-300 hover:scale-105">
                  Commander Votre Huile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
