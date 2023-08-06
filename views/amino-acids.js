import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default AminoAcids = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Amino Acids</Text>
      <CustomButton text="View List" onPress={() => navigation.navigate('Amino List')}/>
      <CustomButton text="Learn" onPress={() => navigation.navigate('Amino Learn')}/>
      <CustomButton text="Quiz" onPress={() => navigation.navigate('Amino Quiz')}/>
      <CustomButton text="Stats" onPress={() => navigation.navigate('Amino Stats')}/>
      <StatusBar style="auto" />
    </View>
  )
}

