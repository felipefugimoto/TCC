import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
//import Geolocation from '@react-native-geolocation-service';

//import * as Permission from 'expo-permission';

export default function App() {
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState([]);
  // const [lat, SetLatitude]= useState(0);
  // const [log, SetLongitude]= useState(0);
  
  
  
  useEffect(() => {
    (async () => {
     
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
 

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  const hadleNewMarker= (coordinate) =>{
    setMarker ([...marker, coordinate]);
    
  };
  

  return (
    <View style={styles.container}>
      <MapView
      onPress={(e) => hadleNewMarker(e.nativeEvent.coordinate)}
      style={styles.mapa}
      initialRegion={{
        latitude:-27.915447,
        longitude:-49.655266,
        latitudeDelta:0.01032,
        longitudeDelta:0.00541
      }}
      showsUserLocation
      loadingEnabled
      >
       {marker.length >0 && marker.map((m) =>{return <Marker coordinate={m}/>; })}

     </MapView>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop:"5%",
  },
  mapa:{
    flex:1,
  }
});
