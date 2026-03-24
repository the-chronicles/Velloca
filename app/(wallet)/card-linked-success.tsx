import { useRouter } from "expo-router";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function CardLinkedSuccess() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-white px-6 pt-16 pb-8 justify-between">
        <View>
          <Pressable
            onPress={() => router.back()}
            className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
          >
            <RemixIcon name="arrow-left-line" size={22} color="#111827" />
          </Pressable>
        </View>

        <View className="items-center">
          <Text className="text-black text-4xl font-saans font-semibold text-center mb-12">
            The card is successfully{"\n"}connected!
          </Text>

          <Image
            source={require("@/assets/images/success.png")}
            className="w-64 h-64 mb-12"
            resizeMode="contain"
          />

          <Text className="text-[#A3A3A3] font-saans text-center text-xl px-4 mb-12">
            Awesome! Your card is all set up. Feel free to add some funds to
            your account now.
          </Text>

          <View className="w-full items-center mb-10">
            <View className="w-full border-t border-dashed border-[#E5E5E5] mb-6" />
            <Image
              source={require("@/assets/images/vellocaicon.png")}
              className="w-8 h-8 mb-4 opacity-10"
              resizeMode="contain"
            />
            <Text className="text-[#A3A3A3] font-saans text-center text-lg  px-8">
              Your card has been securely backed up to Velloca, ensuring
              encryption and safety.
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Pressable
            onPress={() => {}}
            className="flex-1 bg-[#EAEAEA] py-5 rounded-full"
          >
            <Text className="text-center text-black font-saans text-xl">
              View Card
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/(tabs)/home")}
            className="flex-1 bg-[#211FFE] py-5 rounded-full"
          >
            <Text className="text-center text-white font-saans text-xl">
              Add Money
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
