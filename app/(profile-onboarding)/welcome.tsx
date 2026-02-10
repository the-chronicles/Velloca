import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";

const OPTIONS = [
  {
    id: "spending",
    label: "Manage my spending",
    icon: "wallet-outline",
  },
  {
    id: "budget",
    label: "Track my budgets",
    icon: "list-outline",
  },
  {
    id: "savings",
    label: "Grow my savings",
    icon: "cash-outline",
  },
  {
    id: "overspending",
    label: "Prevent overspending",
    icon: "stats-chart-outline",
  },
  {
    id: "unsure",
    label: "I'm not sure",
    icon: "help-circle-outline",
  },
];

export default function Welcome() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 px-6 pt-20 pb-6 justify-between">
        <View>
          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require("@/assets/images/vellocaicon.png")}
              className="w-12 h-12"
            />
          </View>

          <Text className="text-4xl font-saans text-center mb-2">
            Welcome to Velloca!
          </Text>

          <Text className="text-4xl font-saans text-center mb-1">
            Where would you like to start?
          </Text>

          <Text className="text-gray-400 text-lg font-saans text-center mb-8">
            Select what matters most to you right now
          </Text>

          <View className="gap-4 mb-10">
            {OPTIONS.map((item) => {
              const active = selected === item.id;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => setSelected(active ? null : item.id)}
                  className={`flex-row items-center justify-between px-5 py-5 rounded-xl border ${
                    active
                      ? "bg-[#211FFE] border-[#211FFE]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={active ? "#FFFFFF" : "#111827"}
                    />

                    <Text
                      className={`text-lg font-saans ${
                        active ? "text-white" : "text-black"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {active && (
                    <Ionicons name="checkmark-circle" size={22} color="white" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={() => setShowModal(true)}
          className="bg-[#211FFE] py-5 rounded-full"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue
          </Text>
        </Pressable>
      </View>

      {showModal && (
        <View className="absolute inset-0 justify-end">
          <Pressable
            className="absolute inset-0"
            onPress={() => setShowModal(false)}
          >
            <BlurView intensity={30} tint="dark" className="flex-1" />
          </Pressable>

          <View className="bg-white px-6 pt-8 pb-10 rounded-t-3xl">
            <View className="items-center mb-6">
              <Image
                source={require("@/assets/images/vnot.png")}
                className="w-14 h-14 mb-4"
              />

              <Text className="text-2xl font-saans text-center mb-2">
                Don’t miss a thing.
              </Text>

              <Text className="text-gray-400 text-lg font-saans text-center">
                To stay in the loop, turn on notifications.
              </Text>
            </View>

            <Pressable
              onPress={() => {
                setShowModal(false);
                router.push("/(profile-onboarding)/all-set");
              }}
              className="bg-[#211FFE] py-5 rounded-full mb-4"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Got it
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setShowModal(false);
                router.push("/(profile-onboarding)/all-set");
              }}
            >
              <Text className="text-center text-lg font-saans underline font-semibold">
                Maybe later
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
