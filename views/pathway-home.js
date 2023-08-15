import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default PathwayHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pathways</Text>
      <CustomButton text="View Pathways" onPress={() => navigation.navigate('Pathway List')}/>
      <CustomButton text="Random Pathway Review" onPress={() => navigation.navigate('Learn', {pathway: paths_array[Math.floor(Math.random() * paths_array.length)]})}/>
      <CustomButton text="Random Pathway Quiz" onPress={() => navigation.navigate('Quiz', {pathway: paths_array[Math.floor(Math.random() * paths_array.length)]})}/>
      <CustomButton text="Pathway Quiz Help" onPress={() => navigation.navigate('Help')}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const paths_array = ['Electron Transport Chain', 'Glycolysis', 'Fermentation', 'Krebs Cycle', 'Gluconeogensis', 'Glycogenolysis', 'Glycogenesis', 'Pentose Phosphate Pathway']