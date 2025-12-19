import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-display font-bold">Linoliva</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Huile d'olive artisanale extra vierge de qualité supérieure. 
              Production traditionnelle et saveurs authentiques depuis 1950.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Nos Huiles
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Commander
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@olea-huile.com</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4" />
                <span>+216 22 589 195</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Ariana, Tunis</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Linoliva. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
