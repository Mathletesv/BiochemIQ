import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const CustomButton = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} style={[styles.button, props.style]} onPress={props.onPress}>
      <Text style={styles.btnText}>{props.text}</Text>
    </TouchableOpacity>
  );
};