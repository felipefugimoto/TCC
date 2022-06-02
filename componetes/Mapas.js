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
  const [errorMsg, setErrorMsg] = useState(null);

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
const hadleNewMarker = (coordinate) => {
  setMarker([...marker, coordinate]);

}
console.log(marker);
  return (
    <View style={styles.container}>
     
       <MapView
       onPress={(e) => hadleNewMarker(e.nativeEvent.coordinate)}
        style={styles.mapa}
          initialRegion={{
          latitude: -26.917328,
          longitude: -48.666385,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        loadingEnabled
       
      >
       {marker.length > 0 && marker.map((m) => {return <Marker coordinate={m} key={Math.random().toString()}/>; })}
        {/* <Marker
        coordinate={{
          latitude: -26.91713012455218,
          longitude: -48.666163980960846,
        }}
        /> */}
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
