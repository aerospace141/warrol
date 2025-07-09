import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Auth screens
import RoleSelector from './src/pages/auth/RoleSelector';
import LoginScreen from './src/pages/auth/LoginScreen';
import SignupScreen from './src/pages/auth/SignupScreen';

// Role-based home screens
import CustomerHome from './src/pages/CustomerHome';
import OwnerDashboard from './src/pages/OwnerDashboard';
import AdminDashboard from './src/pages/AdminDashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading screen
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is logged in, show role-based screens
        <>
          {user.role === 'customer' && (
            <Stack.Screen name="CustomerHome" component={CustomerHome} />
          )}
          {user.role === 'busowner' && (
            <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} />
          )}
          {user.role === 'admin' && (
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          )}
        </>
      ) : (
        // User is not logged in, show auth screens
        <>
          <Stack.Screen name="RoleSelector" component={RoleSelector} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}