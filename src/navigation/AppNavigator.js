import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../pages/HomeScreen';
import MyBookingsScreen from '../pages/MyBookingsScreen';
import ProfileScreen from '../pages/ProfileScreen';
import OwnerDashboardScreen from '../pages/OwnerDashboardScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Navigator
const CustomerTabs = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        // Add icon configuration
      }}
    />
    <Tab.Screen 
      name="MyBookings" 
      component={MyBookingsScreen}
      options={{
        tabBarLabel: 'My Bookings',
        // Add icon configuration
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile Settings',
        // Add icon configuration
      }}
    />
  </Tab.Navigator>
);

// Bus Owner Tab Navigator
const BusOwnerTabs = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Dashboard" 
      component={OwnerDashboardScreen}
      options={{
        tabBarLabel: 'Dashboard',
        // Add icon configuration
      }}
    />
    <Tab.Screen 
      name="MyBuses" 
      component={MyBusesScreen}
      options={{
        tabBarLabel: 'My Buses',
        // Add icon configuration
      }}
    />
    <Tab.Screen 
      name="Bookings" 
      component={BookingsManagementScreen}
      options={{
        tabBarLabel: 'Bookings',
        // Add icon configuration
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile ',
        // Add icon configuration
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // App Stacks based on user role
          <>
            {user.role === 'customer' && (
              <Stack.Screen name="CustomerApp" component={CustomerTabs} />
            )}
            {user.role === 'busowner' && (
              <Stack.Screen name="BusOwnerApp" component={BusOwnerTabs} />
            )}
            {user.role === 'admin' && (
              <Stack.Screen name="AdminApp" component={AdminDashboardScreen} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;