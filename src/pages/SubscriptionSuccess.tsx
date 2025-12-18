import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-olive-light via-sand to-olive-light/30 p-4">
      <Card className="w-full max-w-md border-olive/20 shadow-elegant text-center">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-elegant animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-display text-olive mb-4">
            Merci !
          </h1>
          
          <p className="text-olive-dark/70 text-lg mb-8">
            Votre abonnement est activé.
            <br />
            Vous pouvez maintenant accéder à votre tableau de bord.
          </p>
          
          <Button 
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gradient-to-r from-olive to-olive-dark hover:from-olive-dark hover:to-olive text-white font-semibold py-6 text-lg shadow-medium hover:shadow-soft transition-all duration-300 group"
          >
            Accéder au tableau de bord
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSuccess;
