import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const emptyCircle = require('./src/images/circle-regular.png');
const fullCircle = require('./src/images/circle-solid.png');

const App = () => {
  const [name, setName] = useState({
    fName: '',
    lName: '',
  });
  const onPress = () => setCount(prevCount => prevCount + 1);

  const update = (index) => {
    console.log(index);
    // setName(prevValue => {
    //   ...prevValue,
    //   name: "test"
    // })

    let newSelectors = JSON.parse(JSON.stringify(selectors));
    newSelectors.map(function(item) {
      item.active = false;
      return item
    });
    newSelectors[index].active = !newSelectors[index].active;
    // console.log(newSelectors);
    updateSelectors(newSelectors);
    // updateSelectors(prevValue => {
    //
    // })
  }

  const [selectors, updateSelectors] = useState([
    {name: 1, active: false},
    {name: 2, active: false},
    {name: 3, active: false},
    {name: 4, active: false},
    {name: 5, active: false},
  ])

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
        )
      })
  }



  return (
    <View style={styles.outerView}>
      <Text>Cramps</Text>
      <View style={styles.selectContainer}>
        <List />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 40,
    height: 40
  },
  selectContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  individual: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
