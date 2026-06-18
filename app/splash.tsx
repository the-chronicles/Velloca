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
    <View className="flex-1 items-center justify-center bg-[#211FFE]">
      <Image
        source={require("../assets/images/splashscreen-icon.png")}
        className="w-[120px] h-[120px]"
        resizeMode="contain"
      />
    </View>
  );
}
