// app/(kyc)/selfie.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useKycStore } from "../store/kyc-store";

export default function Selfie() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const { selfieImage, setSelfieImage } = useKycStore();

  const isValid = !!selfieImage;

  useEffect(() => {
    if (selfieImage) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selfieImage]);

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
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
            >
              <RemixIcon name="arrow-left-line" size={22} color="#111827" />
            </Pressable>

            <Text className="text-4xl font-saans text-black mb-2">
              Take a photo
            </Text>

            <Text className="text-[#A3A3A3] font-saans text-lg leading-8 mb-8">
              Take clear photos of yourself
            </Text>

            {selfieImage ? (
              <View className="bg-[#F7F7F7] rounded-[28px] px-6 py-7 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <RemixIcon
                    name="checkbox-circle-fill"
                    size={22}
                    color="#22C55E"
                  />
                  <Text className="text-black font-saans text-2xl">
                    Selfie uploaded
                  </Text>
                </View>

                <Pressable onPress={() => setSelfieImage(null)}>
                  <RemixIcon
                    name="delete-bin-6-line"
                    size={22}
                    color="#111827"
                  />
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => router.push("../(kyc)/selfie-camera")}
                className="bg-[#F7F7F7] rounded-[28px] h-64 items-center justify-center"
              >
                <RemixIcon name="camera-lens-line" size={34} color="#6B7280" />
                <Text className="text-black font-saans text-2xl mt-5 mb-2">
                  Take a picture
                </Text>
                <Text className="text-[#A3A3A3] font-saans text-xl">
                  Tap to capture
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>

        {/* Fixed bottom area */}
        <View className="absolute left-6 right-6 bottom-8">
          {showToast && (
            <View className="self-center mb-6 bg-white border border-[#EAEAEA] rounded-2xl px-5 py-4 flex-row items-center gap-3 shadow-sm">
              <RemixIcon
                name="checkbox-circle-fill"
                size={20}
                color="#22C55E"
              />
              <Text className="text-black font-saans text-xl">
                Selfie uploaded successfully
              </Text>
            </View>
          )}

          <Pressable
            disabled={!isValid}
            onPress={() => router.push("../(kyc)/bvn-verification")}
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
