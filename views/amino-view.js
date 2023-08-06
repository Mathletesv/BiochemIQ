import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { CustomButton } from '../utils/components';
import { styles } from '../utils/styles';
import { AMINO_NAMES, AMINO_PROPERTIES } from '../utils/amino-const';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';

export default AminoView = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{route.params.amino}</Text>
      <Text style={styles.rowText}>{AMINO_NAMES[route.params.amino][0]} - {AMINO_NAMES[route.params.amino][1]}</Text>
      <Text style={styles.rowText}>{AMINO_PROPERTIES[route.params.amino][2]}, {AMINO_PROPERTIES[route.params.amino][0] == "Hydrophobic" ? "Nonpolar" : "Polar"}</Text>
      <Text style={styles.rowText}>{AMINO_PROPERTIES[route.params.amino][0]}, {AMINO_PROPERTIES[route.params.amino][1]}</Text>
      <View style={{ borderWidth: 3, flexShrink: 1, aspectRatio: 1, width: '60%', marginTop: 10 }}>
        <ReactNativeZoomableView
          maxZoom={3}
          minZoom={1}
          contentWidth={300}
          contentHeight={300}
        >
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={AMINO_NAMES[route.params.amino][2]}
          />
        </ReactNativeZoomableView>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

