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

export default function KycWelcome() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="px-6 pt-16 justify-between">
        {/* Top row: back + logo */}
        <View className="flex-row items-center justify-between mb-8">
          <Pressable
            onPress={() => router.back()}
            className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center"
          >
            <RemixIcon name="arrow-left-line" size={22} color="#111827" />
          </Pressable>

          <Image
            source={require("@/assets/images/vellocaicon.png")}
            className="w-10 h-10"
            resizeMode="contain"
          />

          {/* Spacer to balance center logo */}
          <View className="w-12 h-12" />
        </View>

        {/* Hero icon/image */}
        <View className="items-center mb-10">
          {/* Replace with your exact asset if you have it */}
          <Image
            source={require("@/assets/images/Velloca-Shield.png")}
            className="w-52 h-52"
            resizeMode="contain"
          />
        </View>

        {/* Title + subtitle */}
        <Text className="text-4xl font-saans text-center mb-4">
          Complete Your KYC
        </Text>

        <Text className="text-[#A3A3A3] text-lg font-saans text-center leading-7 mb-10 px-4">
          Hi John, let&apos;s verify your identity to unlock full access to
          Velloca
        </Text>

        {/* You'll need card */}
        <View className="bg-[#F7F7F7] rounded-3xl px-6 py-6 mb-5">
          <Text className="text-xl font-saans font-semibold mb-6">
            You&apos;ll need:
          </Text>

          <NeedRow
            icon="id-card-line"
            title="Valid Government ID"
            subtitle="Passport, Driver's License, National ID, or Voter's Card"
          />

          <View className="h-6" />

          <NeedRow
            icon="bank-card-line"
            title="Bank Verification Number (BVN)"
            subtitle="Your 11-digit BVN for identity verification"
          />

          <View className="h-6" />

          <NeedRow
            icon="user-3-line"
            title="Clear Selfie"
            subtitle="A recent photo of yourself"
          />
        </View>

        {/* CTA */}
        <Pressable
          onPress={() => router.push("/(kyc)/select-id")}
          className="bg-[#211FFE] py-5 rounded-full"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get started
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------- Small row component ---------- */
function NeedRow({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <View className="flex-row items-start gap-4">
      <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
        <RemixIcon name={icon as any} size={20} color="#111827" />
      </View>

      <View className="flex-1">
        <Text className="text-lg font-saans font-semibold mb-1">{title}</Text>
        <Text className="text-[#A3A3A3] font-saans text-base leading-6">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
