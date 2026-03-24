// app/(kyc)/bvn-verification.tsx
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
import RemixIcon from "react-native-remix-icon";

export default function BvnVerification() {
  const router = useRouter();
  const [bvn, setBvn] = useState("");

  const isValid = /^\d{11}$/.test(bvn);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-white">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-16">
            {/* Back */}
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
            >
              <RemixIcon name="arrow-left-line" size={22} color="#111827" />
            </Pressable>

            {/* Title */}
            <Text className="text-4xl font-saans text-black mb-2">
              Verify Your BVN
            </Text>

            <Text className="text-[#A3A3A3] font-saans text-lg leading-8 mb-8">
              Enter your 11-digit Bank Verification Number
            </Text>

            {/* Info card */}
            <View className="bg-[#F7F7F7] rounded-[28px] px-6 py-6 mb-8">
              <View className="flex-row items-start gap-3 mb-4">
                <RemixIcon name="information-fill" size={22} color="#5B5B5B" />
                <Text className="text-black font-saans text-2xl font-semibold flex-1">
                  Why do we need your BVN?
                </Text>
              </View>

              <Text className="text-[#A3A3A3] font-saans text-lg leading-8">
                We use your BVN to verify your identity and comply with Nigerian
                financial regulations. Your BVN is encrypted and stored
                securely.
              </Text>
            </View>

            {/* BVN input */}
            <TextInput
              value={bvn}
              onChangeText={(text) => setBvn(text.replace(/\D/g, ""))}
              placeholder="Bank Verification Number"
              placeholderTextColor="#A3A3A3"
              keyboardType="number-pad"
              maxLength={11}
              className="bg-[#F7F7F7] rounded-2xl px-5 py-5 text-xl font-saans mb-4"
            />

            <Text
              className={`font-saans text-lg ${
                bvn.length === 0
                  ? "text-[#A3A3A3]"
                  : isValid
                    ? "text-green-600"
                    : "text-red-500"
              }`}
            >
              Your 11-digits BVN
            </Text>
          </View>
        </ScrollView>

        {/* Fixed bottom button */}
        <View className="absolute left-6 right-6 bottom-8">
          <Pressable
            disabled={!isValid}
            onPress={() => router.push("/(kyc)/verification-in-progress")}
            className={`py-5 rounded-full ${
              isValid ? "bg-[#211FFE]" : "bg-[#EAEAEA]"
            }`}
          >
            <Text
              className={`text-center font-saans text-xl ${
                isValid ? "text-white" : "text-[#A3A3A3]"
              }`}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
