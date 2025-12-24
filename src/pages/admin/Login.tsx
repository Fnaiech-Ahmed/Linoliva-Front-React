import { useState ,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { loginRequest } from "@/api/auth.api";
import { decodeToken } from "@/utils/jwt.util";
import { AuthContext } from "@/contexts/AuthContext";
import { Eye, EyeOff, Home } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }

        setLoading(true);

        try {
            const data = await loginRequest(credentials.email, credentials.password);

            if (!data?.token) {
                toast.error("Login échoué : pas de token reçu");
                setLoading(false);
                return;
            }
            login(data.token);
            // Stocker le token
            //localStorage.setItem("token", data.token);

            toast.success("Connexion réussie");

            // Décodage du token
            const decoded = decodeToken(data.token);

            if (!decoded) {
                toast.error("Token invalide");
                return;
            }

            const role = decoded.role?.toLowerCase(); // "admin" | "user"

            console.log("ROLE:", role);

            // Redirection selon rôle
            switch (role) {
                case "admin":
                    navigate("/admin/dashboard");
                    break;

                case "user":
                    navigate("/");
                    break;

                default:
                    navigate("/login");
                    break;
            }

        } catch (err) {
            toast.error("Email ou mot de passe incorrect");
        }

        setLoading(false);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-olive-light via-sand to-olive-light/30 p-4">
            <Card className="w-full max-w-md border-olive/20 shadow-elegant">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-display text-olive">
                        Bienvenue sur notre plateforme
                    </CardTitle>
                    <CardDescription className="text-olive-dark/70 text-base">
                        Connectez-vous pour accéder à vos services.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Connexion..." : "Se connecter"}
                        </Button>
                        <div className="flex flex-col gap-2 text-center text-sm">
                           {/* <Link to="/auth/register" className="text-olive hover:text-olive-dark transition-colors">
                                Créer un compte
                            </Link>*/}
                            
                           
                            <Link 
                                to="/" 
                                className="inline-flex items-center justify-center gap-1 text-olive-dark/70 hover:text-olive transition-colors"
                            >
                                <Home size={16} />
                                Retour à l'accueil
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
