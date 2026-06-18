import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OTP_LENGTH = 4;
const CORRECT_CODE = "1234";

export default function VerifyCode() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const inputs = useRef<TextInput[]>([]);

  const RESEND_TIME = 15;
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const isOtpComplete = otp.every((digit) => digit !== "");
  const isCodeCorrect = otp.join("") === CORRECT_CODE;

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

  useEffect(() => {
    if (isOtpComplete && !isCodeCorrect) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [otp]);

  const handleResend = () => {
    if (!canResend) return;
    setSecondsLeft(RESEND_TIME);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setShowError(false);
    inputs.current[0]?.focus();
  };

  const handleContinue = () => {
    if (!isOtpComplete || !isCodeCorrect) return;
    router.push("/(profile-onboarding)/create-password");
  };

  const getBorderColor = (index: number) => {
    if (showError) return "#EF4444";
    if (focusedIndex === index) return "#211FFE";
    if (otp[index] !== "") return "#211FFE";
    return "transparent";
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="flex-1 px-6 pb-6 justify-between"
          style={{ paddingTop: insets.top + 12 }}
        >
          <View>
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-[#F5F5F5] items-center justify-center mb-8"
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </Pressable>

            <Text className="text-[30px] font-saans font-bold text-black leading-[38px] mb-2">
              Enter the 4-digit code
            </Text>

            <Text className="text-[#9E9E9E] text-[15px] font-saans leading-[22px] mb-8">
              Sent to you at {phone || "+2348033899221"}
            </Text>

            <View className="flex-row gap-3 mb-4">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputs.current[index] = ref;
                  }}
                  value={digit}
                  maxLength={1}
                  keyboardType="number-pad"
                  className="text-[22px] font-saans text-black text-center"
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: "#F5F5F5",
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: getBorderColor(index),
                  }}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
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
              ))}
            </View>

            <Text className="text-[#9E9E9E] text-[15px] font-saans">
              {canResend ? (
                <Text
                  onPress={handleResend}
                  className="text-black font-semibold underline"
                >
                  Resend code
                </Text>
              ) : (
                <>
                  Resend code in{" "}
                  <Text className="text-black font-semibold underline">
                    00:{secondsLeft.toString().padStart(2, "0")}
                  </Text>
                </>
              )}
            </Text>
          </View>

          <Pressable
            disabled={!isOtpComplete || !isCodeCorrect}
            onPress={handleContinue}
            className={`py-5 rounded-full ${
              isOtpComplete && isCodeCorrect
                ? "bg-[#211FFE]"
                : "bg-[#F0F0F0]"
            }`}
          >
            <Text
              className={`text-center font-saans text-[16px] font-semibold ${
                isOtpComplete && isCodeCorrect
                  ? "text-white"
                  : "text-[#B0B0B0]"
              }`}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
