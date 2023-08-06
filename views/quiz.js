import * as React from 'react';
import { TouchableOpacity, Keyboard, StyleSheet, View, Text, Animated, Button, Image, TextInput, ImageBackground, Pressable } from 'react-native';
// @ts-ignore
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import ATP_Synthesis from '../assets/quiz-images/ATP-Synthesis.png';
import Krebs_Cycle from '../assets/quiz-images/Krebs-Cycle.png';
import Fermentation from '../assets/quiz-images/Fermentation.png';
import Glycolysis from '../assets/quiz-images/Glycolysis.png';
import ETC from '../assets/quiz-images/ETC.png';
import Gluconeogenesis from '../assets/quiz-images/Gluconeogenesis.png';
import Glycogenesis from '../assets/quiz-images/Glycogenesis.png';
import Glycogenolysis from '../assets/quiz-images/Glycogenolysis.png';
import Pentose_Phosphate from '../assets/quiz-images/Pentose-Phosphate.png';
import * as Haptics from 'expo-haptics';

export default function Quiz({navigation, route}) {
  const inputRef = React.useRef(null);
  const zoomAnimatedValue = React.useRef(new Animated.Value(1)).current;
  const zoomableViewRef = React.useRef(null);
  const scale = Animated.divide(1, zoomAnimatedValue);
  const [text, setText] = React.useState('');
  const [inputY, setInputY] = React.useState(0);
  const [imageDimensions, setImageDimensions] = React.useState({ width: 1, height: 1 });
  const [accuracy, updateAccuracy] = React.useState(0);
  const [seconds, updateSeconds] = React.useState(0);
  const [correct, updateCorrect] = React.useState(0);
  const highlighted = React.useRef(null);


  const onImageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setImageDimensions({ width, height });

  };


  Keyboard.addListener('keyboardWillShow', (e) => {
    setInputY(e.endCoordinates.height);
  })

  Keyboard.addListener('keyboardWillHide', (e) => {
    setInputY(0);
  })

  let current = data[route.params.pathway];
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      data = JSON.parse(JSON.stringify(constData));
      current = data[route.params.pathway];
      shuffle(current["Input"]);
      current["Index"] = 0;
      inputRef.current?.focus();
      current["Input"][0][3] = 1;
      startTime = Date.now();
      setInterval(() => {
        updateSeconds((Date.now() - startTime) / 1000);
      }, 1000)
      setTimeout(() => {
        highlighted?.current.measure( (fx, fy, width, height, px, py) => {
          zoomableViewRef.current?.moveTo(px, py);
        })
      }, 1000);
    })
    return unsubscribe;
  }, [navigation]);
  let xScale = imageDimensions.width / current["Dimensions"][0];
  let yScale = imageDimensions.height / current["Dimensions"][1];
  let ratio;
  if (xScale < yScale) ratio = xScale;
  else ratio = yScale;
  xScale = ratio * current["Dimensions"][0] / imageDimensions.width;
  yScale = ratio * current["Dimensions"][1] / imageDimensions.height;
  //console.log(imageDimensions);
  //console.log(current);
  return (
    <View style={styles.container}>
      
      <View style={styles.box}>
        <ReactNativeZoomableView
          maxZoom={5}
          initialZoom={2}
          minZoom={1}
          //panBoundaryPadding={20}
          contentHeight={imageDimensions.height}
          contentWidth={imageDimensions.width}
          zoomAnimatedValue={zoomAnimatedValue}
          zIndex='0'
          ref={zoomableViewRef}
          
        >
            <ImageBackground
              style={styles.img}
              source={current["Image"]}
              resizeMode='contain'
              onLayout={onImageLayout}
            >
            {
              current["Input"].map((value) => {
                if (value[3] == 4) return (<Text style={[styles.text, {fontSize: current["Size"] ?? 5, left: imageDimensions.width / 2 + xScale * imageDimensions.width * value[0] / 100 - 97, top: imageDimensions.height / 2 + yScale * imageDimensions.height * value[1] / 100 - (current["Size"] ?? 0) / 2}]}>{value[2]}</Text>)
                else if (value[3] == 3) return (<Text style={[styles.text, {color: "red", fontSize: current["Size"] ?? 5, left: imageDimensions.width / 2 + xScale * imageDimensions.width * value[0] / 100 - 97, top: imageDimensions.height / 2 + yScale * imageDimensions.height * value[1] / 100 - (current["Size"] ?? 0) / 2}]}>{value[2]}</Text>)
                else if (value[3] == 1 || value[3] == 2) return (
                  <Pressable
                  style={[styles.btn, styles.btnCurrent, {left: imageDimensions.width / 2 + xScale * imageDimensions.width * value[0] / 100, top: imageDimensions.height / 2 + yScale * imageDimensions.height * value[1] / 100}]}
                  onPress={(e) => {
                    current["Input"][current["Index"]][3] = 0;
                    
                    for (let i = 0; i < current["Input"].length; i++) {
                      if (JSON.stringify(current["Input"][i]) == JSON.stringify(value)) {
                        
                        current["Index"] = i;
                        current["Input"][i][3] = 1;
                      }
                    }
                    data[route.params.pathway] = JSON.parse(JSON.stringify(current));
                    viewChange(e.nativeEvent, zoomableViewRef.current, 0, 0, inputRef)
                    //updateUpdate(true);
                  }}
                  hitSlop={5}
                  title=""
                  ref={highlighted}
                />
                )
                else return (
                <Pressable
                  style={[styles.btn, {left: imageDimensions.width / 2 + xScale * imageDimensions.width * value[0] / 100, top: imageDimensions.height / 2 + yScale * imageDimensions.height * value[1] / 100}]}
                  onPress={(e) => {
                    current["Input"][current["Index"]][3] = 0;
                    console.log(value);
                    for (let i = 0; i < current["Input"].length; i++) {
                      if (JSON.stringify(current["Input"][i]) == JSON.stringify(value)) {
                        
                        current["Index"] = i;
                        current["Input"][i][3] = 1;
                      }
                    }
                    data[route.params.pathway] = JSON.parse(JSON.stringify(current));
                    viewChange(e.nativeEvent, zoomableViewRef.current, 0, 0, inputRef)
                    //updateUpdate(true);
                  }}
                  hitSlop={5}
                  title=""
                />
              )})
            }
            </ImageBackground>
              
        </ReactNativeZoomableView>
      </View>
      <View style={[styles.keyboardPanel, {bottom: inputY, display: (inputY == 0) ? 'none' : 'flex'}]}>
        
        <TextInput style={styles.input} autoCorrect={false} spellCheck={false} autoComplete='off' ref={inputRef} defaultValue={text} onChangeText={newText => setText(newText)}/>
        <TouchableOpacity style={[styles.barBtn, {left: '52%', backgroundColor: accuracy > 1 ? "#1fff5a" : accuracy < -1 ? "#ff1f1f": '#e0e0e0'}]} onPress={() => {checkSubmit(inputRef, text, route.params.pathway, updateAccuracy, [correct, updateCorrect], highlighted, zoomableViewRef, navigation, seconds)}}><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.barBtn, {left: '76%', backgroundColor: '#e0e0e0'}]} onPress={() => { navigation.navigate('Quit', {pathway: route.params.pathway, correct: accuracy, total: current["Input"].length, time: seconds}) }}><Text style={styles.btnText}>Quit</Text></TouchableOpacity>
      </View>

      <View style={styles.hoverTop}>
        <Text style={{fontSize: 18, top: '0%', position: 'absolute', width: '100%'}}>Score: {correct}/{current["Input"].length}</Text>
        <Text style={{fontSize: 18, left: '60%', top: '0%', position: 'absolute', width: '100%'}}>Time: {displayTime(seconds)}</Text>
      </View>
    </View>
  );
}

function displayTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return minutes + ":" + sec.toString().padStart(2, "0");
}

function viewChange(event, ref, x, y, input) {
  // console.log(Object.keys(ref));
  // ref?.zoomTo(2);
  // ref?.moveTo(200, 200, false); 
  // console.log(event.locationX, event.locationY);
  input.current?.focus();
}

function checkSubmit(input, text, path, setAccuracy, corr, highlighted, viewRef, nav, seconds) {
  let current = data[path];
  let index = current["Index"];
  let [correct, updateCorrect] = corr;
  
  text = text.replaceAll("Coenzyme", "Co");
  text = text.replaceAll("Cytochrome", "Cyt");
  text = text.replaceAll(" ", "");
  text = text.toLowerCase();

  if (text == current["Input"][index][2].replaceAll(" ", "").replaceAll("\n", "").toLowerCase()) {
    setAccuracy(2);
    if (correct + 1 == current["Input"].length) {
      
      return;
    } 
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

    setTimeout(() => { 
      setAccuracy(0)
      highlighted?.current.measure( (fx, fy, width, height, px, py) => {
        viewRef.current?.moveTo(px, py);
      })
      
    }, 1000)

    input.current?.clear();
    current["Input"][index][3] = 4;
    current["Index"] = 0;
    while (current["Index"] < current["Input"].length && current["Input"][current["Index"]][3] >= 3) current["Index"]++
    if (current["Index"] == current["Input"].length) {
      nav.navigate('Success', {pathway: path, total: current["Input"].length, correct: correct + 1, time: seconds})
      return;
    }
    current["Input"][current["Index"]][3] = 1;
    updateCorrect(correct + 1);
  }
  else {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    current["Input"][index][3]++;
    if (current["Input"][index][3] == 3) {
      current["Index"] = 0;
      while (current["Index"] < current["Input"].length && current["Input"][current["Index"]][3] >= 3) current["Index"]++
      if (current["Index"] == current["Input"].length) nav.navigate('Success', {pathway: path, total: current["Input"].length, correct, time: seconds})
      current["Input"][current["Index"]][3] = 1;
    }
    setAccuracy(-2);
    setTimeout(() => { setAccuracy(0) }, 1000)
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

let data = { // Input array: [x, y, correct answer, answered]
  "Electron Transport Chain": {
    "Dimensions": [959, 512], 
    "Image": ETC,
    "Input": [[-47.5, 32.5, "32", 0], [-47.5, 37.5, "6", 0], [-34.2, 25.5, "NADH", 0], [-27, 25.5, "NAD+", 0], [-21, 32, "Succinate", 0], [-7.8, 32, "Fumarate", 0],
      [-22.8, 19.5, "FADH2", 0], [-13.2, 19.5, "FAD+", 0], [-12.5, -8, "CoQ", 0], [8, -7, "Cyt C", 0], [33.5, 16.5, "ATP Synthase", 0], [29, 37, "ADP", 0],
      [38, 37, "ATP", 0], [12, 32, "NADH Dehydrogenase", 0], [12, 35.5, "Succinate Dehydrogenase", 0], [12, 39, "Cyt bc1 Complex", 0], [12, 42.5, "Cyt C Oxidase", 0]]
  },
  "Krebs Cycle": {
    "Dimensions": [860, 699],
    "Input": [[-17, -39, "Oxaloacetate", 0], [13, -39, "Citric Acid", 0], [-6.5, -47.5, "Acetyl CoA", 0], [-2, -34, "Citrate Synthase", 0], [25, -30, "Aconitase", 0],
      [33.5, -17.5, "Isocitric Acid", 0], [33.5, 10.5, "a-Ketoglutaric Acid", 0], [12.5, 40, "Succinyl CoA"], [-17, 40, "Succinate", 0], [-37.5, 10.5, "Fumarate", 0],
      [-37.5, -17.5, "Malate", 0], [27, -4, "Isocitrate\nDehydrogenase", 0], [25, 26, "a-Ketoglutarate\nDehydrogenase", 0], [-3, 35, "Succinyl CoA\nSynthetase", 0],
      [-29, 25, "Succinate\nDehydrogenase", 0], [-32, -4, "Fumarase", 0], [-30, -30, "Malate\nDehydrogenase", 0], [42, -10, "CO2", 0], [42, -5, "NAD+", 0], [42, 4, "NADH", 0],
      [42, 20, "CO2", 0], [41, 28, "NAD+", 0], [34.5, 38, "NADH", 0], [3, 46, "ADP", 0], [-6, 46, "ATP", 0], [-38, 39, "FAD", 0], [-43, 28, "FADH2", 0],
      [-46.5, 4.5, "H2O", 0], [-43.5, -27, "NAD+", 0], [-36.5, -36, "NADH", 0], [-4, 1.5, "2", 0], [-4, 6, "8", 0], [-4, 11, "2", 0], [-4, 15.8, "6", 0]],
    "Image": Krebs_Cycle,
  },
  "Fermentation": {
    "Image": Fermentation,
    "Dimensions": [486, 287],
    "Input": [[-37, -26, "Glucose", 0], [-17.5, -40, "ADP", 0], [12.5, -40, "ATP"], [35, -26, "Pyruvate", 0], 
      [36, 28, "Lactate", 0], [-16, 0, "NAD+", 0], [14, 0, "NADH", 0], [-35, 28, "Lactic Acid", 0], [-41, 28, "2", 0]]
  },
  "Glycolysis": {
    "Dimensions": [779, 831],
    "Image": Glycolysis,
    "Input": [[-8.6, -47, "Glucose", 0], [-3, -43.3, "ATP", 0], [-3, -40.3, "ADP", 0], [-3, -23.7, "ATP", 0], [-3, -20.7, "ADP", 0],
      [-3, 9.1, "ATP", 0], [-3, 12.1, "ADP", 0], [-3, 38.2, "ATP", 0], [-3, 41.2, "ADP", 0], [-8.6, -37, "Glucose-6-phosphate", 0],
      [-8.6, -27, "Fructose-6-phosphate", 0], [-8.6, -17, "Fructose-1,6-phosphate", 0], [-8.6, -6, "Glyceraldehyde\n3-phosphate", 0],
      [-8.6, 6, "1,3-Bisphosphoglycerate", 0], [-8.6, 16, "3-Phosphoglycerate", 0], [-8.6, 26, "2-Phosphoglycerate", 0], [-8.6, 36, "Phosphoenolpyruvate", 0],
      [-8.6, 45.5, "Pyruvate", 0], [-39, -6, "Dihydroxyacetone\nphosphate", 0], [0, -.5, "NAD+", 0], [0, 2.5, "NADH", 0], [7, -.5, "Pi", 0], [8, 2.5, "H+", 0],
      [30, -42, "Hexokinase", 0], [30, -37.75, "Phosphoglucose isomerase", 0], [30, -33.5, "Phosphofructokinase-1", 0], [30, -28.5, "Aldolase", 0],
      [30, -23.5, "Trisephosphate isomerase", 0], [30, -19, "Glyceraldehyde 3-phosphate\ndehydrogenase", 0], [30, -13, "Phosphoglycerate kinase", 0],
      [30, -8, "Phosphoglyceromutase", 0], [30, -3, "Enolase", 0], [30, 2, "Pyruvate kinase", 0], [26.5, 17.5, "2", 0], [26, 22.2, "2", 0], [25, 26.8, "2", 0]]
  },
  "Gluconeogenesis": {
    "Dimensions": [779, 831],
    "Image": Gluconeogenesis,
    "Input": [[-8.6, -47, "Glucose", 0], [-3, -43, "Pi", 0], [-3, -40, "H2O", 0], [-3, -23.2, "Pi", 0], [-3, -20.2, "H2O", 0],
      [-3, 9.5, "Pi", 0], [-3, 12.5, "H2O", 0], [-3, 29.7, "Pi", 0], [-3, 32.7, "H2O", 0], [-8.6, -37, "Glucose-6-phosphate", 0],
      [-8.6, -27, "Fructose-6-phosphate", 0], [-8.6, -17, "Fructose-1,6-phosphate", 0], [-8.6, -6, "Glyceraldehyde\n3-phosphate", 0],
      [-8.6, 6, "1,3-Bisphosphoglycerate", 0], [-8.6, 16, "3-Phosphoglycerate", 0], [-8.6, 26, "2-Phosphoglycerate", 0], [-8.6, 36, "Phosphoenolpyruvate", 0],
      [-8.6, 45.5, "Pyruvate", 0], [-39, -6, "Dihydroxyacetone\nphosphate", 0], [-3, -.5, "Pi", 0], [-3, 2.5, "H2O", 0], [-30, 46.2, "HCO3-", 0], [-24, 46.2, "ATP", 0],
      [30, -42, "Glucose 6-phosphate", 0], [30, -37.75, "Phosphoglucose isomerase", 0], [30, -33.5, "Fructose 1,6-bisphosphatase", 0], [30, -28.5, "Aldolase", 0],
      [30, -23.5, "Trisephosphate isomerase", 0], [30, -19, "Glyceraldehyde 3-phosphate\ndehydrogenase", 0], [30, -13, "Phosphoglycerate kinase", 0],
      [30, -8, "Phosphoglyceromutase", 0], [30, -3, "Enolase", 0], [30, 2, "Phosphoenolpyruvate\ncarboxykinase", 0], [30, 8.5, "Pyruvate carboxylase", 0], [25.5, 22.5, "1", 0], [27, 27.2, "6", 0], 
      [28, 32, "6", 0], [27, 37.3, "2", 0], [-40, 35, "Oxaloacetate", 0], [-36, 29, "GTP", 0], [-32, 25, "GDP", 0], [-26, 25, "CO2", 0], [-41, 40.6, "ADP", 0], [-35, 40.6, "Pi", 0]]
  },
  "Glycogenesis": {
    "Dimensions": [318, 686],
    "Image": Glycogenesis,
    "Size": 14,
    "Input": [[13.5, -38.5, "Glucose", 0], [13.5, -19.5, "Glucose 6-Phosphate", 0], [13.5, 0, "Glucose 1-Phosphate", 0], [13.5, 19, "UDP-Glucose", 0], [13.5, 46, "Glycogen", 0],
      [28, -31, "ATP", 0], [28, -27, "ADP", 0], [28, 7.5, "UTP", 0], [28, 11.3, "PPi", 0], [28, 33.3, "UDP", 0], [-10, -29, "Hexokinase", 0],
      [-10, -10, "Phosphoglucomutase", 0], [-10, 9.5, "UDP Glucose\nPyrophosphorylase", 0], [-10, 30, "Glycogen Synthase", 0], [-10, 37, "Branching Enzyme", 0]]
  },
  "Glycogenolysis": {
    "Dimensions": [317, 538],
    "Image": Glycogenolysis,
    "Size": 14,
    "Input": [[13.5, -35, "Glucose", 0], [13.5, -11, "Glucose 6-Phosphate", 0], [13.5, 14, "Glucose 1-Phosphate", 0], [13.5, 45, "Glycogen", 0],
      [28, -25, "Pi", 0], [28, -20, "H2O", 0], [28, 29.7, "Pi", 0], [-10, -23, "Glucose 6-phosphatase", 0],
      [-10, 2, "Phosphoglucomutase", 0], [-10, 25, "Debranching Enzyme", 0], [-10, 33, "Glycogen\nPhosphorylase", 0]]
  },
  "Pentose Phosphate Pathway": {
    "Dimensions": [1369, 1142],
    "Image": Pentose_Phosphate,
    "Input": [[-43, -40, "Glucose", 0], [-36.9, -33, "ATP", 0], [-29.1, -33, "ADP", 0], [-19.4, -40, "Glucose 6-phosphate", 0], [-33, -42, "Glucokinase", 0],
      [-4.5, -44, "Glucose 6-phosphate\ndehydrogenase", 0], [12, -40, "6-phosphogluconolactonase", 0], [-8.4, -33, "NADP+", 0], [-.6, -33, "NADPH", 0], [9, -32, "H2O", 0],
      [13.5, -28, "H+", 0], [22, -32, "Lactonase", 0], [22, -24, "6-phosphogluconate", 0], [21.6, -11.5, "Ribulose 5-phosphate", 0], [30, -20.4, "NADP+", 0], [30, -15.5, "NADPH", 0],
      [12, -6, "Isomerase", 0], [30, -6, "Epimerase", 0], [11.5, 1, "Xylulose 5-phosphate", 0], [29.5, 1, "Ribose 5-phosphate", 0],
      [9.5, 16, "Glyceraldehyde 3-phosphate", 0], [31.4, 16, "Sedoheptulose 7-phosphate", 0], [26, 8, "Transketolase", 0], [26, 23, "Transaldolase", 0],
      [9.5, 31, "Fructose 6-phosphate", 0], [31.4, 31, "Erythrose 4-phosphate", 0], [8, 36.5, "Xyulose 5-phosphate", 0], [8, 45.5, "Glyceraldehyde 3-phosphate", 0],
      [32, 40, "Transketolase", 0], [38, 45.5, "Fructose 6-phosphate", 0]]
  },
};

const constData = { // Input array: [x, y, correct answer, answered]
  "Electron Transport Chain": {
    "Dimensions": [959, 512], 
    "Image": ETC,
    "Input": [[-47.5, 32.5, "32", 0], [-47.5, 37.5, "6", 0], [-34.2, 25.5, "NADH", 0], [-27, 25.5, "NAD+", 0], [-21, 32, "Succinate", 0], [-7.8, 32, "Fumarate", 0],
      [-22.8, 19.5, "FADH2", 0], [-13.2, 19.5, "FAD+", 0], [-12.5, -8, "CoQ", 0], [8, -7, "Cyt C", 0], [33.5, 16.5, "ATP Synthase", 0], [29, 37, "ADP", 0],
      [38, 37, "ATP", 0], [12, 32, "NADH Dehydrogenase", 0], [12, 35.5, "Succinate Dehydrogenase", 0], [12, 39, "Cyt bc1 Complex", 0], [12, 42.5, "Cyt C Oxidase", 0]]
  },
  "Krebs Cycle": {
    "Dimensions": [860, 699],
    "Input": [[-17, -39, "Oxaloacetate", 0], [13, -39, "Citric Acid", 0], [-6.5, -47.5, "Acetyl CoA", 0], [-2, -34, "Citrate Synthase", 0], [25, -30, "Aconitase", 0],
      [33.5, -17.5, "Isocitric Acid", 0], [33.5, 10.5, "a-Ketoglutaric Acid", 0], [12.5, 40, "Succinyl CoA"], [-17, 40, "Succinate", 0], [-37.5, 10.5, "Fumarate", 0],
      [-37.5, -17.5, "Malate", 0], [27, -4, "Isocitrate\nDehydrogenase", 0], [25, 26, "a-Ketoglutarate\nDehydrogenase", 0], [-3, 35, "Succinyl CoA\nSynthetase", 0],
      [-29, 25, "Succinate\nDehydrogenase", 0], [-32, -4, "Fumarase", 0], [-30, -30, "Malate\nDehydrogenase", 0], [42, -10, "CO2", 0], [42, -5, "NAD+", 0], [42, 4, "NADH", 0],
      [42, 20, "CO2", 0], [41, 28, "NAD+", 0], [34.5, 38, "NADH", 0], [3, 46, "ADP", 0], [-6, 46, "ATP", 0], [-38, 39, "FAD", 0], [-43, 28, "FADH2", 0],
      [-46.5, 4.5, "H2O", 0], [-43.5, -27, "NAD+", 0], [-36.5, -36, "NADH", 0], [-4, 1.5, "2", 0], [-4, 6, "8", 0], [-4, 11, "2", 0], [-4, 15.8, "6", 0]],
    "Image": Krebs_Cycle,
  },
  "Fermentation": {
    "Image": Fermentation,
    "Dimensions": [486, 287],
    "Input": [[-37, -26, "Glucose", 0], [-17.5, -40, "ADP", 0], [12.5, -40, "ATP"], [35, -26, "Pyruvate", 0], 
      [36, 28, "Lactate", 0], [-16, 0, "NAD+", 0], [14, 0, "NADH", 0], [-35, 28, "Lactic Acid", 0], [-41, 28, "2", 0]]
  },
  "Glycolysis": {
    "Dimensions": [779, 831],
    "Image": Glycolysis,
    "Input": [[-8.6, -47, "Glucose", 0], [-3, -43.3, "ATP", 0], [-3, -40.3, "ADP", 0], [-3, -23.7, "ATP", 0], [-3, -20.7, "ADP", 0],
      [-3, 9.1, "ATP", 0], [-3, 12.1, "ADP", 0], [-3, 38.2, "ATP", 0], [-3, 41.2, "ADP", 0], [-8.6, -37, "Glucose-6-phosphate", 0],
      [-8.6, -27, "Fructose-6-phosphate", 0], [-8.6, -17, "Fructose-1,6-phosphate", 0], [-8.6, -6, "Glyceraldehyde\n3-phosphate", 0],
      [-8.6, 6, "1,3-Bisphosphoglycerate", 0], [-8.6, 16, "3-Phosphoglycerate", 0], [-8.6, 26, "2-Phosphoglycerate", 0], [-8.6, 36, "Phosphoenolpyruvate", 0],
      [-8.6, 45.5, "Pyruvate", 0], [-39, -6, "Dihydroxyacetone\nphosphate", 0], [0, -.5, "NAD+", 0], [0, 2.5, "NADH", 0], [7, -.5, "Pi", 0], [8, 2.5, "H+", 0],
      [30, -42, "Hexokinase", 0], [30, -37.75, "Phosphoglucose isomerase", 0], [30, -33.5, "Phosphofructokinase-1", 0], [30, -28.5, "Aldolase", 0],
      [30, -23.5, "Trisephosphate isomerase", 0], [30, -19, "Glyceraldehyde 3-phosphate\ndehydrogenase", 0], [30, -13, "Phosphoglycerate kinase", 0],
      [30, -8, "Phosphoglyceromutase", 0], [30, -3, "Enolase", 0], [30, 2, "Pyruvate kinase", 0], [26.5, 17.5, "2", 0], [26, 22.2, "2", 0], [25, 26.8, "2", 0]]
  },
  "Gluconeogenesis": {
    "Dimensions": [779, 831],
    "Image": Gluconeogenesis,
    "Input": [[-8.6, -47, "Glucose", 0], [-3, -43, "Pi", 0], [-3, -40, "H2O", 0], [-3, -23.2, "Pi", 0], [-3, -20.2, "H2O", 0],
      [-3, 9.5, "Pi", 0], [-3, 12.5, "H2O", 0], [-3, 29.7, "Pi", 0], [-3, 32.7, "H2O", 0], [-8.6, -37, "Glucose-6-phosphate", 0],
      [-8.6, -27, "Fructose-6-phosphate", 0], [-8.6, -17, "Fructose-1,6-phosphate", 0], [-8.6, -6, "Glyceraldehyde\n3-phosphate", 0],
      [-8.6, 6, "1,3-Bisphosphoglycerate", 0], [-8.6, 16, "3-Phosphoglycerate", 0], [-8.6, 26, "2-Phosphoglycerate", 0], [-8.6, 36, "Phosphoenolpyruvate", 0],
      [-8.6, 45.5, "Pyruvate", 0], [-39, -6, "Dihydroxyacetone\nphosphate", 0], [-3, -.5, "Pi", 0], [-3, 2.5, "H2O", 0], [-30, 46.2, "HCO3-", 0], [-24, 46.2, "ATP", 0],
      [30, -42, "Glucose 6-phosphate", 0], [30, -37.75, "Phosphoglucose isomerase", 0], [30, -33.5, "Fructose 1,6-bisphosphatase", 0], [30, -28.5, "Aldolase", 0],
      [30, -23.5, "Trisephosphate isomerase", 0], [30, -19, "Glyceraldehyde 3-phosphate\ndehydrogenase", 0], [30, -13, "Phosphoglycerate kinase", 0],
      [30, -8, "Phosphoglyceromutase", 0], [30, -3, "Enolase", 0], [30, 2, "Phosphoenolpyruvate\ncarboxykinase", 0], [30, 8.5, "Pyruvate carboxylase", 0], [25.5, 22.5, "1", 0], [27, 27.2, "6", 0], 
      [28, 32, "6", 0], [27, 37.3, "2", 0], [-40, 35, "Oxaloacetate", 0], [-36, 29, "GTP", 0], [-32, 25, "GDP", 0], [-26, 25, "CO2", 0], [-41, 40.6, "ADP", 0], [-35, 40.6, "Pi", 0]]
  },
  "Glycogenesis": {
    "Dimensions": [318, 686],
    "Image": Glycogenesis,
    "Size": 14,
    "Input": [[13.5, -38.5, "Glucose", 0], [13.5, -19.5, "Glucose 6-Phosphate", 0], [13.5, 0, "Glucose 1-Phosphate", 0], [13.5, 19, "UDP-Glucose", 0], [13.5, 46, "Glycogen", 0],
      [28, -31, "ATP", 0], [28, -27, "ADP", 0], [28, 7.5, "UTP", 0], [28, 11.3, "PPi", 0], [28, 33.3, "UDP", 0], [-10, -29, "Hexokinase", 0],
      [-10, -10, "Phosphoglucomutase", 0], [-10, 9.5, "UDP Glucose\nPyrophosphorylase", 0], [-10, 30, "Glycogen Synthase", 0], [-10, 37, "Branching Enzyme", 0]]
  },
  "Glycogenolysis": {
    "Dimensions": [317, 538],
    "Image": Glycogenolysis,
    "Size": 14,
    "Input": [[13.5, -35, "Glucose", 0], [13.5, -11, "Glucose 6-Phosphate", 0], [13.5, 14, "Glucose 1-Phosphate", 0], [13.5, 45, "Glycogen", 0],
      [28, -25, "Pi", 0], [28, -20, "H2O", 0], [28, 29.7, "Pi", 0], [-10, -23, "Glucose 6-phosphatase", 0],
      [-10, 2, "Phosphoglucomutase", 0], [-10, 25, "Debranching Enzyme", 0], [-10, 33, "Glycogen\nPhosphorylase", 0]]
  },
  "Pentose Phosphate Pathway": {
    "Dimensions": [1369, 1142],
    "Image": Pentose_Phosphate,
    "Input": [[-43, -40, "Glucose", 0], [-36.9, -33, "ATP", 0], [-29.1, -33, "ADP", 0], [-19.4, -40, "Glucose 6-phosphate", 0], [-33, -42, "Glucokinase", 0],
      [-4.5, -44, "Glucose 6-phosphate\ndehydrogenase", 0], [12, -40, "6-phosphogluconolactonase", 0], [-8.4, -33, "NADP+", 0], [-.6, -33, "NADPH", 0], [9, -32, "H2O", 0],
      [13.5, -28, "H+", 0], [22, -32, "Lactonase", 0], [22, -24, "6-phosphogluconate", 0], [21.6, -11.5, "Ribulose 5-phosphate", 0], [30, -20.4, "NADP+", 0], [30, -15.5, "NADPH", 0],
      [12, -6, "Isomerase", 0], [30, -6, "Epimerase", 0], [11.5, 1, "Xylulose 5-phosphate", 0], [29.5, 1, "Ribose 5-phosphate", 0],
      [9.5, 16, "Glyceraldehyde 3-phosphate", 0], [31.4, 16, "Sedoheptulose 7-phosphate", 0], [26, 8, "Transketolase", 0], [26, 23, "Transaldolase", 0],
      [9.5, 31, "Fructose 6-phosphate", 0], [31.4, 31, "Erythrose 4-phosphate", 0], [8, 36.5, "Xyulose 5-phosphate", 0], [8, 45.5, "Glyceraldehyde 3-phosphate", 0],
      [32, 40, "Transketolase", 0], [38, 45.5, "Fructose 6-phosphate", 0]]
  },
};

let startTime;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  box: {
    zIndex: 0,
    borderWidth: 0,
    height: '100%',
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  btn: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 10,
    // backgroundColor: 'rgba(255, 233, 33, .3)',
    // borderColor: 'rgba(255, 233, 33, .7)',
    borderWidth: 2,
  },
  btnCurrent: {
    backgroundColor: 'rgba(255, 233, 33, .3)',
    borderColor: 'rgba(255, 233, 33, .7)',
  },
  keyboardPanel: {
    position: 'absolute',
    width: '100%',
    height: 40,

    color: 'black',
    left: 0,
    backgroundColor: 'lightgray',
  },
  barBtn: {
    position: 'absolute',
    width: '22%',
    height: '70%',
    top: '15%',
    borderRadius: 10,
    borderColor: 'blue',
    borderStyle: 'solid',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    
  },
  input: {
    width: '48%',
    left: '2%',
    height: '70%',
    top: '15%',
    borderRadius: 10,
    borderColor: 'blue',
    borderStyle: 'solid',
    backgroundColor: '#e0e0e0',
    paddingLeft: '2%',
  },
  text: {
    width: 200,
    height: 100,
    fontSize: 5,
    position: 'absolute',
    textAlign: 'center',
  },
  subText: {
    fontSize: 3,
    lineHeight: 42,
  },
  superText: {
    lineHeight: 18,
    fontSize: 3,
  },
  hoverTop: {
    position: 'absolute',
    top: '5%',
    width: '60%',
  },
});