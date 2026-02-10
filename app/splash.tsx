import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(marketing-onboarding)");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../assets/images/vellocaicon.png")}
        className="w-12 h-12"
      />
    </View>
  );
}
