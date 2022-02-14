import {ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {App, Platform} from 'ionic-angular';

import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';

import React, {Component} from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

//Vineet
export default class App extends Component {
    constructor () {
      super();
      this.state = {isLoading : true};
      
    }
  
    async componentDidMount(){
      console.log('VINEET component did mount')

  }
  
  
    sendData(){
      Alert.alert(
        'Send Data')
    }
  
    connect(){
  
  
      Alert.alert(
        'Connect')
    }
  
  
    retrieveData(){
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
              this.setState({
                isLoading : false,
                message : JSON.stringify(response.data[0].username)
            });
        }).catch((error) => {
               console.error(error);
           })  
    }
  
    render(){
  
      if(this.state.isLoading){
        return (
          <View style={styles.container}>
  
  
            <View style={{margin: 10, padding: 20}}>
              <Button  title="Send Data"
                onPress={() => this.sendData()}
            /> 
          </View>
        
          <View style={{marginVertical: 10}}>
            <Button  title="Retrieve Data"
                onPress={() => this.retrieveData()}
            />
          </View>
            <StatusBar style="auto" />
        </View>
        );
      }
  
  
        return (
          <View style={styles.container}>
  
            <View style={{margin: 10, padding: 20}}>
              <Button  title="Send Data"
                onPress={() => this.sendData()}
            /> 
          </View>
        
          <View style={{marginVertical: 10}}>
            <Button  title="Retrieve Data"
                onPress={() => this.retrieveData()}
            />
          </View>
            <StatusBar style="auto" />
            <Text style={styles.header}>Result: </Text>
            <Text>{this.state.message}</Text>
        </View>
        );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginBottom: 40,
      padding: 30
  },
  header: {
    marginBottom: 20,
    color: 'green',
    fontSize:20,
    padding: 10,
    justifyContent:'flex-start'
  },
  });
  
