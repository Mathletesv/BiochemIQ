import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  header: {
    fontSize: 36,
    marginBottom: 20,
  },
  button: {
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  btnText: {
    color: '#007AFF',
    fontSize: 18,
  },
  row: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 50,
  },
  rowText: {
    fontSize: 18,
    alignSelf: 'center',
    height: 30,
  },
  rowElement: {
    flex: 3,
  },
  input: {
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    height: 30
  }
});