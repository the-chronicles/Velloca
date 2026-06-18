import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
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
  const { showSkeleton } = useLocalSearchParams<{ showSkeleton?: string }>();
  const [isLoading, setIsLoading] = useState(showSkeleton === "true");
  const [showLinkModal, setShowLinkModal] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

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

  if (isLoading) {
    return (
      <View className="flex-1 bg-white px-6 pt-16">
        <View className="flex-row items-center justify-between mb-6">
          <Animated.View
            style={{ opacity: pulseAnim }}
            className="w-10 h-10 rounded-full bg-[#EBEBEB]"
          />
          <Animated.View
            style={{ opacity: pulseAnim }}
            className="w-12 h-12 rounded-full bg-[#EBEBEB]"
          />
        </View>

        <Animated.View
          style={{ opacity: pulseAnim }}
          className="h-24 rounded-3xl bg-[#EBEBEB] mb-6"
        />

        <Animated.View
          style={{ opacity: pulseAnim }}
          className="h-5 w-32 rounded-md bg-[#EBEBEB] mb-3"
        />
        <Animated.View
          style={{ opacity: pulseAnim }}
          className="h-10 w-48 rounded-md bg-[#EBEBEB] mb-8"
        />

        <View className="flex-row gap-8 mb-8">
          {[1, 2, 3].map((i) => (
            <View key={i} className="items-center">
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="w-[52px] h-[52px] rounded-full bg-[#EBEBEB] mb-2"
              />
              <Animated.View
                style={{ opacity: pulseAnim }}
                className="h-3 w-10 rounded-md bg-[#EBEBEB]"
              />
            </View>
          ))}
        </View>

        <View className="flex-row gap-4 mb-8">
          <Animated.View
            style={{ opacity: pulseAnim }}
            className="flex-1 h-36 rounded-[28px] bg-[#EBEBEB]"
          />
          <Animated.View
            style={{ opacity: pulseAnim }}
            className="flex-1 h-36 rounded-[28px] bg-[#EBEBEB]"
          />
        </View>

        <Animated.View
          style={{ opacity: pulseAnim }}
          className="h-6 w-40 rounded-md bg-[#EBEBEB] mb-6"
        />
        <Animated.View
          style={{ opacity: pulseAnim }}
          className="h-28 rounded-3xl bg-[#EBEBEB]"
        />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-16">
          <View className="flex-row items-center justify-between mb-6">
            <Image
              source={require("@/assets/images/vellocaicon.png")}
              className="w-10 h-10"
              resizeMode="contain"
            />

            <Pressable className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center overflow-hidden">
              <RemixIcon name="user-3-line" size={22} color="#111827" />
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push("/(kyc)/kycwelcome")}
            className="bg-[#F5F5F5] rounded-3xl px-5 py-5 flex-row items-center justify-between mb-6"
          >
            <View className="mr-4">
              <View className="w-14 h-14 rounded-full border-[3px] border-[#211FFE]/30 items-center justify-center">
                <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                  <Text className="text-black font-saans font-semibold text-[13px]">1/4</Text>
                </View>
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-[#211FFE] font-saans text-[17px] font-semibold mb-0.5">
                Start budgeting seamlessly
              </Text>
              <Text className="text-[#141414] font-saans text-[14px]">
                Hi John, complete your KYC
              </Text>
            </View>

            <RemixIcon name="arrow-right-s-line" size={24} color="#111827" />
          </Pressable>

          <View className="mb-8">
            <Text className="text-[#A3A3A3] font-saans text-[17px]">
              Nuel&apos;s Wallet
            </Text>
            <Text className="text-[42px] leading-[56px] font-saans font-semibold text-black">
              $0.00
            </Text>
          </View>

          <View className="flex-row gap-10 mb-8">
            <ActionIcon
              label="Add"
              icon="add-line"
              onPress={() => setShowLinkModal(true)}
            />
            <ActionIcon label="Send" icon="arrow-right-up-line" />
            <ActionIcon label="Budget" icon="pie-chart-2-fill" />
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
            <Text className="text-black font-saans text-[20px] font-semibold mb-5">
              Active budgets
            </Text>

            <View className="bg-white rounded-3xl px-5 py-6 items-center">
              <Text className="text-black font-saans text-[17px] font-semibold mb-1">
                No active budgets
              </Text>
              <Text className="text-center text-[#A3A3A3] font-saans text-[14px] leading-[20px]">
                Create your first budget to start tracking{"\n"}expenses
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-black font-saans text-[20px] font-semibold mb-5">
              Transactions
            </Text>

            <View className="bg-white rounded-3xl px-5 py-6 items-center">
              <Text className="text-black font-saans text-[17px] font-semibold mb-1">
                No transactions yet
              </Text>
              <Text className="text-center text-[#A3A3A3] font-saans text-[14px] leading-[20px]">
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
      <View className="w-[52px] h-[52px] rounded-full bg-[#F0F0F0] items-center justify-center mb-2">
        <RemixIcon name={icon as any} size={22} color="#111827" />
      </View>
      <Text className="text-[#A3A3A3] font-saans text-[14px]">{label}</Text>
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
    <View className="flex-1 bg-[#F5F5F5] rounded-[28px] p-6">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: iconBg }}
      >
        <RemixIcon name={icon as any} size={15} color="#fff" />
      </View>

      <Text className="text-[#A3A3A3] font-saans text-[16px] mb-2">{title}</Text>
      <Text className="text-black font-saans text-[26px] font-semibold">
        {amount}
      </Text>
    </View>
  );
}
