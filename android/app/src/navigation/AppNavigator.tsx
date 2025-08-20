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