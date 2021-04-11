
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";

import Navbar from '../Components/Navbar';
import BranchButton from '../Components/BranchButton';

function HomeScreen({ route, navigation }) {


    const [branches, setBranches] = useState(route.params.branches);

    function consolelog() {
        console.log(branches);
        console.log(route.params);
    }

    return (

        <SafeAreaView style={styles.container} >
            {consolelog()}
            <Navbar />
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={false} >
                    {branches.map((branch) => <BranchButton key={branch._id.$oid} title={branch.branchName} press={route.params.myJwt} />)}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 0.8,
        backgroundColor: 'black',
    },
    scrollContainer: {
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
    buttonMenu: {
        top: 120,
        marginBottom: 100,
    }
});

export default HomeScreen;

/* <TouchableOpacity style={styles.centerButton} onPress={() => console.log(route.params.myJwt)}>
                        <Text style={styles.buttonText}>Weight Training</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centerButton} >
                        <Text style={styles.buttonText}>Recovery</Text>
                    </TouchableOpacity>
                    <BranchButton title={'Extra'} /> */