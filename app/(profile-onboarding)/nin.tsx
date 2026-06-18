import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Nin() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [nin, setNin] = useState("");

  const digitCount = nin.replace(/\D/g, "").length;
  const isValid = digitCount === 11;

  const handleSkip = () => {
    router.replace("/(tabs)/home");
  };

  const handleContinue = () => {
    if (!isValid) return;
    router.replace({ pathname: "/(tabs)/home", params: { showSkeleton: "true" } });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="flex-1 px-6 pb-6 justify-between"
          style={{ paddingTop: insets.top + 12 }}
        >
          <View>
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-[#F5F5F5] items-center justify-center mb-8"
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </Pressable>

            <Text className="text-[30px] font-saans font-bold text-black leading-[38px] mb-2">
              Add your NIN
            </Text>

            <Text className="text-[#9E9E9E] text-[15px] font-saans leading-[22px] mb-8">
              We use your NIN to set up your wallet. Takes under 30 seconds.
            </Text>

            <TextInput
              value={nin}
              onChangeText={(text) => setNin(text.replace(/\D/g, ""))}
              placeholder="NIN (11 digits)"
              placeholderTextColor="#B0B0B0"
              keyboardType="number-pad"
              maxLength={11}
              className="bg-[#F5F5F5] rounded-lg px-6 py-5 text-[15px] font-saans text-black mb-3"
              style={{ padding: 0, paddingHorizontal: 24, paddingVertical: 20 }}
            />

            <Text className="text-[#9E9E9E] text-[13px] font-saans leading-[20px]">
              Don't know yours? Dial *346# from your NIN-registered line.
            </Text>
          </View>

          <View className="flex-row gap-4 mb-4">
            <Pressable
              onPress={handleSkip}
              className="flex-1 bg-[#F0F0F0] py-5 rounded-full"
            >
              <Text className="text-center font-saans text-[16px] font-semibold text-black">
                Skip for now
              </Text>
            </Pressable>

            <Pressable
              disabled={!isValid}
              onPress={handleContinue}
              className={`flex-1 py-5 rounded-full ${isValid ? "bg-[#211FFE]" : "bg-[#F0F0F0]"}`}
            >
              <Text
                className={`text-center font-saans text-[16px] font-semibold ${isValid ? "text-white" : "text-[#B0B0B0]"}`}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
