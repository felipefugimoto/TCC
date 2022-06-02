import React, { useState, useEffect } from 'react';

import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

//import Geolocation from '@react-native-geolocation-service';

//import * as Permission from 'expo-permission';

import Mapas from './componetes/mapsGoogle'
import { StatusBar } from 'expo-status-bar';
export default function App() {

  return (
    <View style={styles.container}>
     <Mapas/>
     <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

});