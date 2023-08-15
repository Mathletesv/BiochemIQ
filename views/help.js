import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default Help = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Help</Text>
      <Text style={{fontSize: 18, marginHorizontal: '10%', width: '80%', textAlign: 'left'}}>Start a quiz from either the list of pathways or randomly.</Text>
      <Text style={{fontSize: 18, marginHorizontal: '10%', width: '80%', textAlign: 'left'}}>The gold circle marks the current component to name.</Text>
      <Text style={{fontSize: 18, marginHorizontal: '10%', width: '80%', textAlign: 'left'}}>You may click one of the black circles to name it instead.</Text>
      <Text style={{fontSize: 18, marginHorizontal: '10%', width: '80%', textAlign: 'left'}}>Every time you get a component right, it will randomize to another one until all of them are answered.</Text>
      <CustomButton text="View Pathways" onPress={() => navigation.navigate('Pathways')}/>
      <CustomButton text="Random Quiz" onPress={() => navigation.navigate('Quiz', {pathway: paths_array[Math.floor(Math.random() * paths_array.length)]})}/>
      <CustomButton text="Return Home" onPress={() => navigation.navigate('Home')}/>
      <StatusBar style="auto" />
    </View>
  );
}

const paths_array = ['Electron Transport Chain', 'Glycolysis', 'Fermentation', 'Krebs Cycle', 'Gluconeogensis', 'Glycogenolysis', 'Glycogenesis', 'Pentose Phosphate Pathway']