import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Onboarding() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const insets = useSafeAreaInsets();

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(index);
  };

  return (
    <View className="flex-1 bg-white">

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >

        <ImageBackground
          source={require("../../assets/images/o1.png")}
          style={{ width, height: "100%" }}
          imageStyle={{
            resizeMode: "contain",
            width: "100%",
            height: "125%",
            position: "absolute",
            bottom: 0,
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            locations={[0, 0.6, 0.75]}
            style={{
              flex: 1,
              paddingTop: insets.top + 50,
              paddingHorizontal: 24,
            }}
          >
            <Text className="text-[38px] font-saans font-semibold text-black leading-[44px]">
              Budget for what{"\n"}matters
            </Text>
          </LinearGradient>
        </ImageBackground>


        <ImageBackground
          source={require("../../assets/images/o2.png")}
          style={{ width, height: "100%" }}
          imageStyle={{
            resizeMode: "contain",
            width: "100%",
            height: "90%",
            position: "absolute",
            top: 200,
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            locations={[0, 0.6, 0.75]}
            style={{
              flex: 1,
              paddingTop: insets.top + 50,
              paddingHorizontal: 24,
            }}
          >
            <Text className="text-[38px] font-saans font-semibold text-black leading-[44px] tracking-tight">
              Total control, in real-{"\n"}time.
            </Text>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>


      <View
        style={{
          position: "absolute",
          top: insets.top + 4,
          left: 24,
          right: 24,
        }}
        pointerEvents="none"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-32 h-8"
          resizeMode="contain"
          style={{ alignSelf: "flex-start" }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 8,
          left: 32,
          right: 32,
        }}
      >

        <View className="flex-row gap-4 mb-5">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")}
            className="flex-1 bg-[#F0F0F0] py-[18px] rounded-full"
            activeOpacity={0.8}
          >
            <Text className="text-black text-center font-semibold text-base">
              Log in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity

            onPress={() => router.push("/(auth)/get-started")}
            className="flex-1 bg-[#211FFE] py-[18px] rounded-full"
            activeOpacity={0.9}
          >
            <Text className="text-white text-center font-semibold text-base">
              Open Account
            </Text>
          </TouchableOpacity>
        </View>


        <Text className="text-[#8A8A8A] font-saans text-[13px] text-center leading-5 px-4">
          By continuing, you agree to accept our{"\n"}Terms of Use and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
