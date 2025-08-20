import React, { useEffect, useState } from "react";
import { View, Text, Button, PermissionsAndroid, Platform, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const UserLocationScreen: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한",
            message: "앱에서 위치를 사용하려면 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "취소",
            buttonPositive: "확인",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // 위치 가져오기
  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("위치 권한이 거부되었습니다.");
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Firestore에 위치 업데이트
        const user = getAuth().currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          await updateDoc(userDoc, {
            location: {
              latitude,
              longitude,
              updatedAt: serverTimestamp(),
            },
          });
        }
      },
      (error) => {
        console.error(error);
        Alert.alert("위치를 가져올 수 없습니다.", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button title="내 위치 가져오기" onPress={getLocation} />
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="내 위치" />
        </MapView>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>위치를 가져오는 중...</Text>
      )}
    </View>
  );
};

export default UserLocationScreen;