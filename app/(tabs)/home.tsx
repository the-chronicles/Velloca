import { Image, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("@/assets/images/vellocaicon.png")}
        className="w-12 h-12 mb-4"
      />
      <Text className="text-2xl font-bold">Welcome to Velloca Home Screen</Text>
    </View>
  );
}
