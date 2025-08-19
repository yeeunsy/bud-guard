// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const userCredential = await auth().signInWithEmailAndPassword(email, password);
//       const userDoc = await firestore().collection('users').doc(userCredential.user.uid).get();

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         navigation.replace('Home', { role: userData?.role });
//       } else {
//         Alert.alert('오류', '사용자 데이터가 존재하지 않습니다.');
//       }
//     } catch (error: any) {
//       Alert.alert('로그인 실패', error.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>로그인</Text>
//       <TextInput placeholder="이메일" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
//       <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
//       <Button title="로그인" onPress={handleLogin} />
//       <Button title="회원가입 화면으로" onPress={() => navigation.navigate('SignUp')} />
//     </View>
//   );
// }

// ------------------------------ //
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/firebaseConfig";

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error: any) {
//       console.log(error.message);
//       Alert.alert("로그인 실패: " + error.message);
//     }
//   };

//   return (
//     <View>
//       <Text>로그인</Text>
//       <TextInput placeholder="이메일" value={email} onChangeText={setEmail} />
//       <TextInput
//         placeholder="비밀번호"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="로그인" onPress={login} />
//       <Button title="회원가입" onPress={() => navigation.navigate("Signup")} />
//     </View>
//   );
// }


// ----------------------------------- //

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert } from "react-native";
// import { auth, db } from "../../firebase/firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const { role } = userDoc.data();

//         if (role === "user") {
//           navigation.replace("UserHome");
//         } else if (role === "admin") {
//           navigation.replace("AdminHome");
//         } else {
//           Alert.alert("오류", "알 수 없는 역할입니다.");
//         }
//       } else {
//         Alert.alert("오류", "사용자 데이터가 없습니다.");
//       }
//     } catch (error: any) {
//       Alert.alert("로그인 실패", error.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>로그인</Text>
//       <TextInput placeholder="이메일" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
//       <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />

//       <Button title="로그인" onPress={handleLogin} />
      
//       <Button title="회원가입" onPress={() => navigation.navigate("Register")} />
//     </View>
//   );
// }

// src/screens/Auth/LoginScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";

type Nav = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      if (!current) return;
      const snap = await getDoc(doc(db, "users", current.uid));
      const role = snap.exists() ? (snap.data().role as "user" | "admin") : "user";
      navigation.reset({ index: 0, routes: [{ name: role === "admin" ? "Admin" : "User" }] });
    });
    return unsub;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />
      <Button
        title="로그인"
        onPress={async () => {
          try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
          } catch (e: any) {
            Alert.alert("로그인 실패", e.message);
          }
        }}
      />
      <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.navigate("Signup")}>
        <Text>회원가입 하러가기</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 10 },
});