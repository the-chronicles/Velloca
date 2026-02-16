import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-16">
        <View className="flex-row items-center justify-between mb-6">
          <Pressable className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center overflow-hidden">
            {/* <Image source={{ uri: "" }} className="w-full h-full" /> */}
            <RemixIcon name="user-3-line" size={22} color="#111827" />
          </Pressable>

          <Image
            source={require("@/assets/images/vellocaicon.png")}
            className="w-10 h-10"
            resizeMode="contain"
          />

          <Pressable className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center">
            <RemixIcon name="settings-3-line" size={22} color="#111827" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/(kyc)/kycwelcome")}
          className="bg-[#211FFE] rounded-3xl px-5 py-5 flex-row items-center justify-between mb-8"
        >
          <View className="mr-4">
            <View className="w-14 h-14 rounded-full border-4 border-white/50 items-center justify-center">
              <View className="w-11 h-11 rounded-full bg-white items-center justify-center">
                <Text className="text-black font-semibold">1/4</Text>
              </View>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-white font-saans text-xl mb-1">
              Start budgeting seamlessly
            </Text>
            <Text className="text-white/80 font-saans text-base">
              Hi John, complete your KYC
            </Text>
          </View>

          <RemixIcon name="arrow-right-s-line" size={26} color="#fff" />
        </Pressable>

        <View className="border border-[#F0F0F0] rounded-3xl overflow-hidden mb-8">
          <View className="px-6 py-5 border-b border-[#F0F0F0]">
            <Text className="text-[#A3A3A3] font-saans text-xl mb-4">
              Total Balance
            </Text>
            <Text className="text-6xl font-saans font-semibold">$0.00</Text>
          </View>

          <View className="px-6 py-6">
            <View className="flex-row justify-between">
              <ActionIcon label="Add" icon="add-line" />
              <ActionIcon label="Budget" icon="stack-fill" />
              <ActionIcon label="Send" icon="arrow-right-up-line" />
              <ActionIcon label="More" icon="layout-grid-fill" />
            </View>
          </View>

          <View className="flex-row border-t border-[#F0F0F0]">
            <View className="flex-1 px-6 py-5 border-r border-[#F0F0F0]">
              <Text className="text-[#A3A3A3] text-lg font-saans mb-2">
                Available
              </Text>
              <Text className="text-3xl font-saans font-semibold">$0.00</Text>
            </View>
            <View className="flex-1 px-6 py-5">
              <Text className="text-[#A3A3A3] text-lg font-saans mb-2">
                Allocated
              </Text>
              <Text className="text-3xl font-saans font-semibold">$0.00</Text>
            </View>
          </View>
        </View>

        <View className="border border-[#F0F0F0] rounded-3xl overflow-hidden">
          <View className="px-6 py-5 border-b border-[#F0F0F0]">
            <Text className="text-[#A3A3A3] font-saans text-xl">
              Active budgets
            </Text>
          </View>

          <View className="px-6 py-14 items-center">
            <RemixIcon name="stack-fill" size={28} color="#9CA3AF" />
            <Text className="mt-4 text-xl font-saans font-semibold">
              No active budgets
            </Text>
            <Text className="mt-2 text-center text-[#A3A3A3] font-saans">
              Create your first budget to start tracking{"\n"}expenses
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ActionIcon({ label, icon }: { label: string; icon: string }) {
  return (
    <Pressable className="items-center">
      <View className="w-16 h-16 rounded-full bg-[#F0F0F0] items-center justify-center mb-2">
        <RemixIcon name={icon as any} size={24} color="#111827" />
      </View>
      <Text className="text-[#A3A3A3] font-saans text-lg">{label}</Text>
    </Pressable>
  );
}
