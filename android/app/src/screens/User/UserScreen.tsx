// src/screens/User/UserScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";

type Nav = StackNavigationProp<RootStackParamList, "User">;

export default function UserScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>유저 메인 화면</Text>
      <Button title="내 위치 확인" onPress={() => navigation.navigate("UserLocation")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
});