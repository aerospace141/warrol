import React, { createContext, useState, useContext, useEffect } from 'react';
// For Android-focused app, we'll use a simpler storage solution
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  // Load user from storage on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      // For now, we'll skip persistent storage and just set loading to false
      // TODO: Implement proper storage for Android
      setLoading(false);
    } catch (error) {
      console.error('Error loading user from storage:', error);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // TODO: Replace with actual API call
      const response = await mockLogin(email, password);
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store user and token (simplified for Android)
        // TODO: Implement proper storage
        // await AsyncStorage.setItem('user', JSON.stringify(user));
        // await AsyncStorage.setItem('token', token);
        
        setUser(user);
        return { success: true, user };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      // TODO: Replace with actual API call
      const response = await mockSignup(userData);
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store user and token (simplified for Android)
        // TODO: Implement proper storage
        // await AsyncStorage.setItem('user', JSON.stringify(user));
        // await AsyncStorage.setItem('token', token);
        
        setUser(user);
        return { success: true, user };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      // Clear user state (simplified for Android)
      // TODO: Implement proper storage cleanup
      // await AsyncStorage.removeItem('user');
      // await AsyncStorage.removeItem('token');
      setUser(null);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    user,
    loading,
    selectedRole,
    setSelectedRole,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API functions - Replace with actual API calls
const mockLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock users database
  const mockUsers = [
    { id: 1, email: 'customer@test.com', password: '123456', role: 'customer', name: 'John Doe' },
    { id: 2, email: 'owner@test.com', password: '123456', role: 'busowner', name: 'Jane Smith', approved: true },
    { id: 3, email: 'admin@test.com', password: '123456', role: 'admin', name: 'Admin User' }
  ];
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + user.id
      }
    };
  } else {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
};

const mockSignup = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock signup success
  const newUser = {
    id: Date.now(),
    email: userData.email,
    name: userData.name,
    role: userData.role,
    phone: userData.phone,
    approved: userData.role === 'busowner' ? false : true, // Bus owners need approval
    ...(userData.role === 'busowner' && {
      companyName: userData.companyName,
      licenseNumber: userData.licenseNumber,
      aadhaarImage: userData.aadhaarImage
    })
  };
  
  return {
    success: true,
    data: {
      user: newUser,
      token: 'mock-jwt-token-' + newUser.id
    }
  };
};