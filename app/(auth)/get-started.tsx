import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";


const { height } = Dimensions.get("window");

export default function LetsGetStarted() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (showModal) {
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
  }, [showModal]);

  return (
    <>
      <KeyboardAvoidingView
        className="flex-1 bg-white"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 pt-14 pb-6 justify-between">
            <View>
              <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-8"
              >
                <Ionicons name="arrow-back" size={20} color="#000" />
              </Pressable>

              <Text className="text-4xl font-saans mb-2">
                Let’s get started
              </Text>

              <Text className="text-gray-400 text-lg font-saans mb-8">
                Enter your email address. We will send you a confirmation code
                there
              </Text>

              <Pressable className="border border-gray-200 py-4 rounded-xl mb-6 flex-row justify-center items-center gap-2">
                <Image
                  source={require("@/assets/images/google.png")}
                  className="w-5 h-5"
                />
                <Text className="font-medium font-saans text-lg">
                  Continue with Google
                </Text>
              </Pressable>

              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-3 text-gray-400 text-sm font-saans">
                  OR SIGN UP WITH
                </Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#B0B0B0"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-gray-100 rounded-xl font-saans px-4 py-4 text-lg"
              />
            </View>

            <View>
              <Pressable
                disabled={!isEmailValid}
                onPress={() => setShowModal(true)}
                className={`py-5 rounded-full mb-4 ${
                  isEmailValid ? "bg-[#211FFE]" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-center font-saans text-lg ${
                    isEmailValid ? "text-white" : "text-gray-400"
                  }`}
                >
                  Get Started
                </Text>
              </Pressable>

              <Pressable
              // onPress={() => router.push("/(auth)/login")}
              >
                <Text className="text-center font-saans text-gray-500 text-lg">
                  Already have an account?{" "}
                  <Text className="text-black">Login</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal transparent visible={showModal} animationType="slide">
        <Pressable className="flex-1" onPress={() => setShowModal(false)}>
          <BlurView intensity={20} tint="dark" className="flex-1" />
        </Pressable>

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="absolute bottom-5 w-full bg-white rounded-3xl px-6 pt-6 pb-10"
        >
          <View className="items-center mb-4">
            <Ionicons name="mail-outline" size={36} color="#8a8a8a" />
          </View>

          <Text className="text-xl font-saans text-center mb-1">{email}</Text>

          <Text className="text-gray-400 font-saans text-lg text-center mb-6">
            Is this email correct? We will send you a confirmation code there
          </Text>

          <View className="flex-row gap-4">
            <Pressable
              onPress={() => setShowModal(false)}
              className="flex-1 bg-gray-100 py-4 rounded-full"
            >
              <Text className="text-center font-saans text-lg">Go back</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setShowModal(false);
                router.push("/(auth)/verify-email");
              }}
              className="flex-1 bg-[#211FFE] py-5 rounded-full"
            >
              <Text className="text-center text-white font-saans text-lg">
                Confirm
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}
