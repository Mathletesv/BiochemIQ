import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default Success = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Results</Text>
      <Text style={{fontSize: 18, paddingHorizontal: '10%'}}>Congratulations! You answered {route.params.correct}/{route.params.total} components in {route.params.pathway} in {displayTime(route.params.time)}!</Text>
      <CustomButton text="Retake Quiz" onPress={() => navigation.navigate('Quiz', {pathway: route.params.pathway})}/>
      <CustomButton text="Return Home" onPress={() => navigation.navigate('Home')}/>
      <StatusBar style="auto" />
    </View>
  )
}

function displayTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return minutes + ":" + sec.toString().padStart(2, "0");
}