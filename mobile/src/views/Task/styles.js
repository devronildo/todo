import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imageIcon: {
        width: 50,
        height: 50,
        marginHorizontal: 10
    },
    label: {
        color: '#707070',
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 5 
    },
    input: {
        fontSize: 16,
        padding: 10,
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#ee6b26',
        marginHorizontal: 10
    },
    inputArea: {
        fontSize: 16,
        padding: 10,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ee6b26',
        marginHorizontal: 10,
        borderRadius: 10,
        height: 100,
        textAlignVertical: 'top'
    },
    inLine: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 50
    },
    inputInline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    switchLabel: {
        fontWeight: 'bold',
        color: '#ee6b26',
        textTransform: 'uppercase',
        fontSize: 16,
        paddingLeft: 10
    },
    removeLabel: {
        fontWeight: 'bold',
        color: '#20295f',
        textTransform: 'uppercase',
        fontSize: 16,
    },
    typeIconInative: {
      opacity: 0.5
   }

    
})

export default styles;