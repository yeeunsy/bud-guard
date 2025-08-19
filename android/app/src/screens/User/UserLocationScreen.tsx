// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { auth, db } from "../firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { requestLocationPermission, getCurrentLocation } from "../services/locationService";

// export default function UserLocationScreen() {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   useEffect(() => {
//     (async () => {
//       const granted = await requestLocationPermission();
//       if (!granted) return;

//       const loc = await getCurrentLocation();
//       setLocation(loc);

//       // Firestore에 저장 (내 위치 갱신)
//       const user = auth.currentUser;
//       if (user) {
//         await setDoc(
//           doc(db, "locations", user.uid),
//           {
//             email: user.email,
//             latitude: loc.latitude,
//             longitude: loc.longitude,
//             updatedAt: new Date(),
//           },
//           { merge: true }
//         );
//       }
//     })();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {location ? (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             ...location,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={location} title="내 위치" />
//         </MapView>
//       ) : (
//         <Text>위치 불러오는 중...</Text>
//       )}
//     </View>
//   );
// }


// import React from "react";
// import { View, Text } from "react-native";
// import useLocation from "../hooks/useLocation";
// import { db, auth } from "../firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";

// export default function UserLocationScreen() {
//   const location = useLocation(async (coords) => {
//     const user = auth.currentUser;
//     if (user) {
//       await setDoc(doc(db, "locations", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//         timestamp: new Date(),
//       });
//     }
//   });

//   return (
//     <View>
//       {location ? (
//         <Text>
//           내 위치: {location.latitude}, {location.longitude}
//         </Text>
//       ) : (
//         <Text>위치 정보를 가져오는 중...</Text>
//       )}
//     </View>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// async function requestLocationPermission() {
//   if (Platform.OS === "android") {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "위치 권한 요청",
//           message: "실시간 위치 확인을 위해 위치 권한이 필요합니다.",
//           buttonNeutral: "나중에",
//           buttonNegative: "취소",
//           buttonPositive: "허용",
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true;
// }

// export default function UserLocationScreen() {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   useEffect(() => {
    
//     (async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) return;

//       Geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation({ latitude, longitude });
//         },
//         (err) => console.error(err),
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );

//       // 실시간 추적
//       const watchId = Geolocation.watchPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setLocation({ latitude, longitude });
//         },
//         (err) => console.error(err),
//         { enableHighAccuracy: true, distanceFilter: 10 }
//       );

//       return () => Geolocation.clearWatch(watchId);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {location ? (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={location} title="내 위치" />
//         </MapView>
//       ) : (
//         <Text>위치를 불러오는 중...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const UserLocationScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ 권한 요청 함수
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한 요청",
            message: "이 앱은 지도를 표시하기 위해 위치 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "거부",
            buttonPositive: "허용",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("위치 권한 허용됨");
          getCurrentLocation();
        } else {
          console.log("위치 권한 거부됨");
          setError("위치 권한이 거부되었습니다.");
        }
      } else {
        // iOS는 Info.plist에서 자동 처리됨
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // ✅ 현재 위치 불러오기
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      (error) => setError(error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
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
        <Text>{error ? error : "위치를 불러오는 중..."}</Text>
      )}
    </View>
  );
};

export default UserLocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});