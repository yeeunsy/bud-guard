// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { auth, db } from "./firebase/firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// export default function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState<"user" | "admin">("user");
//   const [user, setUser] = useState<any>(null);
//   const [userRole, setUserRole] = useState<string | null>(null);

//   // Firebase 인증 상태 변화 감지
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         // Firestore에서 역할(role) 가져오기
//         const docRef = doc(db, "users", currentUser.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserRole(docSnap.data().role);
//         }
//       } else {
//         setUser(null);
//         setUserRole(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // 회원가입
//   const handleSignup = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const newUser = userCredential.user;

//       // Firestore에 역할(role) 저장
//       await setDoc(doc(db, "users", newUser.uid), {
//         email: newUser.email,
//         role: role, // 기본 role (선택한 값)
//       });

//       Alert.alert("회원가입 성공!");
//     } catch (error: any) {
//       Alert.alert("회원가입 실패: " + error.message);
//     }
//   };

//   // 로그인
//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert("로그인 성공!");
//     } catch (error: any) {
//       Alert.alert("로그인 실패: " + error.message);
//     }
//   };

//   // 로그아웃
//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   // UI
//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>bud guard</Text>
//         <TextInput
//           placeholder="이메일"
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           placeholder="비밀번호"
//           secureTextEntry
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//         />

//         <View style={styles.roleContainer}>
//           <Button title="User" onPress={() => setRole("user")} />
//           <Button title="Admin" onPress={() => setRole("admin")} />
//           <Text>선택된 역할: {role}</Text>
//         </View>

//         <Button title="회원가입" onPress={handleSignup} />
//         <Button title="로그인" onPress={handleLogin} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>환영합니다, {user.email}</Text>
//       <Text>당신의 역할: {userRole}</Text>

//       {userRole === "admin" ? (
//         <Text style={styles.admin}>📢 관리자 전용 화면</Text>
//       ) : (
//         <Text style={styles.user}>🙋‍♀️ 일반 유저 화면</Text>
//       )}

//       <Button title="로그아웃" onPress={handleLogout} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 10, width: "100%", marginBottom: 10 },
//   roleContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 10 },
//   admin: { color: "red", fontWeight: "bold", marginTop: 10 },
//   user: { color: "blue", fontWeight: "bold", marginTop: 10 },
// });


// --------------------- //
import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from "../src/navigation/AppNavigator";

export default function App() {
  return (
  <PaperProvider>
    <AppNavigator />
  </PaperProvider>
  );
  
}