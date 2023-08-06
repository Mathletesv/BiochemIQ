import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default AminoSettings = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Amino Acids</Text>
      <CustomButton text="View List" onPress={() => navigation.navigate('AminoList')}/>
      <CustomButton text="Learn" onPress={() => navigation.navigate('AminoLearn')}/>
      <CustomButton text="Quiz" onPress={() => navigation.navigate('AminoQuiz')}/>
      <CustomButton text="Settings" onPress={() => navigation.navigate('AminoSettings')}/>
      <StatusBar style="auto" />
    </View>
  )
}

