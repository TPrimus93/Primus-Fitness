import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ExerciseScreen from './app/screens/ExerciseScreen';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import WorkoutScreen from './app/screens/WorkoutScreen';
import CreateUserScreen from './app/screens/CreateUserScreen';
import PastWorkoutsScreen from './app/screens/PastWorkoutsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login"> */}
      <Stack.Navigator initialRouteName="PastWorkouts">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PastWorkouts" component={PastWorkoutsScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
