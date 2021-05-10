import React, { useState, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView, Modal } from 'react-native';
import Navbar from '../Components/Navbar';
import ExerciseButton from '../Components/ExerciseButton';
import { UserContext } from '../Components/UserContext';


function StartWorkoutScreen({ navigation }) {

    const { contextObject } = useContext(UserContext);
    const [startWorkoutModalVisible, setStartWorkoutModalVisible] = useState(false);

    //brings user to workout page
    function startWorkout() {
        setStartWorkoutModalVisible(false);
        navigation.navigate('Workout');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <Text style={styles.titleButtonText}>Workout</Text>
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.buttonMenu} horizontal={false} >
                    {contextObject.workoutList.map((exercise) => <ExerciseButton key={exercise.exerciseID} title={exercise.title} description={exercise.description} exerciseID={exercise.exerciseID} index={contextObject.workoutList.findIndex(x => x.exerciseID === exercise.exerciseID)} picture={exercise.picture} />)}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.startButton}
                onPress={() => setStartWorkoutModalVisible(true)}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={startWorkoutModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.startWorkoutModelView}>
                        <Text style={styles.startWorkoutText}>Start Workout</Text>
                        <View style={styles.startWorkoutContainer}>
                            <TouchableOpacity style={styles.startWorkoutModalButton} onPress={() => startWorkout()}>
                                <Text style={styles.finishButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.startWorkoutModalButton} onPress={() => setStartWorkoutModalVisible(false)}>
                                <Text style={styles.notesButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        alignItems: 'center'
    },
    startWorkoutContainer: {
        marginTop: '10%',
        width: '100%',
        flexDirection: 'row'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
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
    buttonMenu: {
        marginTop: '10%',
        marginBottom: '50%',
        width: '99%'
    },
    startButton: {
        position: 'absolute',
        bottom: '5%',
        width: "75%",
        height: 75,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#222222",
        elevation: 8,
        justifyContent: "center",
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: "center",
    },
    titleButtonText: {
        width: '50%',
        marginTop: '15%',
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center'
    },
    startWorkoutModelView: {
        borderRadius: 45,
        width: '80%',
        height: '28%',
        backgroundColor: '#2D2D2D',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    startWorkoutText: {
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center',
        //marginBottom: 30
    },
    startWorkoutModalButton: {
        width: '40%',
        height: 60,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    notesButtonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center'
    },
    finishButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'center',
        alignSelf: 'center'
    },


});

export default StartWorkoutScreen;