// app/(kyc)/verification-in-progress.tsx
import { useRouter } from "expo-router";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

export default function VerificationInProgress() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-white px-6 pt-20 pb-8 justify-between">
        {/* Center content */}
        <View className=" items-center justify-center">
          <Image
            source={require("@/assets/images/verification.png")}
            className="w-72 h-72 mb-10"
            resizeMode="contain"
          />

          <Text className="text-4xl font-saans text-center mb-5">
            Your verification is in progress.
          </Text>

          <Text className="text-[#A3A3A3] font-saans text-lg text-center  px-4">
            We&apos;re currently processing your KYC verification.
            {"\n"}
            You&apos;ll get an update as soon as it&apos;s approved or
            {"\n"}
            rejected. Have fun using Velloca!
          </Text>
        </View>

        {/* Fixed bottom button */}
        <Pressable
          onPress={() => router.replace("/(tabs)/home")}
          className="bg-[#211FFE] py-5 rounded-full"
        >
          <Text className="text-white text-center font-saans text-xl">
            Back to home
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
