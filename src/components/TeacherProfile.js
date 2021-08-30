import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TextInput, Button, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { setPageNum } from '../redux/indexActions';
const chevLeft = require('../images/chevLeft.png');
// import Question from './Question';



const TeacherProfile = () => {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state).dataReducer.profile;
    const [runClasses, setRunClasses] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [tags, setTags] = useState('');
    const [blurb, setBlurb] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [categoriesInit, setCategories] = useState('');

    useEffect(() => {
        fetch('http://192.168.1.128:8000/notgym/classdetails?userID=' + profileData.id)
            .then((response) => response.json())
            .then((json) => setRunClasses(json));
    }, []);


    const Classes = () => {
        return runClasses.map((item, index) => {
            return (
                <View key={index}>
                    <Text>{item.name}</Text>
                </View>

            );
        });
    };


    function submit() {
        let catNames = categoriesInit.split(', ');
        let categories = [];
        catNames.forEach(category => {
            categories.push(
                { name: category }
            );
        });
        let user = profileData.id;
        fetch(`http://192.168.1.128:8000/notgym/classdetails/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, type, tags, blurb, lat, lng, categories, user })
        })
            .then(res => res.json())
            .then(res => {
                console.log('success');
            })
            .catch(error => console.log(error));
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Is Teacher</Text>
            <Classes />
            <Text>Add New Class</Text>
            <Text>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={text => setName(text)}
                value={name}
            />
            <Text>Type</Text>
            <TextInput
                style={styles.input}
                placeholder="Type"
                onChangeText={text => setType(text)}
                value={type}
            />
            <Text>Tags</Text>
            <TextInput
                style={styles.input}
                placeholder="Tags"
                onChangeText={text => setTags(text)}
                value={tags}
            />
            <Text>Blurb</Text>
            <TextInput
                style={styles.input}
                placeholder="Blurb"
                onChangeText={text => setBlurb(text)}
                value={blurb}
            />
            <Text>Lat</Text>
            <TextInput
                style={styles.input}
                placeholder="Lat"
                onChangeText={text => setLat(text)}
                value={lat}
            />
            <Text>Lng</Text>
            <TextInput
                style={styles.input}
                placeholder="Lng"
                onChangeText={text => setLng(text)}
                value={lng}
            />
            <Text>Categories</Text>
            <TextInput
                style={styles.input}
                placeholder="Categories"
                onChangeText={text => setCategories(text)}
                value={categoriesInit}
            />
            <TouchableOpacity onPress={() => submit()}>
                <View style={styles.buttonDiv}>
                    <View style={styles.bookBtn}>
                        <Text style={styles.btnText}>BOOK NOW</Text>
                    </View>
                </View>
            </TouchableOpacity>
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

export default TeacherProfile;
