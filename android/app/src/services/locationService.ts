import * as Location from "expo-location";
import { Alert } from "react-native";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


export const requestLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("위치 권한이 필요합니다!");
    return null;
  }
  return true;
};

export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};
export async function updateMyLocation(latitude: number, longitude: number) {
  const user = auth.currentUser;
  if (!user) return;
  await updateDoc(doc(db, "users", user.uid), {
    location: { latitude, longitude, updatedAt: Date.now() },
  });
}