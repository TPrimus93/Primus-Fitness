import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

function NextSetButton({ props }) {
    return (
        <View style={styles.setContainer}>
            <TouchableOpacity style={styles.setButtonLight}>
                <Text style={styles.buttonDarkText}>{props}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/EllipseClear.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        alignItems: 'center'
    },
    setButtonLight: {
        width: 85,
        height: 40,
        borderRadius: 18,
        borderColor: "#707070",
        borderWidth: 1,
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    buttonDarkText: {
        marginTop: 3.5,
        fontSize: 18,
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center'
    },

});

export default NextSetButton;