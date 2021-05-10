import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { UserContext } from '../Components/UserContext';

function BranchButton({ title, bID, ctype }) {
    const navigation = useNavigation();
    const { contextObject } = useContext(UserContext);

    //handles getting the children of a branch 
    function getBranches(branchID, childrenType) {
        //redirects to exercises page if children are exercises
        if (childrenType == 'workout') {
            axios.get('http://68.172.33.6:9083/exercises/descending/' + branchID, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
                .then(response => navigation.navigate('Exercise', { exercises: response.data, parentID: branchID, parentTitle: title, })).catch(e => console.log(e));
        }
        //redirects to home if children are branches
        else {
            axios.get('http://68.172.33.6:9083/exercises/descending/' + branchID, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
                .then(response => navigation.navigate('Home', { branches: response.data, childrenType: childrenType, parentID: branchID, })).catch(e => console.log(e));
        }
    }

    return (
        <View style={styles.setContainer}>
            <TouchableOpacity style={styles.centerButton} onPress={() => getBranches(bID, ctype)}>
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