import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import { useKycStore } from "../store/kyc-store";
// import { useKycStore } from "@/stores/kyc-store";

export default function UploadId() {
  const router = useRouter();

  const [nin, setNin] = useState("");
  const [showToast, setShowToast] = useState(false);

  const {
    frontImage,
    backImage,
    setFrontImage,
    setBackImage,
  } = useKycStore();

  const isNinValid = /^\d{11}$/.test(nin);
  const isValid = isNinValid && !!frontImage && !!backImage;

  useEffect(() => {
    if (frontImage || backImage) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [frontImage, backImage]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-16 justify-between">
          <View>
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
            >
              <RemixIcon name="arrow-left-line" size={22} color="#111827" />
            </Pressable>

            <Text className="text-4xl font-saans text-black mb-2">
              Upload your ID
            </Text>

            <Text className="text-[#A3A3A3] font-saans text-lg leading-8 mb-8">
              Take clear photos of your national ID
            </Text>

            <TextInput
              value={nin}
              onChangeText={(text) => setNin(text.replace(/\D/g, ""))}
              placeholder="NIN ID Number"
              placeholderTextColor="#A3A3A3"
              keyboardType="number-pad"
              maxLength={11}
              className="bg-[#F7F7F7] rounded-2xl px-5 py-5 text-xl font-saans mb-4"
            />

            <Text
              className={`font-saans text-lg mb-6 ${
                nin.length === 0
                  ? "text-[#A3A3A3]"
                  : isNinValid
                    ? "text-green-600"
                    : "text-red-500"
              }`}
            >
              Your 11-digits NIN number
            </Text>

            <View className="h-px bg-[#EAEAEA] mb-8" />

            <Text className="text-[#A3A3A3] font-saans text-xl mb-4">
              Front of ID
            </Text>

            <UploadStatusCard
              uploaded={!!frontImage}
              label="Front of ID uploaded"
              emptyTitle="Upload Front of ID"
              onPress={() => router.push("/(kyc)/camera?side=front")}
              onDelete={() => setFrontImage(null)}
            />

            <Text className="text-[#A3A3A3] font-saans text-xl mt-8 mb-4">
              Back of ID
            </Text>

            <UploadStatusCard
              uploaded={!!backImage}
              label="Back of ID uploaded"
              emptyTitle="Upload Back of ID"
              onPress={() => router.push("/(kyc)/camera?side=back")}
              onDelete={() => setBackImage(null)}
            />
          </View>

          <View className="mt-10">
            {showToast && (
              <View className="self-center mb-6 bg-white border border-[#EAEAEA] rounded-2xl px-5 py-4 flex-row items-center gap-3 shadow-sm">
                <RemixIcon name="checkbox-circle-fill" size={18} color="#22C55E" />
                <Text className="text-black font-saans text-base">
                  File uploaded successfully
                </Text>
              </View>
            )}

            <Pressable
              disabled={!isValid}
              onPress={() => router.push("/(kyc)/selfie")}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function UploadStatusCard({
  uploaded,
  label,
  emptyTitle,
  onPress,
  onDelete,
}: {
  uploaded: boolean;
  label: string;
  emptyTitle: string;
  onPress: () => void;
  onDelete: () => void;
}) {
  if (uploaded) {
    return (
      <View className="bg-[#F7F7F7] rounded-[24px] px-6 py-6 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <RemixIcon name="checkbox-circle-fill" size={20} color="#22C55E" />
          <Text className="text-black font-saans text-xl">{label}</Text>
        </View>

        <Pressable onPress={onDelete}>
          <RemixIcon name="delete-bin-6-line" size={22} color="#111827" />
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className="bg-[#F7F7F7] rounded-[28px] h-56 items-center justify-center"
    >
      <RemixIcon name="upload-cloud-line" size={34} color="#6B7280" />
      <Text className="text-black font-saans text-2xl mt-5 mb-2">
        {emptyTitle}
      </Text>
      <Text className="text-[#A3A3A3] font-saans text-xl">Tap to capture</Text>
    </Pressable>
  );
}