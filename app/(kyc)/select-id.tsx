import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKycStore } from "../store/kyc-store";

const ID_OPTIONS = [
  {
    id: "passport",
    label: "International Passport",
    icon: "contacts-book-fill",
  },
  {
    id: "license",
    label: "Driver’s License",
    icon: "id-card-fill",
  },
  {
    id: "voters-card",
    label: "Voter’s ID Card",
    icon: "user-3-fill",
  },
];

export default function SelectId() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { frontImage, backImage, setFrontImage, setBackImage } = useKycStore();

  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (frontImage || backImage) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [frontImage, backImage]);

  const openModal = () => {
    setShowModal(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 10,
    }).start();
  };

  const closeModal = (callback?: () => void) => {
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowModal(false);
      if (callback) callback();
    });
  };

  const handleSelect = (id: string) => {
    closeModal(() => {
      setSelectedId(id);
    });
  };

  const selectedOption = ID_OPTIONS.find((o) => o.id === selectedId);
  const isContinueActive = !!selectedId && !!frontImage && !!backImage;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: Math.max(140, insets.bottom + 120),
          paddingTop: insets.top + 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6">
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#F5F5F5] items-center justify-center mb-6"
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
          </Pressable>

          {/* Heading Section */}
          <Text className="text-[28px] font-saans font-bold text-black mb-2">
            Select ID type
          </Text>

          <Text className="text-[#9E9E9E] text-[16px] font-saans mb-8 leading-[22px]">
            We need a clear photo of a government-issued ID.
          </Text>

          {/* Trigger Dropdown Input */}
          <Pressable
            onPress={openModal}
            className="flex-row items-center justify-between px-5 py-4 rounded-2xl bg-[#F7F7F7] border border-transparent"
            style={{ minHeight: 56 }}
          >
            <Text
              className={`font-saans text-[16px] ${selectedId ? "text-black font-semibold" : "text-[#A3A3A3]"
                }`}
            >
              {selectedOption ? selectedOption.label : "Select ID type"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#707070" />
          </Pressable>

          {/* Upload Section - Shows only when ID type is selected */}
          {selectedId && (
            <View>
              {/* Thin Divider Line */}
              <View className="h-[1px] bg-[#F0F0F0] my-6" />

              {/* Upload Title */}
              <Text className="text-[18px] font-saans font-bold text-black mb-5">
                Upload ID
              </Text>

              {/* Front of ID */}
              <View className="mb-4">
                <Text className="text-[#9E9E9E] text-[13px] font-saans font-semibold mb-2">
                  Front of ID
                </Text>

                {frontImage ? (
                  <View className="bg-[#F7F7F7] rounded-[20px] px-5 py-4 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <RemixIcon
                        name="checkbox-circle-fill"
                        size={20}
                        color="#22C55E"
                        className="mr-3"
                      />
                      <Text className="text-black font-saans font-semibold text-[15px]">
                        Front of ID uploaded
                      </Text>
                    </View>
                    <Pressable onPress={() => setFrontImage(null)} className="p-1">
                      <RemixIcon
                        name="delete-bin-6-line"
                        size={20}
                        color="#EF4444"
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => router.push("/(kyc)/camera?side=front")}
                    className="bg-[#F7F7F7] rounded-[20px] py-10 items-center justify-center"
                  >
                    <RemixIcon
                      name="upload-cloud-line"
                      size={26}
                      color="#6B7280"
                      className="mb-1.5"
                    />
                    <Text className="text-black font-saans font-semibold text-[15px] mb-0.5">
                      Upload Front of ID
                    </Text>
                    <Text className="text-[#9E9E9E] font-saans text-[13px]">
                      Tap to capture
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Back of ID */}
              <View className="mb-4">
                <Text className="text-[#9E9E9E] text-[13px] font-saans font-semibold mb-2">
                  Back of ID
                </Text>

                {backImage ? (
                  <View className="bg-[#F7F7F7] rounded-[20px] px-5 py-4 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <RemixIcon
                        name="checkbox-circle-fill"
                        size={20}
                        color="#22C55E"
                        className="mr-3"
                      />
                      <Text className="text-black font-saans font-semibold text-[15px]">
                        Back of ID uploaded
                      </Text>
                    </View>
                    <Pressable onPress={() => setBackImage(null)} className="p-1">
                      <RemixIcon
                        name="delete-bin-6-line"
                        size={20}
                        color="#EF4444"
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => router.push("/(kyc)/camera?side=back")}
                    className="bg-[#F7F7F7] rounded-[20px] py-10 items-center justify-center"
                  >
                    <RemixIcon
                      name="upload-cloud-line"
                      size={26}
                      color="#6B7280"
                      className="mb-1.5"
                    />
                    <Text className="text-black font-saans font-semibold text-[15px] mb-0.5">
                      Upload Back of ID
                    </Text>
                    <Text className="text-[#9E9E9E] font-saans text-[13px]">
                      Tap to capture
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Toast Notification */}
      {showToast && (
        <View
          className="absolute self-center bg-white border border-[#EAEAEA] rounded-2xl px-5 py-4 flex-row items-center shadow-sm z-50"
          style={{ bottom: Math.max(100, insets.bottom + 84) }}
        >
          <RemixIcon
            name="checkbox-circle-fill"
            size={18}
            color="#22C55E"
            className="mr-3"
          />
          <Text className="text-black font-saans text-base font-semibold">
            File uploaded successfully
          </Text>
        </View>
      )}

      {/* Continue Button */}
      <View
        className="absolute left-6 right-6"
        style={{ bottom: Math.max(24, insets.bottom + 8) }}
      >
        <Pressable
          disabled={!isContinueActive}
          onPress={() => router.push("/(kyc)/selfie")}
          className={`h-14 rounded-full items-center justify-center ${isContinueActive ? "bg-[#211FFE]" : "bg-[#F5F5F5]"
            }`}
        >
          <Text
            className={`font-saans font-semibold text-[17px] ${isContinueActive ? "text-white" : "text-[#B0B0B0]"
              }`}
          >
            Continue
          </Text>
        </Pressable>
      </View>

      {/* Choose ID Bottom Sheet Modal */}
      <Modal transparent visible={showModal} animationType="none">
        <View className="flex-1 justify-end">
          {/* Dimmed Background Overlay */}
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={() => closeModal()}
          />

          {/* Slide Up Content Container */}
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
              paddingBottom: Math.max(32, insets.bottom + 16),
            }}
            className="bg-white rounded-t-[32px] px-6 pt-3"
          >
            {/* Grab Handle */}
            <View className="w-12 h-1 bg-[#EBEBEB] rounded-full mx-auto mb-6" />

            {/* Modal Title */}
            <Text className="text-[20px] font-saans font-bold text-black mb-6">
              Choose ID
            </Text>

            {/* Options List */}
            <View className="gap-3">
              {ID_OPTIONS.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleSelect(item.id)}
                  className="flex-row items-center py-2"
                >
                  <View className="w-11 h-11 rounded-full bg-[#F5F5F5] items-center justify-center mr-4">
                    <RemixIcon
                      name={item.icon as any}
                      size={20}
                      color="#111827"
                    />
                  </View>

                  <Text className="text-[17px] font-saans font-semibold text-black">
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
