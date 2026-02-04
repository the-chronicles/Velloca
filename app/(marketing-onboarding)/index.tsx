import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function OnboardingOne() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-16 justify-between">
      <View>
        <Text className="text-3xl font-bold mb-4">Budget for what matters</Text>
        <Text className="text-gray-500">
          Create specific values for your goals. Set a hard limit for each and
          we handle the rest.
        </Text>
      </View>

      <Image
        source={require("../../assets/images/onboarding1.png")}
        className="w-full h-64"
      />

      {/* Pagination */}
      <View className="flex-row justify-center gap-2 mb-6">
        <View className="w-6 h-2 rounded-full bg-blue-600" />
        <View className="w-2 h-2 rounded-full bg-gray-300" />
      </View>

      <View className="gap-4">
        <Pressable
          className="bg-blue-600 py-4 rounded-xl"
          onPress={() => router.push("/(auth)/get-started")}
        >
          <Text className="text-white text-center font-semibold">
            Create account
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(auth)/get-started")}>
          <Text className="text-center text-blue-600 font-medium">Log in</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(marketing-onboarding)/second")}
        >
          <Text className="text-center text-gray-400 text-sm">Swipe →</Text>
        </Pressable>
      </View>
    </View>
  );
}
