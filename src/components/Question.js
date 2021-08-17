import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { saveAnswers } from '../redux/indexActions';
const emptyCircle = require('../images/circle-regular.png');
const fullCircle = require('../images/circle-solid.png');

const Question = (props) => {
    const dispatch = useDispatch();
    const save = answers => dispatch(saveAnswers(answers));

    const update = (index) => {
        let newSelectors = [...selectors];
        newSelectors.map(function (item) {
            item.active = false;
            return item;
        });
        newSelectors[index].active = !selectors[index].active;
        updateSelectors(newSelectors);
        save(newSelectors);
    };

    const [selectors, updateSelectors] = useState([
        { name: 1, active: false },
        { name: 2, active: false },
        { name: 3, active: false },
        { name: 4, active: false },
        { name: 5, active: false },
    ]);

    const List = () => {
        return selectors.map((item, index) => {
            return (
                <View style={styles.individual} key={item.name}>
                    <Text>{item.name}{item.active}</Text>
                    <TouchableOpacity onPress={() => update(index)} >
                        {item.active ?
                            <Image source={fullCircle} style={styles.circle} />
                            :
                            <Image source={emptyCircle} style={styles.circle} />
                        }
                    </TouchableOpacity>
                </View>
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text>{props.name} </Text>
            <View style={styles.selectContainer}>
                <List />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 40,
        height: 40,
    },
    selectContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    individual: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Question;
