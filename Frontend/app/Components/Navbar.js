import React, { useState, useContext } from 'react';
import axios from 'axios';
import { View, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { UserContext } from '../Components/UserContext';
const statusBarHeight = Constants.statusBarHeight;
var menuHeight = 50;


function Navbar({ }) {
    const navigation = useNavigation();
    const [menu, setMenu] = useState(false);
    const { contextObject, setContextObject } = useContext(UserContext);

    //handles the dropdown menu on Press
    function focus() {
        setMenu(!menu);
    }

    //handles the home button on Press 
    function goHome() {
        axios.get('http://68.172.33.6:9083/exercises/allRoots', { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', parentID: 'root', })).catch(e => console.log(e));
    }

    //handles the history button on Press
    function goToHistory() {
        axios.get('http://68.172.33.6:9082/workouts/getWorkoutsByUser/' + contextObject.username, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('PastYearWorkouts', { dates: response.data, })).catch(e => console.log(e));
    }

    //handles the workout button on Press
    function goToWorkout() {
        if (contextObject.workoutStarted === false) {
            navigation.navigate('StartWorkout')
        } else {
            navigation.navigate('Workout')
        }
    }

    //redirects user to login page and resets the user context
    function logout() {
        setContextObject({
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
            pastWorkoutPosition: 0,
            workoutStarted: false
        });
        navigation.navigate('Login');
    }

    //renders the settings dropdown menu
    function settingsMenu() {
        if (menu == true) {
            return (
                <View style={styles.menuView}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Settings')}>
                        <Text style={styles.menuButtonText}>ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => goToHistory()}>
                        <Text style={styles.menuButtonText}>HISTORY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => logout()}>
                        <Text style={styles.menuButtonText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (<View></View>);
        }
    }

    function workoutIcon() {
        return (
            <TouchableOpacity style={styles.barbell} onPress={() => goToWorkout()}>
                <Image source={require('../assets/metro-barbell.png')} />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.navbarView}>
            <Image style={styles.logo} source={require('../assets/Primus_Fitness_Logo.png')} />
            <TouchableOpacity style={styles.home} onPress={() => goHome()}>
                <Image source={require('../assets/HomeIcon.png')} />
            </TouchableOpacity>
            {workoutIcon()}
            <TouchableOpacity style={styles.featherMenu} onPress={() => focus()} >
                <Image source={require('../assets/feather-menu.png')} />
            </TouchableOpacity>
            {settingsMenu()}
        </View>
    );
}

const styles = StyleSheet.create({
    navbarView: {
        marginTop: statusBarHeight
    },
    logo: {
        position: 'absolute',
        left: 20,
        height: 61,
        width: 102
    },
    barbell: {
        position: 'absolute',
        right: '14%',
        marginTop: 18,
        elevation: 8,
    },
    featherMenu: {
        position: 'absolute',
        right: '4%',
        marginTop: 18,
        elevation: 8,
    },
    dropdown: {
        height: 40,
        top: 40,
        width: 30
    },
    menuView: {
        width: '22%',
        position: 'absolute',
        marginTop: menuHeight,
        marginBottom: 50,
        right: '4%',
        elevation: 10,
    },
    menuButton: {
        height: '32%',
        width: '100%',
        borderRadius: 2,
        marginBottom: 5,
        backgroundColor: '#E51B23',
        alignItems: 'center',
    },
    menuButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    home: {
        position: 'absolute',
        right: '25%',
        marginTop: 15,
        elevation: 8,
    },

});

export default Navbar;