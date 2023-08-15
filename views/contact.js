import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking, Pressable} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default Contact = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Me</Text>
      <Text style={{fontSize: 18, marginHorizontal: '10%', width: '80%', textAlign: 'left'}}>Email me at <Pressable onPress={() => { Linking.openURL('mailto:sreeramsaivuppala@gmail.com') }}><Text style={{fontSize: 18, color: "blue", textDecorationLine: 'underline'}}>sreeramsaivuppala@gmail.com</Text></Pressable> for bug reports or feature requests.</Text>
      <StatusBar style="auto" />
    </View>
  );
}