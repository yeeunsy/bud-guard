// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// export default function SignUpScreen({ navigation }: any) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isStudent, setIsStudent] = useState(false);

//   const handleSignUp = async () => {
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       await firestore().collection('users').doc(userCredential.user.uid).set({
//         email,
//         role: isStudent ? 'student' : 'general',
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//       Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
//       navigation.navigate('Login');
//     } catch (error: any) {
//       Alert.alert('회원가입 실패', error.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>회원가입</Text>
//       <TextInput placeholder="이메일" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
//       <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
//       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//         <Button title={isStudent ? "학생 ✅" : "학생 ❌"} onPress={() => setIsStudent(!isStudent)} />
//       </View>
//       <Button title="회원가입" onPress={handleSignUp} />
//       <Button title="로그인 화면으로" onPress={() => navigation.navigate('Login')} />
//     </View>
//   );
// }

// ------------------------------------ //

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert } from "react-native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase/firebaseConfig";

// export default function SignupScreen({ navigation }: any) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const signup = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         role: "user", // 기본값: 일반 유저
//       });
//     } catch (error: any) {
//       console.log(error.message);
//       Alert.alert("회원가입 실패: " + error.message);
//     }
//   };

//   return (
//     <View>
//       <Text>회원가입</Text>
//       <TextInput placeholder="이메일" value={email} onChangeText={setEmail} />
//       <TextInput
//         placeholder="비밀번호"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="회원가입" onPress={signup} />
//       <Button title="뒤로가기" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// -------------------------------------- //

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
// import { auth, db } from "../../firebase/firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { Checkbox, RadioButton } from "react-native-paper";

// export default function RegisterScreen({ navigation }: any) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isStudent, setIsStudent] = useState<boolean | null>(null);

//   const handleRegister = async () => {
//     if (isStudent === null) {
//       //     Alert.alert("알림", "학생 여부를 선택해주세요!");
//       setIsStudent(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // 역할 저장 (학생이면 "user", 아니면 "admin")
//       const role = isStudent ? "user" : "admin";

//       await setDoc(doc(db, "users", user.uid), {
//         email,
//         role,
//       });

//       Alert.alert("회원가입 성공", "로그인을 진행해주세요.");
//       navigation.navigate("Login");
//     } catch (error: any) {
//       Alert.alert("회원가입 실패", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>회원가입</Text>

//       <TextInput
//         placeholder="이메일"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="비밀번호"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <Text style={{ marginBottom: 10 }}>학생입니까?</Text>

//       <RadioButton.Group onValueChange={(value) => setIsStudent(value === "student")} value={isStudent ? "student" : "admin"}>
//         <View style={styles.checkboxContainer}>
//           <RadioButton value="student" />
//           <Text style={styles.checkboxLabel}>예 (학생)</Text>
//         </View>
//         <View style={styles.checkboxContainer}>
//           <RadioButton value="admin" />
//           <Text style={styles.checkboxLabel}>아니오 (관리자)</Text>
//         </View>
//       </RadioButton.Group>

//       <Button title="회원가입" onPress={handleRegister} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   checkboxLabel: {
//     fontSize: 16,
//   },
// });

// src/screens/Auth/SignupScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";

type Nav = StackNavigationProp<RootStackParamList, "Signup">;

export default function SignupScreen() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 학생입니까? 예/아니오 → 예(학생)=user, 아니오=admin
  const [isStudent, setIsStudent] = useState<boolean | null>(null);

  const create = async () => {
    if (isStudent === null) {
      Alert.alert("역할 선택", "학생 여부를 선택해 주세요.");
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const role: "user" | "admin" = isStudent ? "user" : "admin";
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        role,
        createdAt: Date.now(),
      });
      Alert.alert("회원가입 완료", "로그인 화면으로 이동합니다.");
      navigation.navigate("Login");
    } catch (e: any) {
      Alert.alert("회원가입 실패", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />

      <Text style={{ marginBottom: 8, fontWeight: "600" }}>학생입니까?</Text>
      <View style={styles.row}>
        <Pressable style={styles.checkItem} onPress={() => setIsStudent(true)}>
          <Text style={styles.checkBox}>{isStudent === true ? "☑" : "☐"}</Text>
          <Text style={styles.checkLabel}>예</Text>
        </Pressable>
        <Pressable style={styles.checkItem} onPress={() => setIsStudent(false)}>
          <Text style={styles.checkBox}>{isStudent === false ? "☑" : "☐"}</Text>
          <Text style={styles.checkLabel}>아니오</Text>
        </Pressable>
      </View>

      <Button title="회원가입" onPress={create} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 10 },
  row: { flexDirection: "row", gap: 16, marginBottom: 16 },
  checkItem: { flexDirection: "row", alignItems: "center" },
  checkBox: { fontSize: 22, marginRight: 8 },
  checkLabel: { fontSize: 16 },
});