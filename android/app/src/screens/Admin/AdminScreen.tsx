// import React from "react";
// import { View, Text, Button } from "react-native";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { auth, db } from "../../firebase/firebaseConfig";


// export default function AdminScreen() {
//   // 로그아웃
//   const handleLogout = async () => {
//     await signOut(auth);
//   };
//   return (
//     <View>
//       <Text>관리자 전용 화면</Text>

//       <Button title="로그아웃" onPress={handleLogout} />

//     </View>
//   );
// }

// ---------------------- //
// import React from "react";
// import { View, Text } from "react-native";

// export default function AdminHomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>관리자 전용 화면</Text>
//     </View>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { db } from "../../firebase/firebaseConfig";
// import { collection, query, where, getDocs, doc, onSnapshot } from "firebase/firestore";

// export default function AdminScreen() {
//   const [search, setSearch] = useState("");
//   const [results, setResults] = useState<any[]>([]);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [userLocation, setUserLocation] = useState<any>(null);

//   const handleSearch = async () => {
//     const q = query(collection(db, "users"), where("email", "==", search));
//     const snap = await getDocs(q);
//     setResults(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//   };

//   const watchUserLocation = (userId: string) => {
//     const unsub = onSnapshot(doc(db, "users", userId), (docSnap) => {
//       if (docSnap.exists()) {
//         setUserLocation(docSnap.data().location);
//       }
//     });
//     return unsub;
//   };

//   useEffect(() => {
//     let unsub: any;
//     if (selectedUser) {
//       unsub = watchUserLocation(selectedUser.id);
//     }
//     return () => unsub && unsub();
//   }, [selectedUser]);

//   return (
//     <View style={{ flex: 1 }}>
//       <TextInput
//         placeholder="학생 이메일 검색"
//         value={search}
//         onChangeText={setSearch}
//         onSubmitEditing={handleSearch}
//         style={{ borderWidth: 1, margin: 10, padding: 8 }}
//       />

//       <FlatList
//         data={results}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => setSelectedUser(item)}>
//             <Text style={{ padding: 10 }}>{item.email}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       {userLocation && (
//         <MapView
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker coordinate={userLocation} title={selectedUser?.email} />
//         </MapView>
//       )}
//     </View>
//   );
// }

// src/screens/Admin/AdminScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

type Nav = StackNavigationProp<RootStackParamList, "Admin">;

export default function AdminScreen() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관리자 메인 화면</Text>
      <Button
        title="위치 확인"
        onPress={() => navigation.navigate("AdminLocation", { email: email.trim() })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
});