import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function VerifyEmail() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold mb-2">
        Verify your email
      </Text>
      <Text className="text-gray-500 mb-6">
        We sent a 6-digit code to name@email.com
      </Text>

      <View className="flex-row justify-between mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <TextInput
            key={i}
            maxLength={1}
            keyboardType="number-pad"
            className="w-12 h-12 border border-gray-300 rounded-xl text-center text-lg"
          />
        ))}
      </View>

      <Text className="text-center text-gray-400 mb-6">
        Resend code in 00:25
      </Text>

      <Pressable
        className="bg-blue-600 py-4 rounded-xl"
        onPress={() => router.push("/(profile-onboarding)/usage")}
      >
        <Text className="text-white text-center font-semibold">
          Continue
        </Text>
      </Pressable>
    </View>
  );
}
