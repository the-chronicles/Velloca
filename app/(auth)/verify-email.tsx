import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const OTP_LENGTH = 6;

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<TextInput[]>([]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const RESEND_TIME = 60;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const [showError, setShowError] = useState(false);

  const handleVerify = () => {
    const code = otp.join("");

    // temporary code
    if (code !== "123456") {
      setShowError(true);
      return;
    }

    router.push("/(profile-onboarding)/usage");
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    if (!canResend) return;

    setSecondsLeft(RESEND_TIME);
    setCanResend(false);
  };

  return (
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
            <Text className="text-4xl font-saans mb-2">Verify your email</Text>
            <Text className="text-gray-400 text-lg font-saans mb-8">
              We sent a 6-digit code to name@email.com
            </Text>

            <View className="flex-row items-center mb-6">
              {otp.map((digit, index) => (
                <View key={index} className="flex-row items-center">
                  <TextInput
                    ref={(ref) => {
                      if (ref) inputs.current[index] = ref;
                    }}
                    value={digit}
                    maxLength={1}
                    keyboardType="number-pad"
                    secureTextEntry
                    className="w-12 h-12 bg-[#F7F7F7] rounded-xl text-center text-xl mx-1"
                    onChangeText={(text) => {
                      if (!/^\d?$/.test(text)) return;

                      const newOtp = [...otp];
                      newOtp[index] = text;
                      setOtp(newOtp);

                      if (text && index < OTP_LENGTH - 1) {
                        inputs.current[index + 1]?.focus();
                      }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (
                        nativeEvent.key === "Backspace" &&
                        !otp[index] &&
                        index > 0
                      ) {
                        inputs.current[index - 1]?.focus();
                      }
                    }}
                  />

                  {index === 2 && (
                    <Text className="mx-2 text-xl text-gray-400">–</Text>
                  )}
                </View>
              ))}
            </View>

            <Text className="text-left font-saans text-lg text-gray-400 mb-6">
              {canResend ? (
                <Text
                  onPress={handleResend}
                  className="font-saans text-black underline"
                >
                  Resend code
                </Text>
              ) : (
                <>
                  Resend code in{" "}
                  <Text className="font-saans text-black underline">
                    00:{secondsLeft.toString().padStart(2, "0")}
                  </Text>
                </>
              )}
            </Text>
          </View>

          <Pressable
            disabled={!isOtpComplete}
            onPress={handleVerify}
            className={`py-5 rounded-full ${
              isOtpComplete ? "bg-[#211FFE]" : "bg-gray-200"
            }`}
          >
            <Text className="text-white text-center font-semibold">
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {showError && (
        <View className="absolute inset-0 z-50">
          <Pressable className="flex-1" onPress={() => setShowError(false)}>
            <BlurView intensity={20} tint="dark" className="flex-1" />
          </Pressable>

          <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
            <View className="items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-red-100 items-center justify-center">
                <Text className="text-red-500 text-2xl">✕</Text>
              </View>
            </View>

            <Text className="text-xl font-semibold text-center mb-2">
              Incorrect code entered
            </Text>

            <Text className="text-gray-400 text-center mb-6">
              Please check the code and try again
            </Text>

            <Pressable
              onPress={() => setShowError(false)}
              className="bg-[#211FFE] py-4 rounded-full"
            >
              <Text className="text-white text-center font-semibold">
                Got it
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
