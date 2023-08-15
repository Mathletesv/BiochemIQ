import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { CustomButton } from './utils/components';
import { styles } from './utils/styles';
import HomeScreen from './views/home-screen';
import Pathways from './views/pathways';
import Learn from './views/learn';
import Quiz from './views/quiz';
import Quit from './views/quit';
import Success from './views/success';
import Help from './views/help';
import AminoAcids from './views/amino-acids';
import AminoSettings from './views/amino-settings';
import AminoLearn from './views/amino-learn';
import AminoQuiz from './views/amino-quiz';
import AminoList from './views/amino-list';
import AminoView from './views/amino-view';
import AminoStats from './views/amino-stats';
import PathwayHome from './views/pathway-home';
import Contact from './views/contact';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Pathways" component={PathwayHome}/>
        <Stack.Screen name="Pathway List" component={Pathways}/>
        <Stack.Screen name="Learn" component={Learn}/>
        <Stack.Screen name="Quiz" component={Quiz}/>
        <Stack.Screen name="Quit" component={Quit}/>
        <Stack.Screen name="Success" component={Success}/>
        <Stack.Screen name="Help" component={Help}/>
        <Stack.Screen name="Amino Acids" component={AminoAcids}/>
        <Stack.Screen name="Amino Settings" component={AminoSettings}/>
        <Stack.Screen name="Amino Learn" component={AminoLearn}/>
        <Stack.Screen name="Amino Quiz" component={AminoQuiz}/>
        <Stack.Screen name="Amino List" component={AminoList}/>
        <Stack.Screen name="Amino View" component={AminoView}/>
        <Stack.Screen name="Amino Stats" component={AminoStats}/>
        <Stack.Screen name="Contact" component={Contact}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}