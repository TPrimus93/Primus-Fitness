import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View, SafeAreaView, Image, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../Components/Navbar';
import axios from 'axios';




function CreateUserScreen() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isTrainer, setIsTrainer] = useState(false);
    const [trainButton, setTrainButton] = useState(<Image source={require('../assets/CheckBoxEmpty.png')} />);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function setTrainer() {
        console.log(isTrainer);
        if (isTrainer == true) {
            setIsTrainer(!isTrainer);
            setTrainButton(<Image source={require('../assets/CheckBoxEmpty.png')} />);
        } else {
            setIsTrainer(!isTrainer);
            setTrainButton(<Image source={require('../assets/CheckBoxFilled.png')} />);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <View style={styles.inputFields}>
                <Text style={styles.titleText}>First Name</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        textAlign='center'
                        onChangeText={(firstName) => setFirstName(firstName)}
                    />
                </View>
                <Text style={styles.titleText}>Last Name</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        textAlign='center'
                        onChangeText={(lastName) => setLastName(lastName)}
                    />
                </View>
                <Text style={styles.titleText}>Username</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        textAlign='center'
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
                <Text style={styles.titleText}>Password</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        textAlign='center'
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View style={styles.dateButtonView}>
                    <Text style={styles.titleText}>Birthday</Text>
                    <TouchableOpacity style={styles.dateButton} onPress={showDatepicker} >
                        <Text style={styles.dateButtonText}>{date.toString().substring(0, 11)}</Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={styles.trainerView}>
                <Text style={styles.trainerText}>Trainer</Text>
                <TouchableOpacity style={styles.trainerButton} onPress={() => setTrainer()}>
                    {trainButton}
                </TouchableOpacity>

            </View>
            <View style={styles.submitButtonView}>
                <TouchableOpacity style={styles.submitButton}  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    inputText: {
        height: 50,
        color: 'white'
    },
    inputView: {
        height: 60,
        width: '60%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "#929292",
        padding: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputFields: {
        marginTop: '25%',
        alignContent: 'center'
    },
    dateButton: {
        width: "60%",
        height: 60,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#929292",
        elevation: 8,
        justifyContent: "center",
    },
    dateButtonView: {
        alignItems: 'center',

    },
    titleText: {
        fontSize: 15,
        color: '#E51B23',
        fontWeight: "bold",
        marginBottom: '1%',
        alignSelf: 'center',
        marginTop: '5%'
    },
    dateButtonText: {
        fontSize: 15,
        color: 'black',
        fontWeight: "bold",
        alignSelf: "center",
    },
    submitButtonView: {
        width: '100%',
        marginTop: '30%',
        bottom: '5%',
        alignItems: 'center'
    },
    submitButton: {
        width: "75%",
        height: 75,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#929292",
        elevation: 8,
        justifyContent: "center",
    },
    submitButtonText: {
        fontSize: 25,
        color: 'black',
        fontWeight: "bold",
        alignSelf: "center",
    },
    trainerText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        marginRight: '6%',
    },
    trainerView: {
        alignSelf: 'center',
        marginTop: '10%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    trainerButton: {
        alignSelf: 'center'
    }


});

export default CreateUserScreen;