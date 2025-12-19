import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu } from "lucide-react";
import { useState, useContext } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

import { AuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: "/", label: "Accueil" },
        { path: "/products", label: "Nos Huiles" },
        //{ path: "/orders", label: "Commandes" },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-olive-dark flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                            <Leaf className="w-6 h-6 text-primary-foreground" />
                        </div>*/}
                        <img
                            src="/logo.png"
                            alt="Linoliva Logo"
                            className="h-11 w-auto object-contain drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
                        />

                        {/*  <span className="text-2xl font-display font-bold text-primary">Linoliva</span>*/}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-primary ${
                                    isActive(link.path) ? "text-primary" : "text-foreground"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center space-x-2">
                        {/* <Link to="/order">
                            <Button className="bg-gradient-to-r from-accent to-gold hover:from-gold hover:to-accent text-accent-foreground font-semibold shadow-medium hover:shadow-soft transition-all duration-300 hover:scale-105 rounded-xl">
                                Commander
                            </Button>
                        </Link>*/}

                        {user ? (
                            <Button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-medium hover:shadow-soft transition-all duration-300 hover:scale-105 rounded-xl"
                            >
                                Logout
                            </Button>
                        ) : (
                            <Link to="/admin/login">
                                <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-semibold shadow-medium hover:shadow-soft transition-all duration-300 hover:scale-105 rounded-xl">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="text-foreground">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-[280px] bg-background">
                            <VisuallyHidden>
                                <DialogTitle>Mobile Navigation Menu</DialogTitle>
                            </VisuallyHidden>

                            <div className="flex flex-col gap-6 mt-8">
                                {/* Mobile Nav Links */}
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.path}>
                                            <Link
                                                to={link.path}
                                                className={`text-lg font-medium transition-colors hover:text-primary py-2 ${
                                                    isActive(link.path)
                                                        ? "text-primary"
                                                        : "text-foreground"
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                {/* Mobile Buttons */}
                                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                                    {/*  <SheetClose asChild>
                                        <Link to="/order">
                                            <Button className="w-full bg-gradient-to-r from-accent to-gold hover:from-gold hover:to-accent text-accent-foreground font-semibold shadow-medium rounded-xl">
                                                Commandes
                                            </Button>
                                        </Link>
                                    </SheetClose> */}

                                    <SheetClose asChild>
                                        {user ? (
                                            <Button
                                                onClick={handleLogout}
                                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-medium rounded-xl"
                                            >
                                                Logout
                                            </Button>
                                        ) : (
                                            <Link to="/admin/login">
                                                <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-semibold shadow-medium rounded-xl">
                                                    Admin Login
                                                </Button>
                                            </Link>
                                        )}
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
