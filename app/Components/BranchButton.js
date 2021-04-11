
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

function BranchButton({ title, press }) {
    return (
        <View style={styles.setContainer}>
            <TouchableOpacity style={styles.centerButton} onPress={() => console.log(press)}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        alignItems: 'center'
    },
    centerButton: {
        width: 175,
        height: 175,
        borderRadius: 90,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#E51B23",
        marginBottom: 50,
        marginTop: 50,
        elevation: 8,
        justifyContent: "center",

    },
    buttonText: {
        fontSize: 25,
        color: 'black',
        fontWeight: "bold",
        alignSelf: "center",
        opacity: 0.8,
        textAlign: 'center'
    },
});

export default BranchButton;