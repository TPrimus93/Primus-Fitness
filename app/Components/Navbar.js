import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

function Navbar({ }) {
    const navigation = useNavigation();

    return (
        <View>
            <Image style={styles.logo} opacity={0.8} source={require('../assets/Primus_Fitness_Logo.png')} />
            <TouchableOpacity style={styles.barbell} onPress={() => navigation.navigate('Exercise')}>
                <Image source={require('../assets/metro-barbell.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.featherMenu} onPress={() => navigation.navigate('Workout')} >
                <Image source={require('../assets/feather-menu.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        position: 'absolute',
        top: 60,
        left: 20,
        height: 61,
        width: 102
    },
    barbell: {
        position: 'absolute',
        top: 78,
        right: 70,
        elevation: 8,
    },
    featherMenu: {
        position: 'absolute',
        top: 78,
        right: 20,
        elevation: 8,
    },
    dropdown: {
        height: 40,
        top: 40,
        width: 30
    }
});

export default Navbar;