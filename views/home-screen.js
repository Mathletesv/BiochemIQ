import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BiochemIQ</Text>
      <CustomButton text="View Pathways" onPress={() => navigation.navigate('Pathways')}/>
      <CustomButton text="Random Pathway Review" onPress={() => navigation.navigate('Learn', {pathway: paths_array[Math.floor(Math.random() * paths_array.length)]})}/>
      <CustomButton text="Random Pathway Quiz" onPress={() => navigation.navigate('Quiz', {pathway: paths_array[Math.floor(Math.random() * paths_array.length)]})}/>
      <CustomButton text="Pathway Quiz Help" onPress={() => navigation.navigate('Help')}/>
      <CustomButton text="Amino Acids" onPress={() => navigation.navigate('Amino Acids')}/>
      <CustomButton text="Stats"/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const paths_array = ['Electron Transport Chain', 'Glycolysis', 'Fermentation', 'Krebs Cycle', 'Gluconeogensis', 'Glycogenolysis', 'Glycogenesis', 'Pentose Phosphate Pathway']