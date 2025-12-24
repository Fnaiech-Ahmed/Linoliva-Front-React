import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Crown, Building2 , Home } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string) => {
    if (plan === "premium") {
      toast.info("Nous vous contacterons bientôt pour discuter de vos besoins.");
      return;
    }
    
    localStorage.setItem("userSubscription", plan);
    navigate("/subscription/success");
  };

  const plans = [
    {
      id: "monthly",
      name: "Mensuel",
      icon: Sparkles,
      price: "73 TND",
      period: "/ mois",
      features: [
        "Accès à toutes les fonctionnalités",
        "Support basique",
        "Facturation mensuelle"
      ],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      buttonText: "Choisir le plan Mensuel"
    },
    {
      id: "annual",
      name: "Annuel",
      icon: Crown,
      price: "730 TND",
      period: "/ an",
      features: [
        "Accès à toutes les fonctionnalités",
        "Support prioritaire",
        "2 mois gratuits"
      ],
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      buttonText: "Choisir le plan Annuel",
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      subtitle: "Producteurs / Coopératives",
      icon: Building2,
      price: "Sur demande",
      period: "",
      features: [
        "Fonctionnalités avancées",
        "Accès multi-utilisateurs",
        "Support 24/7"
      ],
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonText: "Nous contacter"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-light via-sand to-olive-light/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link 
                                to="/admin/dashboard" 
                                className="inline-flex items-center justify-center gap-1 text-olive-dark/70 hover:text-olive transition-colors"
                            >
                                <Home size={16} />
                                Retour au Dashboard
                            </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display text-olive mb-4">
            Choisissez votre formule
          </h1>
          <p className="text-olive-dark/70 text-lg max-w-2xl mx-auto">
            Accédez à nos services digitalisés pour suivre votre production, commandes et facturation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative border-2 ${plan.borderColor} ${plan.bgColor} shadow-elegant hover:shadow-soft transition-all duration-300 hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    Populaire
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-medium`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-display text-olive">
                  {plan.name}
                </CardTitle>
                {plan.subtitle && (
                  <p className="text-sm text-olive-dark/60 font-medium">
                    {plan.subtitle}
                  </p>
                )}
                <CardDescription className="pt-4">
                  <span className="text-4xl font-bold text-olive-dark">{plan.price}</span>
                  <span className="text-olive-dark/60">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-olive-dark/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-6 text-base shadow-medium hover:shadow-soft transition-all duration-300`}
                >
                  → {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-olive-dark/60 text-sm bg-white/50 inline-block px-6 py-3 rounded-full">
            ⚠️ Vous devez choisir une formule d'abonnement pour accéder à la plateforme.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
