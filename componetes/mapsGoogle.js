import React, { useState, useEffect, useRef} from 'react';
import { Platform, Text, View, StyleSheet,TouchableOpacity, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import MapView, {Circle, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions'
import Cconfig from '../config'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { TextInput } from 'react-native-web';
import { Polyline } from '@react-google-maps/api';


const GOOGLE_MAPS_APIKEY = 'AIzaSyD2-rS_RyugHDFzhz9Ay7R5rNqekReXP0Q';
const {widht, height}= Dimensions.get("window");




export default function mapasdois() {

  const [origin, setOrigin] =useState(null);
  const [destination, setDestination]= useState(null)
  const [distance, setDistance]= useState(null)
  const [coordinates,setCoodinates]= useState([])
  const mapEl=useRef(null);
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);


  const [truck, setTruck]= useState([]);
  
  const proibido= [
    {
      latitude: -26.914033227351645,
      longitude: -48.65595314651727,
    
    },
    {
      latitude: -26.912941,
      longitude:  -48.661559,

    },
    {
      latitude: -26.91334, 
      longitude: -48.65833,

    }
  ];
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421
    })
    })();
  }, []);

//const posicaodestino= destination;
//console.log(posicaodestino);
const hadleNewMarker = (coordinate) => {
  setMarker([...marker, coordinate]);

}

const truckTip=[

  {
    id: 1,
    tipo: "VUC",
    eixos: 2,
    comprimentos: 6.3,
    capacidadeTon:3,
    color:'#ffff00',

  },
  {
    id: 2,
    tipo: "Toco",
    eixos: 2,
    comprimentos: 14,
    capacidadeTon: 6,
    color:'#ff00ff',
  },
  {
    id: 3,
    tipo: "Truck",
    eixos: 3,
    comprimentos: 14,
    capacidadeTon: 14,
    color:'#00ff00',
  },
  {
    id: 4,
    tipo: "Cavalo Mecânico Simples",
    eixos: 2,
    comprimentos: "Conforme o semirreboque",
    capacidadeTon: "Conforme o semirreboque",
    color:'#8b008b',
  },
  {
    id: 5,
    tipo: "Cavalo Mecânico Trucado",
    eixos: 3,
    comprimentos: "Conforme o semirreboque",
    capacidadeTon: "Conforme o semirreboque",
    color:'#ff00ff',
  },
  {
    id: 6,
    tipo: "Conjunto Carreta 2 eixos mais Cavalo Mecânico Simples",
    eixos: 4,
    comprimentos: 18.15,
    capacidadeTon: 33,
    color:'#ffebc',
  },
  {
    id: 7,
    tipo: "Conjunto Carreta 3 eixos mais Cavalo Mecânico Simples",
    eixos: 5,
    comprimentos: 18.15,
    capacidadeTon: 41.5,
    color:'#7fffd4',
  },
  {
    id: 8,
    tipo: "Bitrem",
    eixos: 7,
    comprimentos: 19.80,
    capacidadeTon: 57,
    color:'#ffa500',
  },
  {
    id: 9,
    tipo: "Rodotrem",
    eixos: 9,
    comprimentos: 30,
    capacidadeTon: 74,
    color:'#db7093',
  },
];
  
const numberTruck = 9;

  return (
    <View style={styles.container}>
      <View style={styles.mapa}>
      <MapView
        onPress={(e) => hadleNewMarker(e.nativeEvent.coordinate)}
        style={styles.container}
        initialRegion={origin}
        showsUserLocation={true}
        loadingEnabled={true}
       
        ref={mapEl}
     
    >
      {truckTip[numberTruck -1].id == numberTruck &&
      
      marker.length > 0 && marker.map((m) => {
        return <Marker coordinate={m} key={Math.random().toString()}  
              
        pinColor={truckTip[numberTruck -1].color}
        title={"Tipo de Caminhão - " + truckTip[numberTruck -1].tipo}
        description={"Comprimento permitido em metros - " + truckTip[numberTruck -1].comprimentos.toString() + "m"}
      
       />;
       
         

       
        
        })}
        
      
      
     
      {destination && 
        <MapViewDirections 
       
        origin={origin} 
        destination={destination} 
        mode='DRIVING'
        apikey={Cconfig.googleApi}
        language='pt-br'
        strokeWidth={4}
        strokeColor="red"
        optimizeWaypoints
        
        
        pinColor={'red'}
        onReady={result=>{
          setCoodinates(result.coordinates)
          // console.log(result.coordinates[1])
        
          setDistance(result.distance);
          
          mapEl
          
        }
      }
        >
         
      </MapViewDirections>
          
      
      }
     
        
        
      {destination &&
          <Marker coordinate={destination}/>
      }

    
    
      </MapView>
    
      </View>
      <View style={styles.busca}>
      <Text styles={{ textInput: styles.input}}>Tipo de Caminha</Text>
      
        <GooglePlacesAutocomplete
              placeholder='Para onde vamos?'
              onPress={(data, details = null) => {
               //console.log(data, details)
              //  console.log(data)
              //  console.log("\n===============================x===\n")
              //  console.log(details)
              //  console.log( details.geometry, data.place_id);
              setDestination({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.000922,
                  longitudeDelta: 0.000421
              });
              
              }}
              query={{
                  key: Cconfig.googleApi,
                  language: 'pt-br',
              }}
              enablePoweredByContainer={false}
              fetchDetails={true}
              styles={{listView:{height:300,}, textInput: styles.input}}
          />
          <TouchableOpacity style= {styles.botao}>
            <Text style= {styles.botaotexto}>Ir</Text>
            
           
          </TouchableOpacity>
          <Text>{distance}</Text>

      </View>
              
      
        
    </View>
   
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "center",
    },
    mapa:{
    
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      
      
    },
    busca:{
    
    
    backgroundColor:'#fff',
    position: "absolute",
    width: '83%',
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    
    borderRadius: 8,
    top:Constants.statusBarHeight ,
    
    
    },
    input:{
      borderColor:"#888",
      borderWidth:2,
     
      
    },
    botao:{
      backgroundColor: '#bbb',
      paddingVertical:5,
      borderRadius:8,
      marginTop: 8,
    },
    botaotexto:{
      textAlign:'center'
    },
    btndescricao:{
      backgroundColor:'#fff',
      position: "absolute",
      width: '83%',
    }

  });
  