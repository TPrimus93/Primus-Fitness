import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

function CurrentSetButton({ props }) {
    return (
        <View style={styles.setContainer}>
            <TouchableOpacity style={styles.setButtonDark}>
                <Text style={styles.buttonLightText} >{props}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/EllipseFilled.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        alignItems: 'center'
    },
    setButtonDark: {
        width: 85,
        height: 40,
        borderRadius: 18,
        backgroundColor: '#2D2D2D',
        borderColor: "#707070",
        borderWidth: 1,
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    buttonLightText: {
        marginTop: 3.5,
        fontSize: 18,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center'
    },

});

export default CurrentSetButton;