// import React, { useState } from "react";
// import { View, TextInput, Button, Text, Alert } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { db } from "./firebase/firebaseConfig.ts";
// import { collection, query, where, getDocs } from "firebase/firestore";

// export default function AdminLocationScreen() {
//   const [searchEmail, setSearchEmail] = useState("");
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   const handleSearch = async () => {
//     const q = query(collection(db, "locations"), where("email", "==", searchEmail));
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//       const data = querySnapshot.docs[0].data();
//       setLocation({ latitude: data.latitude, longitude: data.longitude });
//     } else {
//       Alert.alert("해당 학생의 위치 정보를 찾을 수 없습니다.");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TextInput
//         placeholder="학생 이메일 입력"
//         value={searchEmail}
//         onChangeText={setSearchEmail}
//         style={{ borderWidth: 1, margin: 10, padding: 8 }}
//       />
//       <Button title="위치 검색" onPress={handleSearch} />

//       {location ? (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             ...location,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={location} title={searchEmail} />
//         </MapView>
//       ) : (
//         <Text style={{ textAlign: "center", marginTop: 20 }}>위치를 검색하세요.</Text>
//       )}
//     </View>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button } from "react-native";
// import { db } from "./firebase/firebaseConfig";
// import { doc, onSnapshot } from "firebase/firestore";

// export default function AdminLocationScreen() {
//   const [uid, setUid] = useState("");
//   const [location, setLocation] = useState<any>(null);

//   const startTracking = () => {
//     const ref = doc(db, "locations", uid);
//     onSnapshot(ref, (snap) => {
//       if (snap.exists()) {
//         setLocation(snap.data());
//       } else {
//         setLocation(null);
//       }
//     });
//   };

//   return (
//     <View>
//       <Text>학생 UID 입력</Text>
//       <TextInput value={uid} onChangeText={setUid} placeholder="학생 UID" />
//       <Button title="실시간 추적 시작" onPress={startTracking} />

//       {location ? (
//         <Text>
//           위치: {location.latitude}, {location.longitude}
//         </Text>
//       ) : (
//         <Text>위치 정보 없음</Text>
//       )}
//     </View>
//   );
// }


// src/screens/Admin/AdminLocationScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { RouteProp, useRoute } from "@react-navigation/native";
// import { RootStackParamList } from "../../navigation/types";
// import { collection, query, where, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase/firebaseConfig";

// type Route = RouteProp<RootStackParamList, "AdminLocation">;

// export default function AdminLocationScreen() {
//   const { params } = useRoute<Route>();
//   const { email } = params;

//   const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

//   useEffect(() => {
//     // users 콜렉션에서 해당 email 가진 문서를 실시간 구독
//     const q = query(collection(db, "users"), where("email", "==", email));
//     const unsub = onSnapshot(q, (snap) => {
//       if (snap.empty) return;
//       const data = snap.docs[0].data() as any;
//       if (data.location?.latitude && data.location?.longitude) {
//         setCoords({ latitude: data.location.latitude, longitude: data.location.longitude });
//       }
//     });
//     return unsub;
//   }, [email]);

//   return (
//     <View style={{ flex: 1 }}>
//       <Text style={styles.info}>{email} 님의 실시간 위치</Text>
//       {coords ? (
//         <MapView
//           style={styles.map}
//           region={{
//             latitude: coords.latitude,
//             longitude: coords.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={coords} title={`${email} 위치`} />
//         </MapView>
//       ) : (
//         <View style={styles.center}><Text>위치 정보를 불러오는 중…</Text></View>
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   info: { textAlign: "center", padding: 8, fontWeight: "600" },
//   map: { flex: 1 },
//   center: { flex: 1, alignItems: "center", justifyContent: "center" },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getDatabase, ref, onValue } from "firebase/database";

async function requestLocationPermission() {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "위치 권한 요청",
          message: "실시간 위치 확인을 위해 위치 권한이 필요합니다.",
          buttonNeutral: "나중에",
          buttonNegative: "취소",
          buttonPositive: "허용",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

export default function AdminLocationScreen() {
  const [users, setUsers] = useState<{ id: string; latitude: number; longitude: number }[]>([]);

  useEffect(() => {
    (async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const db = getDatabase();
      const userRef = ref(db, "locations");

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const parsed = Object.keys(data).map((key) => ({
            id: key,
            latitude: data[key].latitude,
            longitude: data[key].longitude,
          }));
          setUsers(parsed);
        }
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5665,
          longitude: 126.9780,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {users.map((user) => (
          <Marker
            key={user.id}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            title={`사용자: ${user.id}`}
          />
        ))}
      </MapView>
      {users.length === 0 && <Text>사용자 위치를 불러오는 중...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});