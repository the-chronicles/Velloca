import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

const STEPS = [
  {
    icon: "id-card-fill",
    label: "Valid Government ID",
    route: "/(kyc)/select-id",
  },
  {
    icon: "bank-card-line",
    label: "Bank verification number (BVN)",
    route: "/(kyc)/bvn",
  },
  {
    icon: "user-6-fill",
    label: "Clear Selfie",
    route: "/(kyc)/selfie",
  },
];

export default function KycWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const completedSteps = 0;
  const totalSteps = STEPS.length;
  const progress = completedSteps / totalSteps;

  const ringSize = 200;
  const strokeWidth = 10;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="flex-1 px-6"
          style={{ paddingTop: insets.top + 12 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#F5F5F5] items-center justify-center mb-6"
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
          </Pressable>

          <View className="items-center mb-8">
            <View
              style={{ width: ringSize, height: ringSize }}
              className="items-center justify-center"
            >
              <Svg
                width={ringSize}
                height={ringSize}
                style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
              >
                <Circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  stroke="#EBEBEB"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  stroke="#3B82F6"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </Svg>

              <Image
                source={require("@/assets/images/Velloca-Sh.png")}
                style={{ width: 180, height: 180 }}
                resizeMode="contain"
              />
            </View>
          </View>

          <Text className="text-[#9E9E9E] text-[16px] font-saans text-center mb-2">
            Complete your KYC
          </Text>

          <Text className="text-[28px] font-saans font-bold text-black text-center leading-[36px] mb-10 px-2">
            Let's get you full access to your account
          </Text>

          {STEPS.map((step) => (
            <Pressable
              key={step.label}
              onPress={() => router.push(step.route as any)}
              className="flex-row items-center mb-3"
            >
              <View className="w-14 h-14 rounded-full bg-[#F7F7F7] items-center justify-center mr-3">
                <RemixIcon name={step.icon as any} size={20} color="#111827" />
              </View>

              <View className="flex-1 flex-row items-center p-4 rounded-xl bg-[#F7F7F7] justify-between">
                <Text className="flex-1 text-[15px] font-saans font-semibold text-black">
                  {step.label}
                </Text>

                <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
