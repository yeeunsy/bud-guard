// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { getDatabase, ref, onValue } from "firebase/database";

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

// export default function AdminLocationScreen() {
//   const [users, setUsers] = useState<{ id: string; latitude: number; longitude: number }[]>([]);

//   useEffect(() => {
//     (async () => {
//       const hasPermission = await requestLocationPermission();
//       if (!hasPermission) return;

//       const db = getDatabase();
//       const userRef = ref(db, "locations");

//       onValue(userRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const parsed = Object.keys(data).map((key) => ({
//             id: key,
//             latitude: data[key].latitude,
//             longitude: data[key].longitude,
//           }));
//           setUsers(parsed);
//         }
//       });
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.5665,
//           longitude: 126.9780,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         {users.map((user) => (
//           <Marker
//             key={user.id}
//             coordinate={{ latitude: user.latitude, longitude: user.longitude }}
//             title={`사용자: ${user.id}`}
//           />
//         ))}
//       </MapView>
//       {users.length === 0 && <Text>사용자 위치를 불러오는 중...</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

// import React, { useState } from "react";
// import { View, TextInput, Button } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { db } from "../../firebase/firebaseConfig.ts";
// import { doc, onSnapshot } from "firebase/firestore";

// const AdminLocationScreen = () => {
//   const [email, setEmail] = useState("");
//   const [location, setLocation] = useState<any>(null);

//   const trackUser = () => {
//     if (!email) return;
//     const unsub = onSnapshot(doc(db, "locations", email), (docSnap) => {
//       if (docSnap.exists()) {
//         setLocation(docSnap.data());
//       } else {
//         setLocation(null);
//       }
//     });
//     return () => unsub();
//   };

//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       <TextInput
//         placeholder="학생 이메일 입력"
//         value={email}
//         onChangeText={setEmail}
//         style={{
//           borderWidth: 1,
//           borderColor: "gray",
//           padding: 10,
//           marginBottom: 10,
//         }}
//       />
//       <Button title="위치 추적 시작" onPress={trackUser} />

//       {location && (
//         <MapView
//           style={{ width: "100%", height: 400, marginTop: 20 }}
//           region={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title="학생 위치"
//           />
//         </MapView>
//       )}
//     </View>
//   );
// };

// export default AdminLocationScreen;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import firestore from '@react-native-firebase/firestore';

// export default function AdminLocationScreen() {
//   const [email, setEmail] = useState('');
//   const [userLocation, setUserLocation] = useState<any>(null);

//   const findUserLocation = async () => {
//     const snapshot = await firestore()
//       .collection('users')
//       .where('email', '==', email)
//       .get();

//     if (!snapshot.empty) {
//       const userData = snapshot.docs[0].data();
//       if (userData.location) {
//         setUserLocation(userData.location);
//       } else {
//         setUserLocation(null);
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TextInput
//         placeholder="유저 이메일 입력"
//         value={email}
//         onChangeText={setEmail}
//         style={{ borderWidth: 1, margin: 10, padding: 5 }}
//       />
//       <Button title="조회" onPress={findUserLocation} />

//       {userLocation ? (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}>
//           <Marker
//             coordinate={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//             }}
//             title="학생 위치"
//           />
//         </MapView>
//       ) : (
//         <Text style={{ textAlign: 'center', marginTop: 20 }}>
//           위치 정보 없음
//         </Text>
//       )}
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const AdminLocationScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Firestore에서 이메일로 유저 검색
  const searchUserByEmail = async () => {
    if (!email) {
      Alert.alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("해당 이메일을 가진 유저를 찾을 수 없습니다.");
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location) {
          setLocation({
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          });
        } else {
          Alert.alert("이 유저의 위치 정보가 없습니다.");
        }
      });
    } catch (error) {
      console.error("Firestore 검색 에러:", error);
      Alert.alert("유저 검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>유저 이메일 검색</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 8,
          borderRadius: 8,
          marginBottom: 12,
        }}
        placeholder="이메일 입력"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="유저 검색" onPress={searchUserByEmail} />

      {location && (
        <MapView
          style={{ flex: 1, marginTop: 16 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="유저 위치" />
        </MapView>
      )}
    </View>
  );
};

export default AdminLocationScreen;