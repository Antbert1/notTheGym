import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { saveClasses } from '../redux/indexActions';
// import Question from './Question';

const Home = () => {
  const dispatch = useDispatch();
  const classes = useSelector(state => state).dataReducer.classes;
  const [loaded, setLoaded] = useState(false);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.128:8000/classdetails')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function setData(data) {
    dispatch(saveClasses(data));
    setClassList(data);
    setLoaded(true);
  }

  // const answers = useSelector(state => state);

  // function save() {
  //   console.log(answers);
  // }

  // function getList() {
  //   const getAnswers = async () => {
  //     let response = await fetch(
  //       'http://localhost:8000/answers/'
  //     );
  //     let json = await response.json();
  //     return json;
  //   };

  // }

  const ClassList = () => {
    return classes.map((item, index) => {
      return (
        <View key={index}>
          <Text>{item.name}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Not The Gym</Text>
      {!loaded ?
        <ActivityIndicator size="small" color="#0000ff" />
        :
        <View style={styles.content}>
          <ClassList />
        </View>
      }
      <View style={styles.buttonContainer}>
        {/* <Button title="Save asdf" onPress={() => save()} /> */}
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
  buttonContainer: {
    marginBottom: 20,
  },
});

export default Home;
