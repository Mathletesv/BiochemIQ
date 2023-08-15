import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>BiochemIQ</Text>
      <CustomButton text="Pathways" onPress={() => navigation.navigate('Pathways')}/>
      <CustomButton text="Amino Acids" onPress={() => navigation.navigate('Amino Acids')}/>
      <CustomButton text="Contact Me" onPress={() => navigation.navigate('Contact')}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const paths_array = ['Electron Transport Chain', 'Glycolysis', 'Fermentation', 'Krebs Cycle', 'Gluconeogensis', 'Glycogenolysis', 'Glycogenesis', 'Pentose Phosphate Pathway']