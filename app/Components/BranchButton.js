import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

function BranchButton({ title, bID, jwt, uname, utype, ctype, workout }) {
    const navigation = useNavigation();


    function getBranches(myjwt, userType, username, branchID, childrenType) {
        console.log(childrenType);
        if (childrenType == 'branch') {
            console.log("here");
            axios.get('http://68.172.33.6:9083/exercises/descending/' + branchID, { headers: { "Authorization": `Bearer ${myjwt}` } })
                .then(response => navigation.navigate('Home', { myJwt: myjwt, usertype: userType, user: username, branches: response.data, workout: workout, })).catch(e => console.log(e));
        } else {
            axios.get('http://68.172.33.6:9083/exercises/descending/' + branchID, { headers: { "Authorization": `Bearer ${myjwt}` } })
                .then(response => navigation.navigate('Exercise', { myJwt: myjwt, usertype: userType, user: username, exercises: response.data, workout: workout, })).catch(e => console.log(e));
        }
    }

    return (
        <View style={styles.setContainer}>
            <TouchableOpacity style={styles.centerButton} onPress={() => getBranches(jwt, utype, uname, bID, ctype)}>
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