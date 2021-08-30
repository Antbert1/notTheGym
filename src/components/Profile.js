import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TouchableWithoutFeedback, Button, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { setPageNum } from '../redux/indexActions';
const chevLeft = require('../images/chevLeft.png');
// import Question from './Question';


const Profile = () => {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state).dataReducer.profile;

    // function back() {
    //     dispatch(setPageNum(0));
    // }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Is Student</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // flex: 1
    },
    back: {
        width: 15,
        height: 20
    },
    classTitle: {
        fontSize: 20,
        marginTop: 20,
    },
    classBlurb: {
        paddingTop: 10,
    },
    blurbText: {
        fontSize: 16
    }
});

export default Profile;
