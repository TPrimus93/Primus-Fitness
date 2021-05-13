import React, { useContext, useState, useEffect } from 'react';
import { Image, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import Navbar from '../Components/Navbar';
import { UserContext } from '../Components/UserContext';

function AddExerciseScreen({ navigation, route }) {

    const [exerciseName, setExerciseName] = useState('');
    const [description, setDescription] = useState('');
    const { contextObject, setContextObject } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [testImage, setTestImage] = useState();
    const [image, setImage] = useState(null);

    var formData = JSON;

    //handles image update
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    //get image function
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: true,
        });

        setTestImage(result);
        formData = result;

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    //handles POST request for adding a exercise to database
    function postExercise() {
        var objectID = 'ObjectId(' + route.params.parentID + ')';
        axios.post('http://68.172.33.6:9083/exercises/addExercise', {
            exerciseName: exerciseName,
            description: description,
            parentNode: objectID,
            base64: testImage.base64
        }, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } }).then(err => console.log(err))
        axios.get('http://68.172.33.6:9083/exercises/descending/' + route.params.parentID, { headers: { "Authorization": `Bearer ${contextObject.jwt}` } })
            .then(response => navigation.navigate('Exercise', { exercises: response.data, parentID: route.params.parentID, parentTitle: route.params.parentTitle })).catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.titleView}>
                <Text style={styles.titleText}>
                    Create Exercise
                </Text>
            </View>
            <View style={styles.exerciseNameView}>
                <TextInput
                    style={styles.exerciseNameText}
                    placeholder="Exercise Name"
                    textAlign='center'
                    multiline={true}
                    placeholderTextColor='white'
                    onChangeText={(exerciseName) => setExerciseName(exerciseName)}
                />
            </View>


            <View style={styles.descriptionView}>
                <TextInput
                    style={styles.descriptionText}
                    placeholder="Exercise Description"
                    textAlign='center'
                    multiline={true}
                    placeholderTextColor='white'
                    onChangeText={(description) => setDescription(description)}
                />
            </View>
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
                <Text style={styles.pickImageText}>Pick an exercise image from camera roll</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.pickedImage} />}

            <TouchableOpacity style={styles.submitButton} onPress={() => postExercise()}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    exerciseNameText: {
        height: 50,
        color: 'white'
    },
    exerciseNameView: {
        height: 75,
        width: '60%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "#929292",
        padding: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
    },
    descriptionText: {
        color: 'white',
        textAlign: 'left',
        textAlignVertical: 'top',
        paddingHorizontal: 25,
        paddingVertical: 25,
    },
    descriptionView: {
        height: 250,
        width: '75%',
        borderWidth: 2,
        borderColor: "#707070",
        borderRadius: 45,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: "#929292",
        alignSelf: 'center',
        marginTop: '10%',
        justifyContent: 'flex-start',
        textAlign: 'left'
    },
    submitButton: {
        width: "75%",
        height: 75,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#222222",
        elevation: 8,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '8%'
    },
    buttonText: {
        fontSize: 35,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: "center",
    },
    titleText: {
        fontSize: 45,
        color: '#E51B23',
        fontWeight: "bold",
        alignSelf: "center",
    },
    titleView: {
        alignContent: 'center',
        marginTop: '15%'
    },
    pickImageText: {
        color: 'white',
        fontSize: 15,
        fontWeight: "bold",
        alignSelf: "center",
    },
    pickImageButton: {
        width: "85%",
        height: 35,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#222222",
        elevation: 8,
        justifyContent: "center",
        alignSelf: 'center',
        marginTop: '5%'
    },
    pickedImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: '3%'
    }

});


export default AddExerciseScreen;
