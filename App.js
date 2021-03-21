import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

import Navbar from './app/screens/Navbar';
import Home from './app/screens/Home';
import LoginScreen from './app/screens/LoginScreen';

export default function App() {
  return <LoginScreen />;
}
