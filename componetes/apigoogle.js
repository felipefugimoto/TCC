import React, { useState, useEffect, useRef} from 'react';
import { Platform, Text, View, StyleSheet,TouchableOpacity ,} from 'react-native';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions'
import Cconfig from '../config'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableHighlight } from 'react-native-web';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const GOOGLE_MAPS_APIKEY = 'AIzaSyD2-rS_RyugHDFzhz9Ay7R5rNqekReXP0Q';


export default function mapasdois() {

const [verificar, setVerificar] = useState();
const cor = 1;




  return (
    <View style={styles.continer}>
      <TouchableOpacity >
        
        {cor == 0 && <Text style= {{color: "blue"}}>Precione aqui</Text> }
        {cor == 1 && <Text style= {{color: "red"}}>Precione aqui</Text> }

        
        </TouchableOpacity>
       
        
        
    </View>
   
  );
}

const styles = StyleSheet.create({
    continer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      

    },
    busca:{
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
    }
  });
  