import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from './app/Components/UserContext';

import ExerciseScreen from './app/screens/ExerciseScreen';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import WorkoutScreen from './app/screens/WorkoutScreen';
import CreateUserScreen from './app/screens/CreateUserScreen';
import PastDaysWorkoutScreen from './app/screens/PastDaysWorkoutScreen';
import PastMonthWorkoutsScreen from './app/screens/PastMonthWorkoutsScreen';
import PastYearWorkoutsScreen from './app/screens/PastYearWorkoutsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import AddBranchScreen from './app/screens/AddBranchScreen';



const Stack = createStackNavigator();

export default function App() {

  const [contextObject, setContextObject] = useState({
    username: '',
    workoutList: [
      { "exerciseID": '60732f6d992772fc8ae2c690', "title": "Bench Press" },
      { "exerciseID": '60732f6d992772fc8ae2c693', "title": "Press" }
    ],
    jwt: '',
    userType: '',
    workout: [],
    workoutPos: 0,
    setPos: 0
  });

  const contextValue = useMemo(() => ({
    contextObject, setContextObject,
  }), [contextObject, setContextObject]);

  return (
    <UserContext.Provider value={contextValue}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="C"> */}
        <Stack.Navigator initialRouteName="CreateBranch">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateBranch" component={AddBranchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastDaysWorkouts" component={PastDaysWorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastMonthWorkouts" component={PastMonthWorkoutsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastYearWorkouts" component={PastYearWorkoutsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
