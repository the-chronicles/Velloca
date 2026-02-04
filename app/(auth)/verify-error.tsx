import { View, Text, Pressable } from "react-native";

export default function VerifyError() {
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold text-red-600 mb-2">
        Incorrect code entered
      </Text>
      <Text className="text-gray-500 mb-6">
        Please check the code and try again.
      </Text>

      <Pressable className="bg-blue-600 py-4 rounded-xl">
        <Text className="text-white text-center font-semibold">
          Retry
        </Text>
      </Pressable>
    </View>
  );
}
