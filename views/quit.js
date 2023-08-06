import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default Quit = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Results</Text>
      <Text style={{fontSize: 18, paddingHorizontal: '10%'}}>You answered {route.params.correct} of {route.params.total} components in the {route.params.pathway} pathway in {displayTime(route.params.time)}.</Text>
      <CustomButton text={`Study the ${route.params.pathway}`} onPress={() => navigation.navigate('Learn', {pathway: route.params.pathway})}/>
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