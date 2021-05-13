import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
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
import StartWorkoutScreen from './app/screens/StartWorkoutScreen';
import PastWorkoutScreen from './app/screens/PastWorkoutScreen';
import AddExerciseScreen from './app/screens/AddExerciseScreen';



const Stack = createStackNavigator();

export default function App() {

  const [contextObject, setContextObject] = useState({
    name: '',
    username: '',
    workoutList: [],
    jwt: '',
    userType: '',
    workout: [],
    notes: [],
    workoutPosition: 0,
    setPosition: 0,
    pastWorkout: [],
    pastNotes: [],
    pastWorkoutID: '',
    pastWorkoutPosition: 0,
    workoutStarted: false
  });

  const contextValue = useMemo(() => ({
    contextObject, setContextObject,
  }), [contextObject, setContextObject]);

  return (
    <UserContext.Provider value={contextValue}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="C"> */}
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateExercise" component={AddExerciseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreateBranch" component={AddBranchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastWorkout" component={PastWorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastDaysWorkouts" component={PastDaysWorkoutScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastMonthWorkouts" component={PastMonthWorkoutsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PastYearWorkouts" component={PastYearWorkoutsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}


// {
      //   "exerciseID": "60732f6d992772fc8ae2c690",
      //   "exerciseName": "Bench Press",
      //   "reps": [
      //     8,
      //     10,
      //     12,
      //     12,
      //   ],
      //   "weight": [
      //     100,
      //     105,
      //     110,
      //     110,
      //   ],
      // },
      // {
      //   "exerciseID": "60732f6d992772fc8ae2c693",
      //   "exerciseName": "Press",
      //   "reps": [
      //     16,
      //     16,
      //     16,
      //   ],
      //   "weight": [
      //     105,
      //     110,
      //     110,
      //   ],
      // },
      // {
      //   "exerciseID": "60732f6d992772fc8ae2c696",
      //   "exerciseName": "Squat",
      //   "reps": [
      //     18,
      //     18,
      //     18,
      //   ],
      //   "weight": [
      //     112.5,
      //     112.5,
      //     115,
      //   ],
      // },

      // { "exerciseID": '60732f6d992772fc8ae2c690', "title": "Bench Press" },
      // { "exerciseID": '60732f6d992772fc8ae2c693', "title": "Press" },
      // { "exerciseID": '60732f6d992772fc8ae2c696', "title": "Squat" }