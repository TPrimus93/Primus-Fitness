import React, { useContext, useState } from 'react';
import { Image, Text, Modal, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

import Navbar from '../Components/Navbar';
import ExerciseButton from '../Components/ExerciseButton';
import { UserContext } from '../Components/UserContext';
import axios from 'axios';

function ExerciseScreen({ route, navigation }) {
    const { contextObject } = useContext(UserContext);
    const [branchModalVisible, setBranchModalVisible] = useState(false);

    //conditionally renders the add branch menu button based on user type 
    function addBranch() {
        if (contextObject.userType === 'trainer') {
            return (
                <TouchableOpacity style={styles.addBranchButton} onPress={() => setBranchModalVisible(true)}>
                    <Text style={styles.addBranchButtonText}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    //handles the add exercise button on Press
    function addExerciseFunction() {
        setBranchModalVisible(false);
        navigation.navigate('CreateExercise', { parentID: route.params.parentID, parentTitle: route.params.parentTitle });
    }

    function goBack() {
        if (route.params != null && route.params.parentID != 'root') {
            return (
                <TouchableOpacity style={styles.rightArrow} onPress={() => getParent()}>
                    <Image source={require('../assets/goBackIcon.png')} />
                </TouchableOpacity>
            );
        }
    }

    function getParent() {
        axios.get('http://68.172.33.6:9083/exercises/ascending/' + route.params.parentID, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => goBackFunction(response.data)).catch(e => console.log(e));
    }
    function goBackFunction(id) {
        if (id != 'roots') {
            axios.get('http://68.172.33.6:9083/exercises/descending/' + id, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
                .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', parentID: id, })).catch(e => console.log(e));
        } else {
            axios.get('http://68.172.33.6:9083/exercises/allRoots', { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
                .then(response => navigation.navigate('Home', { branches: response.data, childrenType: 'branch', parentID: 'root', })).catch(e => console.log(e));
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            {goBack()}
            <Text style={styles.buttonText}>{route.params.parentTitle}</Text>
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={false} >
                    {route.params.exercises.map((exercise) => <ExerciseButton key={exercise._id.$oid} title={exercise.exerciseName} description={exercise.description} exerciseID={exercise._id.$oid} index={contextObject.workoutList.findIndex(x => x.exerciseID === exercise._id.$oid)} picture={exercise.base64} />)}
                </ScrollView>
            </View>
            {addBranch()}
            <Modal
                animationType="slide"
                transparent={true}
                visible={branchModalVisible}
            >
                <View style={styles.branchModalView}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => addExerciseFunction()}>
                        <Text style={styles.modalButtonText}>Add Exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setBranchModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    buttonText: {
        marginTop: '15%',
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center'
    },
    buttonMenu: {
        marginTop: '10%',
        marginBottom: '50%',
        width: '99%'
    },
    addBranchButton: {
        position: 'absolute',
        right: 15,
        width: '2%',
        height: '5%',
        bottom: 50,
        // borderWidth: 3,
        borderRadius: 90,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    addBranchButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
    },
    branchModalView: {
        flex: 1,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    modalButton: {
        width: '100%',
        height: 60,
        borderWidth: 3,
        borderRadius: 25,
        alignItems: 'center',
        bottom: 1,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    modalButtonText: {
        fontSize: 20,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
    },
    rightArrow: {
        alignSelf: 'center',
        marginLeft: '24%',
        top: '1.75%',
    },

});

export default ExerciseScreen;