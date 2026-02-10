import { useRouter } from "expo-router";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

export default function YouAreSet() {
  const router = useRouter();

  const goHome = () => {
    router.replace("/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 px-6 pt-20 pb-8 justify-between">
        <View className="items-center">
          <Image
            source={require("@/assets/images/vellocaicon.png")}
            className="w-12 h-12 mb-8"
          />
        </View>

        <View className="flex-1 mb-10 ">
          <View className="flex-1 items-center justify-center">
            <Image
              source={require("@/assets/images/Wallet.png")}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <View className="items-center px-6 mb-10">
            <Text className="text-4xl font-saans text-center mb-3">
              You’re All Set!
            </Text>

            <Text className="text-gray-400 text-lg font-saans text-center">
              Welcome to Velloca, John Doe
            </Text>
          </View>
        </View>

        <View className="gap-4">
          <Pressable
            onPress={goHome}
            className="bg-[#211FFE] py-5 rounded-full"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Connect bank account
            </Text>
          </Pressable>

          <Pressable onPress={goHome} className="bg-gray-200 py-5 rounded-full">
            <Text className="text-black text-center text-lg font-medium">
              Next
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
