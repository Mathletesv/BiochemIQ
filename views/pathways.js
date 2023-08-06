import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';

export default Pathways = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pathways</Text>
      {/* <CustomButton text="View Pathways" onPress={() => navigation.navigate('Home')}/> */}
      <ScrollView>
        {
          paths_array.map((value) => (<View style={styles.row} key={value}>
              <Text style={styles.rowText}>{value}</Text>
              <CustomButton text="View" onPress={() => navigation.navigate('Learn', {pathway: value})}/>
              <CustomButton text="Quiz" onPress={() => navigation.navigate('Quiz', {pathway: value})}/>
            </View>)
          )
          
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

const paths_array = ['Electron Transport Chain', 'Glycolysis', 'Fermentation', 'Krebs Cycle', 'Gluconeogenesis', 'Glycogenolysis', 'Glycogenesis', 'Pentose Phosphate Pathway']