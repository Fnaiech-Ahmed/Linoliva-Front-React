import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {LayoutDashboard, Package, ShoppingCart, LogOut, Crown, Home} from "lucide-react";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Déconnexion réussie");
    navigate("/admin/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { path: "/admin/orders", icon: ShoppingCart, label: "Commandes" },
    { path: "/admin/products", icon: Package, label: "Produits" },
    { path: "/", icon: Home, label: "Acceuil" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          <div className="border-b p-6">
            <h2 className="text-2xl font-display text-olive-dark">Administration</h2>
            <p className="text-sm text-muted-foreground">Moulin à Huile</p>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="border-t p-4">
              <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/subscription")}
              >
                  <Crown className="mr-3 h-5 w-5" />
                  Abonnement
              </Button>

            <Button
              variant="outline"
              className="w-full justify-start mt-3"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
