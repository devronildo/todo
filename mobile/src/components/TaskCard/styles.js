import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   card: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       padding: 10,
       width: '90%',
       height: 80,
       marginVertical: 10, 
       backgroundColor: '#fff',
       
      
       shadowOffset: {
           width: 0,
           height: 2, 
           
         
       },
       shadowOpacity: 0.30,
       shadowRadius: 20,
       elevation: 5,
       borderRadius: 10,
       shadowColor: '#000', 
     

    
   },
   cardLeft: {
       flexDirection: 'row',
       alignItems: 'center'
   },
   typeActive: {
        width: 50,
        height: 50
   },
   cardTitle: {
       marginLeft: 10,
       fontWeight: 'bold',
       fontSize: 16
   },
   cardRight: {
       alignItems: 'flex-end',
       justifyContent: 'space-between'
   },
   cardDate: {
       color: '#ee6b26',
       fontWeight: 'bold',
       fontSize: 16
   },
   cardTime: {
       color: '#707070'
   },
   done: {
     opacity: 0.5
   }
});

export default styles;