import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useLocation(onLocationUpdate?: (loc: any) => void) {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("위치 권한 거부됨");
        return;
      }

      // 실시간 추적
      const subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,   // 2초마다
          distanceInterval: 1, // 1m 이동시 업데이트
        },
        (loc) => {
          setLocation(loc.coords);
          if (onLocationUpdate) onLocationUpdate(loc.coords);
        }
      );

      return () => subscriber.remove();
    })();
  }, []);

  return location;
}