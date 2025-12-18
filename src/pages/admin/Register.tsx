import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    // Simulation de création de compte
    localStorage.setItem("userAuth", "true");
    localStorage.setItem("userName", formData.fullName);
    
    toast.success("Votre compte a été créé avec succès !", {
      description: "Veuillez choisir votre formule d'abonnement pour continuer."
    });
    
    navigate("/subscription");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-olive-light via-sand to-olive-light/30 p-4">
      <Card className="w-full max-w-md border-olive/20 shadow-elegant">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-display text-olive">
            Créer un nouveau compte
          </CardTitle>
          <CardDescription className="text-olive-dark/70 text-base">
            Veuillez remplir les informations ci-dessous pour activer votre espace client et suivre vos services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-olive-dark">Nom & Prénom</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Mohamed Ben Ali"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="border-olive/30 focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-olive-dark">Numéro de téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+216 XX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-olive/30 focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-olive-dark">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@example.tn"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-olive/30 focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-olive-dark">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-olive/30 focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-olive-dark">Confirmation mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="border-olive/30 focus:border-gold focus:ring-gold/20"
              />
            </div>
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-olive to-olive-dark hover:from-olive-dark hover:to-olive text-white font-semibold py-6 text-lg shadow-medium hover:shadow-soft transition-all duration-300"
              >
                Vérifier et créer mon compte
              </Button>
            </div>
            <p className="text-center text-sm text-olive-dark/60">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-gold hover:text-gold/80 font-medium">
                Se connecter
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
