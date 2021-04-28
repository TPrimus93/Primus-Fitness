import React, { useContext, useState, useEffect } from 'react';
import { Button, Image, Alert, Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';



import Navbar from '../Components/Navbar';
import axios from 'axios';




//Branch Name, Discription, Gif(Maybe)

function AddBranchScreen() {


    var formData = new FormData();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const [image, setImage] = useState(null);

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        //formData.append('photo', { uri: result.uri, name: 'test', type })

        console.log(result);
        //console.log(formData);

        if (!result.cancelled) {
            setImage(result.uri);
            formdata.append('file', {
                uri: Platform.OS === 'android' ? photo.uri : 'file://' + result.uri,
                name: 'test',
                type: 'image/jpeg' // or your mime type what you want
            });
            console.log(result.uri);
            //formData.append('file', { uri: result.uri, name: 'test', type: 'image/jpeg' });
            //console.log(formData.toString);
        }
    };

    function testing() {
        axios.post('http://68.172.33.6:9082/workouts/test', formData, config,).then((res) => {
            console.log(res.data);
            return res.data;
        });
    }

    const [branchName, setBranchName] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);



    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.branchNameView}>
                <TextInput
                    style={styles.branchNameText}
                    placeholder="Branch Name"
                    textAlign='center'
                    onChangeText={(branchName) => setBranchName(branchName)}
                />
            </View>

            <View style={styles.descriptionView}>
                <TextInput
                    style={styles.descriptionText}
                    placeholder="Branch Description"
                    textAlign='center'
                    onChangeText={(description) => setDescription(description)}
                />
            </View>

            <TouchableOpacity style={styles.testButton}
                onPress={() => testing()}>
                <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>

            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal> */}

            {/* <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </TouchableHighlight> */}


        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    branchNameText: {
        height: 50,
        color: 'white'
    },
    branchNameView: {
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
        marginTop: '35%',
    },
    descriptionText: {
        color: 'white'
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
        padding: 20,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginTop: '20%',
    },
    testButton: {
        width: "75%",
        height: 75,
        borderRadius: 45,
        borderColor: "#707070",
        borderWidth: 2,
        backgroundColor: "#222222",
        marginBottom: 50,
        marginTop: 50,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});


export default AddBranchScreen;

// import React, { useState } from 'react';
// import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// export default function App() {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       Alert.alert('Modal has been closed.');
    //     }}>
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <Text style={styles.modalText}>Hello World!</Text>

    //         <TouchableHighlight
    //           style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
    //           onPress={() => {
    //             setModalVisible(!modalVisible);
    //           }}>
    //           <Text style={styles.textStyle}>Hide Modal</Text>
    //         </TouchableHighlight>
    //       </View>
    //     </View>
    //   </Modal>

    //   <TouchableHighlight
    //     style={styles.openButton}
    //     onPress={() => {
    //       setModalVisible(true);
    //     }}>
    //     <Text style={styles.textStyle}>Show Modal</Text>
    //   </TouchableHighlight>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });