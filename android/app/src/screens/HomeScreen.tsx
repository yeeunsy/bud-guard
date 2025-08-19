// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import auth from '@react-native-firebase/auth';

// export default function HomeScreen({ route, navigation }: any) {
//   const { role } = route.params;

//   const handleLogout = async () => {
//     await auth().signOut();
//     navigation.replace('Login');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>환영합니다! 현재 역할: {role}</Text>
//       {role === 'student' ? (
//         <Text>👉 학생용 화면</Text>
//       ) : (
//         <Text>👉 일반인(교사/보호자)용 화면</Text>
//       )}
//       <Button title="로그아웃" onPress={handleLogout} />
//     </View>
//   );
// }

// ------------------------------ //

import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function HomeScreen() {
  return (
    <View>
      <Text>홈 화면</Text>
      <Button title="로그아웃" onPress={() => auth.signOut()} />
    </View>
  );
}