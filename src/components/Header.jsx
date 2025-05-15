
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Search, 
  LogOut,
  User,
  ChevronDown,
  AlignLeft
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ toggleSidebar, onLogout, userSession }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("Usuário");
  const [userRole, setUserRole] = React.useState("Colaborador");
  const [userAvatar, setUserAvatar] = React.useState("https://storage.googleapis.com/hostinger-horizons-assets-prod/b7026784-c830-4da8-8de6-c43763cc5798/8e00585b3ce208a6acf2e2417a453741.png");

  React.useEffect(() => {
    if (userSession?.user?.user_metadata) {
      setUserName(userSession.user.user_metadata.full_name || userSession.user.email || "Usuário");
      setUserRole(userSession.user.user_metadata.role || "Colaborador");
      setUserAvatar(userSession.user.user_metadata.avatar_url || "https://storage.googleapis.com/hostinger-horizons-assets-prod/b7026784-c830-4da8-8de6-c43763cc5798/8e00585b3ce208a6acf2e2417a453741.png");
    }
  }, [userSession]);


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card/90 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <AlignLeft className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Pesquisar..."
            className="rounded-md border border-input bg-background/70 pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </motion.div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
