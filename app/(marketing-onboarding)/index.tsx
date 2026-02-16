import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Onboarding() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setPage(index);
  };

  return (
    <View className="flex-1 bg-white ">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={{ width }} className="px-6 py-16 flex-1">
          <View className="items-center">
            <Image
              source={require("../../assets/images/logo.png")}
              className="w-32 h-12 mb-2"
              resizeMode="contain"
            />

            <Text className="text-4xl font-saans font-semibold text-center mb-2">
              Budget for what matters
            </Text>

            <Text className="text-[#8A8A8A] font-saans px-4 text-lg text-center leading-6">
              Create specific values for your goals. Set a hard limit for each
              and we handle the rest.
            </Text>
          </View>

          <View className="flex-1 justify-center">
            <Image
              source={require("../../assets/images/oth-2.png")}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={{ width }} className="px-6 py-16 justify-between flex-1">
          <View className="items-center">
            <Image
              source={require("../../assets/images/logo.png")}
              className="w-32 h-12 mb-6"
              resizeMode="contain"
            />

            <Text className="text-[38px] font-saans font-semibold text-center mb-2">
              Total control, in real-time
            </Text>

            <Text className="text-[#8A8A8A] font-saans text-lg px-10 text-center leading-6">
              Stop checking your balance after you spend. Velloca blocks the
              overspend before it happens
            </Text>
          </View>

          <View className="flex-1 justify-center">
            <Image
              source={require("../../assets/images/oth.png")}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      <View className="flex-row justify-center gap-2 mb-10">
        {[0, 1].map((i) => (
          <View
            key={i}
            className={`h-2 rounded-full transition-all ${
              page === i ? "w-6 bg-[#f0f0f0]" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </View>

      <View className="flex-row gap-4 px-6 pb-5">
        <View className="flex-1">
          <View
            className="bg-[#F0F0F0] py-5 rounded-full"
            onTouchEnd={() => router.push("/(auth)/get-started")}
          >
            <Text className="text-black text-center font-medium">Log in</Text>
          </View>
        </View>

        <View className="flex-1">
          <View
            className="bg-[#211FFE] py-5 rounded-full"
            // onTouchEnd={() => router.push("/(auth)/get-started")}
            onTouchEnd={() => router.push("/(tabs)/home")}
          >
            <Text className="text-white text-center font-semibold">
              Open Account
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-[#8A8A8A] font-saans text-base text-center px-20 pb-6">
        By continuing, you agree to accept our Terms of Use and Privacy Policy
      </Text>
    </View>
  );
}
