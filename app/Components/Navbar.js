import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;
var menuHeight = 50;

function Navbar({ }) {
    const navigation = useNavigation();
    const [menu, setMenu] = useState(false);

    const testRef = useRef();

    function focus() {
        setMenu(!menu);
        // testRef.current.focus();
    }

    function settingsMenu() {
        if (menu == true) {

            return (
                <View style={styles.menuView} tabIndex='0'>
                    <TouchableOpacity style={styles.menuButton} >
                        <Text style={styles.menuButtonText}>ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuButtonText}>HISTORY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.menuButtonText}>SETTINGS</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (<View></View>);
        }
    }

    return (
        <View style={styles.navbarView}>
            <Image style={styles.logo} opacity={0.8} source={require('../assets/Primus_Fitness_Logo.png')} />
            <TouchableOpacity style={styles.home} nPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/HomeIcon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.barbell} onPress={() => navigation.navigate('Login')}>
                <Image source={require('../assets/metro-barbell.png')} />
            </TouchableOpacity>
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
        alignItems: 'center'
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