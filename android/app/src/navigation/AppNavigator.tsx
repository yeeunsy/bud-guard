// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SignUpScreen from '../screens/SignUpScreen';
// import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// ---------------------------------------- //
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from "../screens/Auth/LoginScreen";
// import SignupScreen from "../screens/Auth/RegisterScreen";
// import AdminScreen from "../screens/Admin/AdminScreen";
// import UserScreen from "../screens/User/UserScreen";
// import { useAuth } from "../hooks/useAuth";

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   const { user, role, loading } = useAuth();

//   if (loading) return null; // 로딩 중일 때 빈 화면

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           role === "admin" ? (
//             <Stack.Screen name="Admin" component={AdminScreen} />
//           ) : (
//             <Stack.Screen name="User" component={UserScreen} />
//           )
//         ) : (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Signup" component={SignupScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// --------------------------------- //
// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import LoginScreen from "../screens/Auth/LoginScreen";
// import RegisterScreen from "../screens/Auth/RegisterScreen";
// import UserScreen from "../screens/User/UserScreen";
// import AdminScreen from "../screens/Admin/AdminScreen";

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="UserHome" component={UserScreen} />
//         <Stack.Screen name="AdminHome" component={AdminScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import { RootStackParamList } from "../../src/navigation/types";
// // Auth Screens
// import LoginScreen from "../screens/Auth/LoginScreen";
// import SignupScreen from "../screens/Auth/RegisterScreen.tsx";

// // User Screens
// import UserScreen from "../screens/User/UserScreen";
// import UserLocationScreen from "../screens/User/UserLocationScreen.tsx";

// // Admin Screens
// import AdminScreen from "../screens/Admin/AdminScreen";
// import AdminLocationScreen from "../screens/Admin/AdminLocationScreen";

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
//         {/* 인증 */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />

//         {/* 유저 */}
//         <Stack.Screen name="UserScreen" component={UserScreen} />
//         <Stack.Screen name="UserLocation" component={UserLocationScreen} />

//         {/* 관리자 */}
//         <Stack.Screen name="AdminScreen" component={AdminScreen} />
//         <Stack.Screen name="AdminLocation" component={AdminLocationScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import type { RootStackParamList } from "./types";

// Auth
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/RegisterScreen.tsx";
// User
import UserScreen from "../screens/User/UserScreen";
import UserLocationScreen from "../screens/User/UserLocationScreen";
// Admin
import AdminScreen from "../screens/Admin/AdminScreen";
import AdminLocationScreen from "../screens/Admin/AdminLocationScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "로그인" }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "회원가입" }} />
        {/* User */}
        <Stack.Screen name="User" component={UserScreen} options={{ title: "유저" }} />
        <Stack.Screen name="UserLocation" component={UserLocationScreen} options={{ title: "내 위치" }} />
        {/* Admin */}
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: "관리자" }} />
        <Stack.Screen name="AdminLocation" component={AdminLocationScreen} options={{ title: "학생 위치" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}