import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import * as Network from 'expo-network';

import styles from './styles'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

import api from '../../services/api';

export default function Home({ navigation }){
 
      const [filter, setFilter] = useState('today');
      const [tasks, setTasks] = useState([]);
      const [load, setLoad] = useState(false);
      const [lateCount, setLateCount] = useState();
      const [macaddress, setMacaddress] = useState();

      
    async function getMacAddress(){
        await Network.getMacAddressAsync().then(mac => {
        setMacaddress(mac);
      });
   }


      async function loadTask(){
          setLoad(true);
           await api.get(`/task/filter/${filter}/${macaddress}`).then(response => {
                setTasks(response.data);
                setLoad(false)
           });
      }

      async function lateVerify(){

         await api.get(`/task/filter/late/${macaddress}`).then(response => {
            setLateCount(response.data.length);
      
         });
    }

     function Notification(){
          setFilter('late');
      }

      function New(){
           navigation.navigate('Task');
      }

      function Show(id){
          navigation.navigate('Task', {idtask: id});
      }

      useEffect(() => {
        getMacAddress().then(() => {
          loadTask();
        })
         
          lateVerify();
      }, [filter])

    return (
        <View style={styles.container}>
            <Header showNotification={true}  showBack={false} pressNotification={Notification} late={lateCount}  />
             <View style={styles.filter}> 
               <TouchableOpacity onPress={() => setFilter('all')}> 
                    <Text style={ filter == 'all' ? styles.filterTextActived : styles.filterTextInative}>Todos</Text>
               </TouchableOpacity>    
               <TouchableOpacity onPress={() => setFilter('today')}>
                   <Text style={ filter == 'today' ? styles.filterTextActived : styles.filterTextInative}>Hoje</Text>
               </TouchableOpacity>    
               <TouchableOpacity onPress={() => setFilter('week')}>
                   <Text style={ filter == 'week' ? styles.filterTextActived : styles.filterTextInative}>Semana</Text>
               </TouchableOpacity>    
               <TouchableOpacity onPress={() => setFilter('month')}>
               <Text style={ filter == 'month' ? styles.filterTextActived : styles.filterTextInative}>Mês</Text>
               </TouchableOpacity>    
               <TouchableOpacity onPress={() => setFilter('year')}>
                  <Text style={ filter == 'year' ? styles.filterTextActived : styles.filterTextInative}>Ano</Text>
               </TouchableOpacity>    
             </View>   

              <View style={styles.title}>
                <Text style={styles.titleText}>TAREFAS {filter == 'late' && ' ATRASADAS'}</Text>
              </View>    

            
           
           <ScrollView style={styles.content} contentContainerStyle={{alignItems: 'center'}}>
          
         
       
            
            { 
             load ?
             <ActivityIndicator color={'#ee6b26'}  size={50} />
             : 
              tasks.map(t => (
                <TaskCard 
                  done={false}
                  title={t.title} 
                  when={t.when} 
                  type={t.type}
                  onPress={() => Show(t._id)}
                     
                />
              ))
            }  
             
             </ScrollView>             
 
            <Footer icon={'add'} onPress={New} />
        </View>

    ) 
       
   
        
    
}