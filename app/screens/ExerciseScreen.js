import React, { useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import ExerciseButton from '../Components/ExerciseButton';



function ExerciseScreen({ route, navigation }) {


    function consolelog() {
        console.log(route.params);
        console.log(route.params.workout);
    }
    return (
        <SafeAreaView style={styles.container}>
            {consolelog()}
            <Navbar />
            {/* <View>
                <TouchableOpacity>
                    <Text> Branch</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={false} >
                    {route.params.exercises.map((exercise) => <ExerciseButton key={exercise._id.$oid} title={exercise.name} jwt={route.params.myJwt} workoutList={route.params.workout} exerciseID={exercise._id.$oid} exercises={route.params.exercises} uname={route.params.user} uType={route.params.usertype} />)}
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
        alignItems: 'center',
    },
    centerButton: {
        height: 80,
        borderColor: "#E51B23",
        borderWidth: 3,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    buttonText: {
        marginTop: 5,
        fontSize: 35,
        marginRight: "20%",
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left'
    },
    buttonMenu: {
        top: 120,
        marginBottom: 100,
        width: '99%'
    },
    plusButton: {
        marginRight: 15,
        marginLeft: 15,
        marginTop: 25,

    },
    rightArrow: {
        marginTop: 25,
        marginRight: 10,
        marginLeft: 25
    },
    exerciseIcon: {

    }

});

export default ExerciseScreen;