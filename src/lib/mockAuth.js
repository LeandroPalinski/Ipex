// Mock authentication system for demonstration purposes
export const mockAuth = {
  // Simulate user session
  currentSession: null,
  
  // Mock users database
  users: [
    {
      id: '1',
      email: 'teste@exemplo.com',
      password: '123456',
      name: 'Usuário Teste',
      role: 'user'
    }
  ],
  
  // Simulate sign in
  signInWithPassword: async ({ email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockAuth.users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const session = {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            },
            access_token: 'mock-token-' + Date.now()
          };
          
          mockAuth.currentSession = session;
          localStorage.setItem('mock-session', JSON.stringify(session));
          
          resolve({
            data: { user: session.user, session },
            error: null
          });
        } else {
          resolve({
            data: { user: null, session: null },
            error: { message: 'Credenciais inválidas' }
          });
        }
      }, 1000); // Simulate network delay
    });
  },
  
  // Simulate get session
  getSession: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const storedSession = localStorage.getItem('mock-session');
        const session = storedSession ? JSON.parse(storedSession) : null;
        mockAuth.currentSession = session;
        
        resolve({
          data: { session },
          error: null
        });
      }, 500);
    });
  },
  
  // Simulate sign out
  signOut: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockAuth.currentSession = null;
        localStorage.removeItem('mock-session');
        
        resolve({
          error: null
        });
      }, 500);
    });
  },
  
  // Simulate auth state change
  onAuthStateChange: (callback) => {
    // Simple implementation - in real app this would be more sophisticated
    const checkAuthState = () => {
      const storedSession = localStorage.getItem('mock-session');
      const session = storedSession ? JSON.parse(storedSession) : null;
      
      if (session !== mockAuth.currentSession) {
        mockAuth.currentSession = session;
        callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
      }
    };
    
    // Check periodically for changes
    const interval = setInterval(checkAuthState, 1000);
    
    return {
      data: {
        subscription: {
          unsubscribe: () => clearInterval(interval)
        }
      }
    };
  }
};

