import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function LinkMethod() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Pressable
        onPress={() => router.back()}
        className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
      >
        <RemixIcon name="arrow-left-line" size={22} color="#111827" />
      </Pressable>

      <Text className="text-black text-4xl font-saans font-semibold mb-2">
        Choose a link method
      </Text>

      <Text className="text-[#A3A3A3] font-saans text-lg leading-8 mb-8">
        Choose your preferred method to connect your bank account
      </Text>

      <View className="bg-[#F7F7F7] rounded-[28px] px-6 py-6 mb-8">
        <Pressable
          onPress={() => router.push("/(wallet)/link-bank")}
          className="flex-row items-start"
        >
          <View className="w-12 h-12 rounded-full bg-[#EFEFEF] items-center justify-center mr-5">
            <RemixIcon name="bank-line" size={20} color="#111827" />
          </View>

          <View className="flex-1">
            <Text className="text-black text-2xl font-saans font-semibold mb-2">
              Bank Institution
            </Text>
            <Text className="text-[#A3A3A3] font-saans text-lg leading-8">
              Connect directly to your bank using secure authentication.
            </Text>
          </View>
        </Pressable>

        <View className="border-t border-dashed border-[#E5E5E5] my-6" />

        <Pressable
          onPress={() => router.push("/(wallet)/link-card")}
          className="flex-row items-start"
        >
          <View className="w-12 h-12 rounded-full bg-[#EFEFEF] items-center justify-center mr-5">
            <RemixIcon name="bank-card-line" size={20} color="#111827" />
          </View>

          <View className="flex-1">
            <Text className="text-black text-2xl font-saans font-semibold mb-2">
              Debit/Credit Card
            </Text>
            <Text className="text-[#A3A3A3] font-saans text-lg leading-8">
              Add your debit or credit card manually for quick transactions and
              wallet funding.
            </Text>
          </View>
        </Pressable>
      </View>

      <View className="bg-[#F7F7F7] rounded-[28px] px-6 py-6 flex-row items-start">
        <View className="w-12 h-12 rounded-full bg-[#EAF8EE] items-center justify-center mr-5">
          <RemixIcon name="shield-check-line" size={20} color="#16A34A" />
        </View>

        <View className="flex-1">
          <Text className="text-black text-2xl font-saans font-semibold mb-2">
            Bank-level Security
          </Text>
          <Text className="text-[#A3A3A3] font-saans text-lg leading-8">
            Your information is encrypted and secure.
          </Text>
        </View>
      </View>
    </View>
  );
}
