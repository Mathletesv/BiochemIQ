import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default AminoStats = ({navigation, route}) => {
  let [counts, setCounts] = useState([]);
  useEffect(() => {
    getCounts().then((data) => {
      console.log(data);
      let arr = [];
      for (key in data) {
        arr.push([key, data[key]]);
      }
      arr.sort((a, b) => b[1] - a[1]);
      console.log(arr);
      setCounts(JSON.parse(JSON.stringify(arr)));
    });
  }, []);
  console.log(counts);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Learning Stats</Text>
      {counts.length > 0 ? 
        <ScrollView>
          {
            counts.map((value) => (<View style={styles.row} key={value[0]}>
                <Text style={[styles.rowText, {color: value[1] > 5 ? value[1] > 7 ? value[1] > 12 ? value[1] > 15 ? "#b50000" : "#ff1900" : "#fff700" : "#11ff00" : "#0b8f01" }]}>{value[0]}: {value[1]} times</Text>
              </View>))
          }
        </ScrollView>
      : <View>
        <Text style={styles.rowText}>You have not done any learning yet.</Text>
        <View style={styles.row}><CustomButton text="Learn" onPress={() => navigation.navigate('Amino Learn')}/></View>
      </View>}
      <StatusBar style="auto" />
    </View>
  )
}

const getCounts = async () => {
  try {
    const value = await AsyncStorage.getItem('counts');
    if (value != null) {
      return JSON.parse(value);
    }
    else {
      let counts = {};
      return counts;
    }
  } catch (e) {
    // error reading value
  }
};