import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';
import { AMINO_NAMES } from '../utils/amino-const';

export default AminoList = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Amino Acid List</Text>
      <ScrollView>
        {
          Object.keys(AMINO_NAMES).map((value) => (<View style={styles.row} key={value}>
              <CustomButton text={value} onPress={() => navigation.navigate('Amino View', {amino: value})}/>
              <Text style={styles.rowText}>: {AMINO_NAMES[value][0]}, {AMINO_NAMES[value][1]}</Text>
            </View>)
          )
          
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}