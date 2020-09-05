import React, {useState, useEffect} from 'react';

import {
    Text,
    View,
    ScrollView, 
    Image, 
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator
} from 'react-native';

import * as Network from 'expo-network';

//componentes
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import typeIcons from '../../utils/typeIcons';
import DateTimeInput from '../../components/DateTimeInput';

import styles from './styles';
import api from '../../services/api';

export default function Task({navigation}){
      
     const [id, setId] = useState();
     const [done, setDone] = useState(false);
     const [type, setType] = useState();
     const [title, setTitle] = useState();
     const [description, setDescription] = useState();
     const [date, setDate] = useState();
     const [hour, setHour] = useState();
     const [macaddress, setMacaddress] = useState();
     const [load, setLoad] = useState(false);

    async function New(){

      // Alert.alert(`${date}T${hour}`)
        
          if(!title)
            return Alert.alert('Defina um nome da tarefa!');
         
         if(!description)
           return Alert.alert('Defina a descrição da tarefa!');
          
         if(!type)
           return Alert.alert('Escolha um tipo para tarefa!'); 

         if(!date)
           return Alert.alert('Escolha um data para a tarefa!');  
       
         if(!hour)
           return Alert.alert('Escolha uma hora para a tarefa!');    
           
           await api.post('/task', {
               macaddress,
               type,
               title,
               description,
               when: `${date}T${hour}`
           }).then(() => {
              navigation.navigate('Home');
           });
    }

    async function LoadTask(){
       await api.get(`task/${id}`).then(response => {        
          setLoad(true);
          setDone(response.data.done);
          setType(response.data.type);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDate(response.data.when);
          setHour(response.data.when);          
       })

    }


    async function getMacAddress(){
       await Network.getMacAddressAsync().then(mac => {
        setMacaddress(mac);
        setLoad(false);
     });
    }

    useEffect(() => {
      getMacAddress();


      if(navigation.state.params){
        setId(navigation.state.params.idtask)
        LoadTask().then(() => setLoad(false))
      }
   
    });
 
      return (
          <KeyboardAvoidingView behavior='padding' style={styles.container} > 
               <Header showBack={true} navigation={navigation} />


               <ScrollView style={{width: '100%'}}>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
                          {
                              typeIcons.map((icon, index) => (
                                  icon !== null && 
                                <TouchableOpacity onPress={() => setType(index)}>
                                <Image source={icon} style={[styles.imageIcon, type && type != index && styles.typeIconInative]} />
                                </TouchableOpacity>    
                            )) 
                          }
                      </ScrollView>  
            
                      
                      <Text style={styles.label}>Titulo</Text>
                      <TextInput style={styles.input} 
                        maxLength={30} 
                        placeholder="Lembre-me de fazer" 
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                      />

                      <Text style={styles.label}>Detalhes</Text>
                      <TextInput style={styles.inputArea} 
                        multiline={true} 
                        maxLength={200} 
                        placeholder="Detalhes da atividade que eu preciso lembrar.." 
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                       />
                          
                           <DateTimeInput type={'date'} save={setDate} date={date} />
                           <DateTimeInput type={'hour'} save={setHour} hour={hour}  />
              
              {
                id &&
                      <View style={styles.inLine}>
                           <View style={styles.inputInline}>
                                <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? '#00761b' : '#ee6b26' } />
                                <Text style={styles.switchLabel}>Concluído</Text>
                           </View>   
                            <TouchableOpacity>
                        
                                <Text style={styles.removeLabel}>EXCLUÍR</Text>
                           
                            </TouchableOpacity>    
                      </View>    
                   
               }

                       
               </ScrollView >   
               
              
            
                
                <Footer icon={'save'} onPress={New} />
              
          </KeyboardAvoidingView>    
      )

}