import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Navbar from '../Components/Navbar';
import YearButton from '../Components/YearButton';


function PastYearWorkoutsScreen({ route }) {

    //renders the years menu
    function yearMenu() {
        if (route.params.dates.length === 0) {
            return (
                <Text style={styles.titleText}>You have no previous workouts logged</Text>
            );

        } else {
            return (
                <ScrollView style={styles.scrollContainer}>
                    {route.params.dates.map((date) => <YearButton key={date} year={date} />)}
                </ScrollView>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Navbar />
            {yearMenu()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
    },
    scrollContainer: {
        marginTop: '30%'
    },
    titleText: {
        marginTop: '30%',
        fontSize: 25,
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center'
    },
    yearButton: {
        width: '80%',
        height: 80,
        borderColor: "#707070",
        borderWidth: 4,
        marginBottom: '2%',
        marginTop: '10%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        backgroundColor: '#151515',
        elevation: 10
    },
    yearButtonView: {
        marginTop: '5%'
    },
    yearButtonText: {
        fontSize: 25,
        color: '#E51B23',
        fontWeight: "bold",
        textAlign: 'left',
        alignSelf: 'center'
    },
});

export default PastYearWorkoutsScreen;