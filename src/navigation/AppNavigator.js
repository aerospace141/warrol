import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
// Future imports will be added here:
// import SeatSelectionPage from '../pages/SeatSelectionPage';
// import BookingConfirmationPage from '../pages/BookingConfirmationPage';
// import MyBookingsPage from '../pages/MyBookingsPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      {/* Future screens will be added here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
