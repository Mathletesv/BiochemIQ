import * as React from 'react';
import { StyleSheet, View, Text, Image, Animated, Button } from 'react-native';
// @ts-ignore
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Krebs_Cycle from '../assets/pathway-images/Krebs-Cycle.png';
import Glycolysis from '../assets/pathway-images/Glycolysis.png';
import Fermentation from '../assets/pathway-images/Fermentation.png';
import ETC from '../assets/pathway-images/ETC.png';
import Gluconeogenesis from '../assets/pathway-images/Gluconeogenesis.png';
import Glycogenesis from '../assets/pathway-images/Glycogenesis.png';
import Glycogenolysis from '../assets/pathway-images/Glycogenolysis.png';
import Pentose_Phosphate from '../assets/pathway-images/Pentose-Phosphate.png';

export default function Learn({navigation, route}) {
  const zoomAnimatedValue = React.useRef(new Animated.Value(1)).current;
  const scale = Animated.divide(1, zoomAnimatedValue);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ReactNativeZoomableView
          maxZoom={5}
          initialZoom={1}
          minZoom={1}
          zoomAnimatedValue={zoomAnimatedValue}
        >
          <View style={styles.contents}>
            <Image
              style={styles.img}
              source={images[route.params.pathway]}
            />
          </View>
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const images = {
  "Electron Transport Chain": ETC,
  "Krebs Cycle": Krebs_Cycle,
  "Glycolysis": Glycolysis,
  "Gluconeogenesis": Gluconeogenesis,
  "Fermentation": Fermentation,
  "Glycogenesis": Glycogenesis,
  "Glycogenolysis": Glycogenolysis,
  "Pentose Phosphate Pathway": Pentose_Phosphate,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: {
    flex: 1,
    alignSelf: 'stretch',
  },
  box: {
    borderWidth: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: -10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
  },
});
