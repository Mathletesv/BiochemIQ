import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Pressable, Linking } from 'react-native';
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
        <View style={[styles.row, {flexWrap: 'wrap'}]}>
          <Text style={{fontSize: 18}}>Electron transport chain uses an </Text>
          <Pressable onPress={() => { Linking.openURL('https://commons.wikimedia.org/wiki/File:ElectronTransportChainDw001.png') }}><Text style={{fontSize: 18, color: 'blue'}}>image created by Dw001</Text></Pressable>
          <Pressable onPress={() => { Linking.openURL('https://creativecommons.org/licenses/by-sa/4.0/deed.en') }}><Text style={{fontSize: 18, color: 'blue'}}>under the CC BY-SA 4.0 License</Text></Pressable>
          <Text style={{fontSize: 18}}> with some added text</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}

const paths_array = ['Electron Transport Chain', 'Glycolysis', 'Fermentation', 'Krebs Cycle', 'Gluconeogenesis', 'Glycogenolysis', 'Glycogenesis', 'Pentose Phosphate Pathway']