import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LetsGetStarted() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold mb-2">
        Let’s get started
      </Text>
      <Text className="text-gray-500 mb-6">
        Enter your email to continue
      </Text>

      <Pressable className="border border-gray-300 py-4 rounded-xl mb-4">
        <Text className="text-center font-medium">
          Continue with Google
        </Text>
      </Pressable>

      <Text className="text-center text-gray-400 mb-4">
        OR
      </Text>

      <TextInput
        placeholder="Email address"
        keyboardType="email-address"
        className="border border-gray-300 rounded-xl px-4 py-4 mb-6"
      />

      <Pressable
        className="bg-blue-600 py-4 rounded-xl"
        onPress={() => router.push("/(auth)/verify-email")}
      >
        <Text className="text-white text-center font-semibold">
          Get Started
        </Text>
      </Pressable>

      <Pressable className="mt-6">
        <Text className="text-center text-gray-500">
          Already have an account?{" "}
          <Text className="text-blue-600">Log in</Text>
        </Text>
      </Pressable>
    </View>
  );
}
