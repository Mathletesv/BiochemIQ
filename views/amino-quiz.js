import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Switch, Text, View, TouchableOpacity, Image } from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';
import { AMINO_NAMES, AMINO_PROPERTIES } from '../utils/amino-const';
import { TextInput } from 'react-native';

export default AminoQuiz = ({navigation, route}) => {
  [stage, updateStage] = React.useState(0);
  [submit, updateSubmit] = React.useState(false);
  [sections, updateSections] = React.useState([true, true, true]);
  [quizData, updateQuizData] = React.useState({});
  [quizValues, updateQuizValues] = React.useReducer(quizHandler, {"naming": {}, "properties": {}, "structures": {}});

  let grade;
  if (submit) {
    grade = gradeQuiz(quizValues);
  }

  return (
    <View style={styles.container}>
      {
        stage == 0 ? <View style={styles.container}>
          <Text style={styles.header}>Quiz</Text>
          <View style={styles.row}>
            <Text style={[styles.rowText, {lineHeight: 25, height: 50, paddingRight: 5}]}>Naming</Text>
            <Switch value={sections[0]} onValueChange={() => updateSections([!sections[0], sections[1], sections[2]])}/>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowText, {lineHeight: 25, height: 50, paddingRight: 5}]}>Properties</Text>
            <Switch value={sections[1]} onValueChange={() => updateSections([sections[0], !sections[1], sections[2]])}/>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowText, {lineHeight: 25, height: 50, paddingRight: 5}]}>Structures</Text>
            <Switch value={sections[2]} onValueChange={() => updateSections([sections[0], sections[1], !sections[2]])}/>
          </View>
          <CustomButton text="Start Quiz" style={{alignItems: 'center'}} onPress={() => {
            let data = {}
            if (sections[0]) {
              let names = shuffle(Object.keys(AMINO_NAMES)).slice(0, 10);
              let nameData = {};
              for (let i = 0; i < names.length; i++) {
                let three = shuffle([names[i], AMINO_NAMES[names[i]][0], AMINO_NAMES[names[i]][1]]);
                nameData[three[0]] = [three[1], three[2]];
              }
              data.naming = nameData;
            } 
            if (sections[1]) {
              let props = shuffle(Object.keys(AMINO_NAMES)).slice(0, 5);
              data.properties = props;
            }
            if (sections[2]) {
              let structs = shuffle(Object.keys(AMINO_NAMES)).slice(0, 5);
              data.structures = structs;
            }
            updateQuizData(data);
            if (sections[0]) updateStage(1); 
            else if (sections[1]) updateStage(2); 
            else if (sections[2]) updateStage(3) }}/>
        </View> : stage == 1 ? <View style={styles.container}>
          <Text style={styles.header}>Naming</Text>
          <ScrollView >
            {
              Object.keys(quizData.naming).map((value) => (<View><View style={styles.row} key={value}>
                  <Text style={styles.rowText}>{value}: </Text>
                  <TextInput editable={!submit} selectTextOnFocus={!submit} autoComplete="off" autoCorrect={false} spellCheck={false} style={[styles.input, {backgroundColor: submit ? quizValues.naming[value] && quizData.naming[value][0]?.toLowerCase() == quizValues.naming[value][quizData.naming[value][0]]?.toLowerCase() ? "#1fff5a" : "#ff1f1f" : null}]} value={quizValues.naming[value] != null ? quizValues.naming[value][quizData.naming[value][0]] : null} placeholder={quizData.naming[value][0].length == 1 ? "1-letter" : quizData.naming[value][0].length == 3 ? "3-letter" : "Full Name"} onChangeText={(text) => updateQuizValues({ type: 'naming', amino: value, wanted: quizData.naming[value][0], text})}/>
                  <TextInput editable={!submit} selectTextOnFocus={!submit} autoComplete="off" autoCorrect={false} spellCheck={false} style={[styles.input, {backgroundColor: submit ? quizValues.naming[value] && quizData.naming[value][1]?.toLowerCase() == quizValues.naming[value][quizData.naming[value][1]]?.toLowerCase() ? "#1fff5a" : "#ff1f1f" : null}]} value={quizValues.naming[value] != null ? quizValues.naming[value][quizData.naming[value][1]] : null} placeholder={quizData.naming[value][1].length == 1 ? "1-letter" : quizData.naming[value][1].length == 3 ? "3-letter" : "Full Name"} onChangeText={(text) => updateQuizValues({ type: 'naming', amino: value, wanted: quizData.naming[value][1], text})}/>
                </View>
                {submit ? <View style={styles.row} key={value + "answer"}><Text style={styles.rowText}>{value}: {quizData.naming[value][0]}, {quizData.naming[value][1]}</Text></View> : null}
                </View>))
            }
            <View style={styles.row}>
              <CustomButton text="Exit" onPress={() => navigation.navigate('Amino Acids')}/>
              <CustomButton text="Continue" onPress={() => { if (sections[1]) updateStage(2); else if (sections[2]) updateStage(3); else updateStage(4); }}/>
            </View>
          </ScrollView>

          
        </View> : stage == 2 ? <View style={styles.container}>
          <Text style={styles.header}>Properties</Text>
          <ScrollView >
            {
              quizData.properties.map((value) => (<View>
                <Text style={styles.rowText}>{value}</Text>
                <View style={styles.row}>
                  <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Hydrophilic"})} style={[styles.button, {width: '40%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: quizValues.properties[value] != null ? quizValues.properties[value][0] == "Hydrophilic" ? submit ? AMINO_PROPERTIES[value][0] == quizValues.properties[value][0] ? "#1fff5a" : "#ff1f1f" : "black" : "white" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Hydrophilic</Text></TouchableOpacity>
                  <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Hydrophobic"})} style={[styles.button, {width: '40%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: quizValues.properties[value] != null ? quizValues.properties[value][0] == "Hydrophobic" ? submit ? AMINO_PROPERTIES[value][1] == quizValues.properties[value][1] ? "#1fff5a" : "#ff1f1f" : "black" : "white" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Hydrophobic</Text></TouchableOpacity>
                </View>
                {
                quizValues.properties[value] != null ? quizValues.properties[value][0] == "Hydrophobic" ? 
                  <View style={styles.row}>
                    <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Aliphatic"})} style={[styles.button, {width: '40%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: quizValues.properties[value][1] == "Aliphatic" ? submit ? AMINO_PROPERTIES[value][1] == quizValues.properties[value][1] ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Aliphatic</Text></TouchableOpacity>
                    <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Aromatic"})} style={[styles.button, {width: '40%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: quizValues.properties[value][1] == "Aromatic" ? submit ? AMINO_PROPERTIES[value][1] == quizValues.properties[value][1] ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Aromatic</Text></TouchableOpacity>
                  </View> : quizValues.properties[value][0] == "Hydrophilic" ?
                  <View style={styles.row}>
                    <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Acidic"})} style={[styles.button, {width: '30%', marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: quizValues.properties[value][1] == "Acidic" ? submit ? AMINO_PROPERTIES[value][1] == quizValues.properties[value][1] ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Acidic</Text></TouchableOpacity>
                    <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Neutral"})} style={[styles.button, {width: '30%', marginLeft: 0, marginRight: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: quizValues.properties[value][1] == "Neutral" ? submit ? AMINO_PROPERTIES[value][1] == quizValues.properties[value][1] ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Neutral</Text></TouchableOpacity>
                    <TouchableOpacity disabled={submit} onPress={() => updateQuizValues({ type: 'properties', amino: value, value: "Basic"})} style={[styles.button, {width: '30%', marginLeft: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: quizValues.properties[value][1] == "Basic" ? submit ? AMINO_PROPERTIES[value][1] == quizValues.properties[value][1] ? "#1fff5a" : "#ff1f1f" : "black" : "white"}]}><Text style={[styles.btnText, {textAlign: 'center'}]}>Basic</Text></TouchableOpacity>
                  </View> : null : null
                }
                {submit ? <View style={styles.row} key={value + "answer"}><Text style={styles.rowText}>{AMINO_PROPERTIES[value][0]}, {AMINO_PROPERTIES[value][1]}</Text></View> : null}
              </View>))
            }
            <View style={styles.row}>
              {sections[0] ? <CustomButton text="Back" onPress={() => { updateStage(1); }}/> : <CustomButton text="Exit" onPress={() => navigation.navigate('Amino Acids')}/>}
              <CustomButton text="Continue" onPress={() => { if (sections[2]) updateStage(3); else updateStage(4); }}/>
            </View>
          </ScrollView>
        </View> : stage == 3 ? <View style={styles.container}>
          <Text style={styles.header}>Structures</Text>
          <ScrollView >
            {
              quizData.structures.map((value) => (<View style={{alignItems: 'center', marginBottom: '5%'}}>
                <View style={{ borderWidth: 3, flexShrink: 1, aspectRatio: 1, width: '60%'}}>
                    <Image
                      style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                      source={AMINO_NAMES[value][2]}
                    />
                </View>
                <TextInput editable={!submit} selectTextOnFocus={!submit} autoComplete="off" autoCorrect={false} spellCheck={false} value={quizValues.structures[value]} style={[styles.input, {backgroundColor: submit ? quizValues.structures[value]?.toLowerCase() == value?.toLowerCase() ? "#1fff5a" : "#ff1f1f" : null}]} placeholder="Name" onChangeText={(text) => updateQuizValues({ type: 'structures', amino: value, text})}/>
                {submit && quizValues.structures[value] != value ? <View style={styles.row} key={value + "answer"}><Text style={styles.rowText}>{value}</Text></View> : null}
              </View>))
            }
            <View style={styles.row}>
              {sections[1] || sections[0] ? <CustomButton style={{justifyContent: 'center'}} text="Back" onPress={() => { if (sections[1]) updateStage(2); else updateStage(1) }}/> : <CustomButton text="Exit" onPress={() => navigation.navigate('Amino Acids')}/>}
              <CustomButton style={{justifyContent: 'center'}} text="Continue" onPress={() => updateStage(4)}/>
            </View>
          </ScrollView>
        </View> : stage == 4 ? <View style={styles.container}>
          <Text style={styles.header}>Submit</Text>
          <View style={[styles.row, {maxHeight: 60, width: '80%'}]}><Text style={[styles.rowText, {height: 60, flex: 1}]}>Go back to check your work or press submit to finish the quiz.</Text></View>
          {sections[0] ? <CustomButton text="Naming" onPress={() => updateStage(1)}/> : null}
          {sections[1] ? <CustomButton text="Properties" onPress={() => updateStage(2)}/> : null}
          {sections[2] ? <CustomButton text="Structures" onPress={() => updateStage(3)}/> : null}
          <CustomButton text="Submit" onPress={() => { updateSubmit(true); updateStage(5) }}/>
        </View> : stage == 5 ? <View style={styles.container}>
          <Text style={styles.header}>Results</Text>
          <Text style={[styles.rowText]}>Your score is {grade} out of 60.</Text>
          {sections[0] ? <CustomButton text="Review Naming" onPress={() => updateStage(1)}/> : null}
          {sections[1] ? <CustomButton text="Review Properties" onPress={() => updateStage(2)}/> : null}
          {sections[2] ? <CustomButton text="Review Structures" onPress={() => updateStage(3)}/> : null}
          <CustomButton text="Exit" onPress={() => navigation.navigate('Amino Acids')}/>

        </View> : null
      }
      <StatusBar style="auto" />
    </View>
  )
}

