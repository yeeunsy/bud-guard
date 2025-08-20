// src/screens/UserLocationScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, Button, PermissionsAndroid, Platform } from "react-native";
// import Geolocation from "@react-native-community/geolocation";
// import MapView, { Marker } from "react-native-maps";
// import { db } from "../../firebase/firebaseConfig.ts";
// import { auth } from "../../firebase/firebaseConfig.ts";
// import { doc, setDoc } from "firebase/firestore";

// const UserLocationScreen = () => {
//   const [location, setLocation] = useState<any>(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "위치 권한 요청",
//           message: "앱이 위치를 사용하도록 허용하시겠습니까?",
//           buttonNeutral: "나중에",
//           buttonNegative: "거부",
//           buttonPositive: "허용",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         startTracking();
//       } else {
//         console.log("위치 권한 거부됨");
//       }
//     } else {
//       startTracking(); // iOS라면 바로 실행
//     }
//   };

//   const startTracking = () => {
//     Geolocation.watchPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setLocation({ latitude, longitude });

//         // 🔥 Firebase에 유저 위치 업로드
//         const user = auth.currentUser;
//         if (user) {
//           await setDoc(doc(db, "locations", user.email!), {
//             latitude,
//             longitude,
//             updatedAt: new Date(),
//           });
//         }
//       },
//       (error) => console.error(error),
//       { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {location ? (
//         <MapView
//           style={{ width: "100%", height: "100%" }}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={location} title="내 위치" />
//         </MapView>
//       ) : (
//         <Text>위치를 가져오는 중...</Text>
//       )}
//     </View>
//   );
// };

// export default UserLocationScreen;

import React, { useEffect, useState } from "react";
import { View, Text, Button, PermissionsAndroid, Platform, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const UserLocationScreen: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한",
            message: "앱에서 위치를 사용하려면 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "취소",
            buttonPositive: "확인",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // 위치 가져오기
  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("위치 권한이 거부되었습니다.");
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Firestore에 위치 업데이트
        const user = getAuth().currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          await updateDoc(userDoc, {
            location: {
              latitude,
              longitude,
              updatedAt: serverTimestamp(),
            },
          });
        }
      },
      (error) => {
        console.error(error);
        Alert.alert("위치를 가져올 수 없습니다.", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button title="내 위치 가져오기" onPress={getLocation} />
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="내 위치" />
        </MapView>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>위치를 가져오는 중...</Text>
      )}
    </View>
  );
};

export default UserLocationScreen;