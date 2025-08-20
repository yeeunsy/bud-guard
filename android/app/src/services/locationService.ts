// import * as Location from "expo-location";
// import { Alert } from "react-native";
// import { db, auth } from "../firebase/firebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
// import Geolocation, { GeoPosition, GeoError } from 'react-native-geolocation-service';


// export const requestLocationPermission = async () => {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== "granted") {
//     Alert.alert("위치 권한이 필요합니다!");
//     return null;
//   }
//   return true;
// };

// export const getCurrentLocation = async () => {
//   const location = await Location.getCurrentPositionAsync({});
//   return {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//   };
// };
// export async function updateMyLocation(latitude: number, longitude: number) {
//   const user = auth.currentUser;
//   if (!user) return;
//   await updateDoc(doc(db, "users", user.uid), {
//     location: { latitude, longitude, updatedAt: Date.now() },
//   });
// }
// import Geolocation, { GeoPosition, GeoError } from 'react-native-geolocation-service';
// import { PermissionsAndroid, Platform } from 'react-native';

// export const requestLocationPermission = async (): Promise<boolean> => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: '위치 권한 요청',
//           message: '앱이 위치 정보를 사용하려고 합니다.',
//           buttonPositive: '허용',
//           buttonNegative: '거부',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true;
// };

// export const getCurrentLocation = (): Promise<GeoPosition> => {
//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       position => resolve(position),
//       error => reject(error),
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   });
// };

// export const watchUserLocation = (
//   onLocation: (pos: GeoPosition) => void,
//   onError?: (err: GeoError) => void
// ) => {
//   return Geolocation.watchPosition(
//     position => onLocation(position),
//     error => onError && onError(error),
//     { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
//   );
// };

// export const clearWatch = (watchId: number) => {
//   Geolocation.clearWatch(watchId);
// };

// import Geolocation from 'react-native-geolocation-service';
// import {PermissionsAndroid, Platform} from 'react-native';

// export const requestLocationPermission = async (): Promise<boolean> => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: '위치 권한 요청',
//           message: '실시간 위치 추적을 위해 위치 권한이 필요합니다.',
//           buttonNeutral: '나중에',
//           buttonNegative: '취소',
//           buttonPositive: '허용',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true; // iOS는 Info.plist 설정 필요
// };

// export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
//   return new Promise((resolve, reject) => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => reject(error),
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   });
// };

// export const watchLocation = (
//   onChange: (lat: number, lng: number) => void,
// ): number => {
//   const watchId = Geolocation.watchPosition(
//     (position) => {
//       onChange(position.coords.latitude, position.coords.longitude);
//     },
//     (error) => {
//       console.error(error);
//     },
//     {enableHighAccuracy: true, distanceFilter: 0, interval: 5000},
//   );
//   return watchId;
// };

// export const clearWatch = (watchId: number) => {
//   Geolocation.clearWatch(watchId);
// };

import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const updateUserLocation = () => {
  return new Promise<void>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const user = auth().currentUser;

          if (user) {
            await firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                location: {
                  latitude,
                  longitude,
                },
              });
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};