function gradeQuiz(quizValues) {
  let score = 0;
  let total = 60;
  let naming = quizValues.naming;
  let properties = quizValues.properties;
  let structures = quizValues.structures;
  for (let i in naming) {
    let keys = Object.keys(naming[i])
    if (naming[i][keys[0]]?.toLowerCase() == keys[0]?.toLowerCase()) score++;
    if (naming[i][keys[1]]?.toLowerCase() == keys[1]?.toLowerCase()) score++;
  }
  for (let i in properties) {
    if (AMINO_PROPERTIES[i][0]?.toLowerCase() == properties[i][0]?.toLowerCase()) score += 2;
    if (AMINO_PROPERTIES[i][1]?.toLowerCase() == properties[i][1]?.toLowerCase()) score += 2;
  }
  for (let i in structures) {
    if (i?.toLowerCase() == structures[i]?.toLowerCase()) score += 4;
  }
  return score;
}

function quizHandler(state, action) {
  let data;
  switch (action.type) {
    case 'naming':
      data = state.naming;
      if (data[action.amino] == undefined) data[action.amino] = {};
      data[action.amino][action.wanted] = action.text;
      return {...state, naming: data};
    case 'properties':
      data = state.properties;
      if (data[action.amino] == undefined) data[action.amino] = [];
      if (action.value == "Hydrophilic" || action.value == "Hydrophobic") data[action.amino] = [action.value, null];
      else data[action.amino][1] = action.value;
      return {...state, properties: data};
    case 'structures':
      data = state.structures;
      data[action.amino] = action.text;
      return {...state, structures: data};
    default:
      throw new Error();
  }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}