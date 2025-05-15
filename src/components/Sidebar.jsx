
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  FileText, 
  UserCircle,
  Settings,
  Globe,
  Link as LinkIcon,
  Briefcase,
  Mail,
  Columns
} from "lucide-react";
import { Separator } from "@/components/ui/separator";


const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/aprendizagem", label: "Aprendizagem", icon: BookOpen },
  { href: "/tarefas", label: "Tarefas", icon: CheckSquare },
  { href: "/processos", label: "Processos", icon: FileText },
  { href: "/perfil", label: "Meu Perfil", icon: UserCircle },
];

const externalLinks = [
  { href: "https://ipexconstrutora.com.br", label: "Site Ipex", icon: Globe },
  { href: "https://orion-s2-sso.seniorcloud.com.br", label: "MEGA Senior", icon: Briefcase },
  { href: "https://login.mobuss.com.br", label: "Mobuss", icon: Columns },
  { href: "https://mail.google.com", label: "Email", icon: Mail },
  { href: "https://trello.com", label: "Trello", icon: LinkIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/b7026784-c830-4da8-8de6-c43763cc5798/b4524bd6e03a7f4838c8535f6fa15a6a.png" alt="Logo Construtora" className="h-8 w-auto" />
          <span className="text-lg">Academia IPEX</span>
        </NavLink>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        
        <Separator className="my-4" />
        
        <div className="px-2">
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground/80">
            Acessos Rápidos
          </h3>
          <ul className="space-y-1">
            {externalLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="mt-auto border-t p-4">
        <NavLink
          to="/configuracoes" 
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
              location.pathname === "/configuracoes" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            )
          }
        >
          <Settings className="h-5 w-5" />
          Configurações
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
