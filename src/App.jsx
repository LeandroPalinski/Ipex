
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import Layout from "@/components/Layout";

// Pages
import Dashboard from "@/pages/Dashboard";
import Aprendizagem from "@/pages/Aprendizagem";
import Tarefas from "@/pages/Tarefas";
import Processos from "@/pages/Processos";
import Perfil from "@/pages/Perfil";
import Login from "@/pages/Login";

const App = () => {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_IN" || _event === "SIGNED_OUT" || _event === "USER_UPDATED") {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen" 
      >
        <Routes>
          {session ? (
            <Route path="/" element={<Layout onLogout={handleLogout} userSession={session} />}>
              <Route index element={<Dashboard />} />
              <Route path="/aprendizagem" element={<Aprendizagem />} />
              <Route path="/tarefas" element={<Tarefas />} />
              <Route path="/processos" element={<Processos />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
        <Toaster />
      </motion.div>
      </Router>
    </AuthProvider>
  );
};

export default App;
