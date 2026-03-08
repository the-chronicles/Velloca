import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

const ID_OPTIONS = [
  {
    id: "passport",
    label: "International Passport",
    icon: "passport-line",
  },
  {
    id: "license",
    label: "Driver’s License",
    icon: "id-card-line",
  },
  {
    id: "national-id",
    label: "National ID Card",
    icon: "contacts-book-2-line",
  },
  {
    id: "voters-card",
    label: "Voter’s ID Card",
    icon: "profile-line",
  },
];

export default function SelectId() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isValid = !!selectedId;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 px-6 pt-16 justify-between">
        <View>
          {/* Top */}
          <Pressable
            onPress={() => router.back()}
            className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
          >
            <RemixIcon name="arrow-left-line" size={22} color="#111827" />
          </Pressable>

          {/* Title */}
          <Text className="text-3xl font-saans text-black mb-2">
            Select ID type
          </Text>

          <Text className="text-gray-400 text-lg font-saans mb-8">
            Choose the type of government-issued ID you want to upload
          </Text>

          {/* Options card */}
          <View className="bg-[#F7F7F7] rounded-[28px] px-5 py-4">
            {ID_OPTIONS.map((item, index) => {
              const active = selectedId === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => setSelectedId(item.id)}
                  className={`flex-row items-center py-5 ${
                    index !== ID_OPTIONS.length - 1
                      ? "border-b border-transparent"
                      : ""
                  }`}
                >
                  {/* Radio */}
                  <View
                    className={`w-5 h-5 rounded-full border items-center justify-center mr-6 ${
                      active
                        ? "border-[#211FFE] bg-[#211ffe] "
                        : "border-[#D9D9D9]"
                    }`}
                  >
                    {active && (
                      <View className="w-2 h-2  rounded-full bg-white" />
                    )}
                  </View>

                  {/* Icon bubble */}
                  <View className="w-8 h-8 rounded-full bg-[#EFEFEF] items-center justify-center mr-5">
                    <RemixIcon
                      name={item.icon as any}
                      size={14}
                      color="#111827"
                    />
                  </View>

                  {/* Label */}
                  <Text className="text-black font-saans text-xl flex-1">
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Continue */}
        <Pressable
          disabled={!isValid}
          onPress={() => router.push("/(kyc)/upload-id")}
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
    </KeyboardAvoidingView>
  );
}
