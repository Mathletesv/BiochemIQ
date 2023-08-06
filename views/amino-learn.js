import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ScrollView, Text, TextInput, Image, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';
import { AMINO_NAMES, AMINO_PROPERTIES } from '../utils/amino-const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

export default AminoLearn = ({navigation, route}) => {
  const [counts, updateCounts] = React.useState(null);
  const [rand, updateRand] = React.useState(Math.floor(Math.random() * 3));
  const [amino, updateAmino] = React.useState(null);
  const [valOne, updateValOne] = React.useState("");
  const [valTwo, updateValTwo] = React.useState("");
  const [valThree, updateValThree] = React.useState("");
  const [submitFlag, updateSubmitFlag] = React.useState(false);
  const [selectionOne, updateSelectionOne] = React.useState("");
  const [selectionTwo, updateSelectionTwo] = React.useState("");
  const [selectionThree, updateSelectionThree] = React.useState("");
  const [submitFlagTwo, updateSubmitFlagTwo] = React.useState(false);

  if (counts == null) getCounts().then((value) => updateCounts(value));

  const randArray = [];
  for (let key in counts) {
    for (let i = 0; i < counts[key]; i++) {
      randArray.push(key);
    }
  }
  if (amino == null && randArray.length > 0) updateAmino(randArray[Math.floor(Math.random() * randArray.length)]);
  
  return (
    <View style={[styles.container, {justifyContent: 'flex-start'}]}>
      <Text style={styles.header}>Practice</Text>
      {amino == null ? <Text>Loading...</Text> :
      <View style={styles.row}>
        {rand == 0 ? <Text style={[styles.rowText, {width: '30%', textAlign: 'center'}]}>{amino}</Text> : 
        <TextInput value={valOne} editable={!submitFlag} autoCorrect={false} autoComplete={false} spellCheck={false} onChangeText={(text) => { updateValOne(text) }} style={[styles.input, {width: '30%', backgroundColor: submitFlag ? valOne == amino ? "#1fff5a" : "#ff1f1f" : null}]} placeholder="Full Name"/>}
        {rand == 1 ? <Text style={[styles.rowText, {width: '20%', textAlign: 'center'}]}>{AMINO_NAMES[amino][0]}</Text> : 
        <TextInput value={valTwo} editable={!submitFlag} autoCorrect={false} autoComplete={false} spellCheck={false} maxLength={3} onChangeText={(text) => { updateValTwo(text) }} style={[styles.input, {width: '20%', backgroundColor: submitFlag ? valTwo == AMINO_NAMES[amino][0] ? "#1fff5a" : "#ff1f1f" : null}]} placeholder="3-Letter"/>}
        {rand == 2 ? <Text style={[styles.rowText, {width: '20%', textAlign: 'center'}]}>{AMINO_NAMES[amino][1]}</Text> : 
        <TextInput value={valThree} editable={!submitFlag} autoCorrect={false} autoComplete={false} spellCheck={false} maxLength={1} onChangeText={(text) => { updateValThree(text) }} style={[styles.input, {width: '20%', backgroundColor: submitFlag ? valThree == AMINO_NAMES[amino][1] ? "#1fff5a" : "#ff1f1f" : null}]} placeholder="1-Letter"/>}
        <CustomButton disabled={submitFlag} style={{height: 30}} text="Check" onPress={() => { updateSubmitFlag(true); }}/>
      </View>}
      {
        submitFlag ? <View style={styles.row}>
        {rand == 0 || valOne == amino ? <Text style={[styles.rowText, {width: '30%', textAlign: 'center', marginHorizontal: 5}]}></Text> : <Text style={[styles.rowText, {width: '30%', textAlign: 'center'}]}>{amino}</Text>}
        {rand == 1 || valTwo == AMINO_NAMES[amino][0] ? <Text style={[styles.rowText, {width: '20%', textAlign: 'center', marginHorizontal: 5}]}></Text> : <Text style={[styles.rowText, {width: '20%', textAlign: 'center'}]}>{AMINO_NAMES[amino][0]}</Text>}
        {rand == 2 || valThree == AMINO_NAMES[amino][1] ? <Text style={[styles.rowText, {width: '20%', textAlign: 'center', marginHorizontal: 5}]}></Text> : <Text style={[styles.rowText, {width: '20%', textAlign: 'center'}]}>{AMINO_NAMES[amino][1]}</Text>}
        <CustomButton style={{height: 30}} text="Reset" onPress={() => { 
          updateSubmitFlag(false); updateValOne(""); updateValTwo(""); updateValThree(""); updateSelectionOne(""); updateSelectionTwo(""); updateAmino(randArray[Math.floor(Math.random() * randArray.length)]); updateSubmitFlagTwo(false); updateRand(Math.floor(Math.random() * 3));
          let accuracy = (rand != 0) ? valOne == amino ? 1 : -1: 0 + (rand != 1) ? valTwo == AMINO_NAMES[amino][0] ? 1 : -1: 0 + (rand != 2) ? valThree == AMINO_NAMES[amino][1] ? 1 : -1: 0;
          let newCounts = JSON.parse(JSON.stringify(counts));
          newCounts[amino] += accuracy;
          updateCounts(newCounts);
          setCounts(JSON.stringify(newCounts));
        }}/>
      </View> : null
      }
      {
        submitFlag ? <View style={styles.row}>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionThree("Essential")} style={[styles.button, {width: '40%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectionThree == "Essential" ? submitFlagTwo ? AMINO_PROPERTIES[amino][2] == "Essential" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Essential</Text></TouchableOpacity>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionThree("Non-Essential")} style={[styles.button, {width: '40%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: selectionThree == "Non-Essential" ? submitFlagTwo ? AMINO_PROPERTIES[amino][2] == "Non-Essential" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Non-Essential</Text></TouchableOpacity>
        </View> : null
      }
      {
        submitFlag ? <View style={styles.row}>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionOne("Hydrophilic")} style={[styles.button, {width: '40%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectionOne == "Hydrophilic" ? submitFlagTwo ? AMINO_PROPERTIES[amino][0] == "Hydrophilic" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Hydrophilic</Text></TouchableOpacity>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionOne("Hydrophobic")} style={[styles.button, {width: '40%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: selectionOne == "Hydrophobic" ? submitFlagTwo ? AMINO_PROPERTIES[amino][0] == "Hydrophobic" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Hydrophobic</Text></TouchableOpacity>
        </View> : null
      }
      {
        selectionOne == "Hydrophobic" ? <View style={styles.row}>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionTwo("Aliphatic")} style={[styles.button, {width: '40%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectionTwo == "Aliphatic" ? submitFlagTwo ? AMINO_PROPERTIES[amino][1] == "Aliphatic" ? "#1fff5a" : "#ff1f1f" :  "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Aliphatic</Text></TouchableOpacity>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionTwo("Aromatic")} style={[styles.button, {width: '40%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: selectionTwo == "Aromatic" ? submitFlagTwo ? AMINO_PROPERTIES[amino][1] == "Aromatic" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Aromatic</Text></TouchableOpacity>
        </View> : selectionOne == "Hydrophilic" ? <View style={styles.row}>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionTwo("Acidic")} style={[styles.button, {width: '30%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectionTwo == "Acidic" ? submitFlagTwo ? AMINO_PROPERTIES[amino][1] == "Acidic" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Acidic</Text></TouchableOpacity>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionTwo("Neutral")} style={[styles.button, {width: '30%', marginLeft: 0, marginRight: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectionTwo == "Neutral" ? submitFlagTwo ? AMINO_PROPERTIES[amino][1] == "Neutral" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Neutral</Text></TouchableOpacity>
          <TouchableOpacity disabled={submitFlagTwo} onPress={() => updateSelectionTwo("Basic")} style={[styles.button, {width: '30%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: selectionTwo == "Basic" ? submitFlagTwo ? AMINO_PROPERTIES[amino][1] == "Basic" ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Basic</Text></TouchableOpacity>
        </View> : null
      }
      {
        selectionTwo ? <View style={styles.row}>
          <CustomButton style={{height: 30}} text="Check" disabled={submitFlagTwo} onPress={() => { updateSubmitFlagTwo(true) }}/>
          {submitFlagTwo ? <CustomButton style={{height: 30}} text="Continue" onPress={() => { 
            updateSubmitFlag(false); updateValOne(""); updateValTwo(""); updateValThree(""); updateSubmitFlagTwo(false); updateSelectionOne(""); updateSelectionTwo(""); updateSelectionThree(""); updateAmino(randArray[Math.floor(Math.random() * randArray.length)]); updateRand(Math.floor(Math.random() * 3));
            let accuracy = ((rand != 0) ? valOne == amino ? 1 : -1: 0) + ((rand != 1) ? valTwo == AMINO_NAMES[amino][0] ? 1 : -1: 0) + ((rand != 2) ? valThree == AMINO_NAMES[amino][1] ? 1 : -1: 0) + (selectionOne == AMINO_PROPERTIES[amino][0] ? 1 : -1) + (selectionTwo == AMINO_PROPERTIES[amino][1] ? 1 : -1) + (selectionThree == AMINO_PROPERTIES[amino][2] ? 1 : -1);
            let newCounts = JSON.parse(JSON.stringify(counts));
            newCounts[amino] -= accuracy;
            console.log(accuracy, newCounts[amino]);
            updateCounts(newCounts);
            setCounts(JSON.stringify(newCounts));
          }}/> : null }
        </View>: null
      }
      {
        submitFlagTwo ? <View style={styles.row}>
          <Text style={[styles.rowText, {width: '100%', textAlign: 'center'}]}>{AMINO_PROPERTIES[amino][2]}, {AMINO_PROPERTIES[amino][0]}, {AMINO_PROPERTIES[amino][1]}</Text>
        </View> : null
      }
      {
        submitFlagTwo ? <View style={{ borderWidth: 3, flexShrink: 1, aspectRatio: 1, width: '60%', marginTop: 10 }}>
          <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            contentWidth={300}
            contentHeight={300}
          >
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              source={AMINO_NAMES[amino][2]}
            />
          </ReactNativeZoomableView>
        </View> : null
      }
      <StatusBar style="auto" />
    </View>
  )
}

const setCounts = async (value) => {
  try {
    await AsyncStorage.setItem('counts', value);
  } catch (e) {
    // saving error
  }
  console.log(value);
};

const getCounts = async () => {
  try {
    const value = await AsyncStorage.getItem('counts');
    console.log(value);
    if (value != null) {
      return JSON.parse(value);
    }
    else {
      let counts = {};
      Object.keys(AMINO_NAMES).forEach((name) => {
        counts[name] = 10;
      });
      return counts;
    }
  } catch (e) {
    // error reading value
  }
};