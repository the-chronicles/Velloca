import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

const { height } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [showLinkModal, setShowLinkModal] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (showLinkModal) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showLinkModal]);

  return (
    <>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-16">
          <View className="flex-row items-center justify-between mb-6">
            <Pressable className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center overflow-hidden">
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
            className="bg-[#211FFE] rounded-3xl px-5 py-5 flex-row items-center justify-between mb-6"
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

          <View className="mb-8 ">
            <Text className="text-[#A3A3A3] font-saans text-xl">
              Nuel&apos;s Wallet
            </Text>
            <Text className="text-5xl leading-[78px] font-saans font-semibold text-black">
              $0.00
            </Text>
          </View>

          <View className="flex-row gap-10 mb-10">
            <ActionIcon
              label="Add"
              icon="add-line"
              onPress={() => setShowLinkModal(true)}
            />
            <ActionIcon label="Send" icon="arrow-right-up-line" />
            <ActionIcon label="Budget" icon="stack-fill" />
          </View>

          <View className="flex-row gap-4 mb-8">
            <SummaryCard
              icon="wallet-3-fill"
              iconBg="#211FFE"
              title="Available"
              amount="$0"
            />
            <SummaryCard
              icon="lock-2-fill"
              iconBg="#FFA21A"
              title="Allocated"
              amount="$0"
            />
          </View>

          <View className="mb-10">
            <Text className="text-black font-saans text-2xl font-semibold mb-6">
              Active budgets
            </Text>

            <View className="border border-[#F0F0F0] rounded-3xl px-5 py-6 items-center">
              <Text className="text-black font-saans text-[21px] font-semibold mb-2">
                No active budgets
              </Text>
              <Text className="text-center text-[#A3A3A3] font-saans text-md">
                Create your first budget to start tracking{"\n"}expenses
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-black font-saans text-2xl font-semibold mb-4">
              Transactions
            </Text>

            <View className="border border-[#F0F0F0] rounded-3xl px-5 py-6 items-center">
              <Text className="text-black font-saans text-[21px] font-semibold mb-2">
                No transactions yet
              </Text>
              <Text className="text-center text-[#A3A3A3] font-saans text-md">
                Your transaction history will appear here
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Link account modal */}
      <Modal transparent visible={showLinkModal} animationType="none">
        <Pressable className="flex-1" onPress={() => setShowLinkModal(false)}>
          <BlurView intensity={20} tint="dark" className="flex-1" />
        </Pressable>

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="absolute bottom-0 w-full bg-white rounded-3xl px-6 pt-8 pb-10"
        >
          <Pressable
            onPress={() => setShowLinkModal(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center z-10"
          >
            <RemixIcon name="close-line" size={24} color="#111827" />
          </Pressable>

          <View className="items-center mb-8 mt-2">
            <Image
              source={require("@/assets/images/link.png")}
              className="w-32 h-32 mb-8"
              resizeMode="contain"
            />

            <Text className="text-black text-3xl font-saans text-center font-semibold mb-4">
              Link a bank account
            </Text>

            <Text className="text-[#A3A3A3] font-saans text-center text-lg leading-8 px-4">
              Choose a preferred method to top up your Velloca wallet, or you
              can connect your bank account.
            </Text>
          </View>

          <Pressable
            onPress={() => {
              setShowLinkModal(false);
              router.push("/(wallet)/link-method");
            }}
            className="bg-[#211FFE] py-5 rounded-full"
          >
            <Text className="text-white text-center text-xl font-saans">
              Add money now
            </Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
}

function ActionIcon({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: string;
  onPress?: () => void;
}) {
  return (
    <Pressable className="items-center" onPress={onPress}>
      <View className="w-20 h-20 rounded-full bg-[#F0F0F0] items-center justify-center mb-2">
        <RemixIcon name={icon as any} size={26} color="#111827" />
      </View>
      <Text className="text-[#A3A3A3] font-saans text-lg">{label}</Text>
    </Pressable>
  );
}

function SummaryCard({
  icon,
  iconBg,
  title,
  amount,
}: {
  icon: string;
  iconBg: string;
  title: string;
  amount: string;
}) {
  return (
    <View className="flex-1 border border-[#F0F0F0] rounded-[28px] p-6">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: iconBg }}
      >
        <RemixIcon name={icon as any} size={15} color="#fff" />
      </View>

      <Text className="text-[#A3A3A3] font-saans text-xl mb-3">{title}</Text>
      <Text className="text-black font-saans text-3xl font-semibold">
        {amount}
      </Text>
    </View>
  );
}
