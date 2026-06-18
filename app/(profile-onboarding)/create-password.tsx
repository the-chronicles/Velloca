import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const rules = {
  uppercase: (v: string) => /[A-Z]/.test(v),
  lowercase: (v: string) => /[a-z]/.test(v),
  number: (v: string) => /\d/.test(v),
  special: (v: string) => /[^A-Za-z0-9]/.test(v),
  length: (v: string) => v.length >= 8 && v.length <= 64,
};

export default function CreatePassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const showMismatch = confirm.length > 0 && password.length > 0 && password !== confirm;

  const validation = useMemo(
    () => ({
      uppercase: rules.uppercase(password),
      lowercase: rules.lowercase(password),
      number: rules.number(password),
      special: rules.special(password),
      length: rules.length(password),
      match: password.length > 0 && password === confirm,
    }),
    [password, confirm],
  );

  const allValid =
    Object.values(validation).every(Boolean) && confirm.length > 0;

  const hasTyped = password.length > 0;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="px-6 pt-14 flex-1">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-10"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </Pressable>

        <Text className="text-4xl font-saans mb-8">Create a password</Text>

        <View className="relative mb-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            placeholder="Add a password"
            placeholderTextColor="#B0B0B0"
            className="bg-[#F5F5F5] rounded-lg px-6 py-5 pr-14 font-saans"
            style={{ fontSize: secure && password.length > 0 ? 20 : 15, letterSpacing: secure && password.length > 0 ? 4 : 0 }}
          />

          <Pressable
            onPress={() => setSecure(!secure)}
            className="absolute right-5 top-1/2 -translate-y-1/2"
          >
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#9CA3AF"
            />
          </Pressable>
        </View>

        <View className="flex-row flex-wrap gap-x-6 gap-y-3 mb-6">
          <Rule
            label="1 Uppercase"
            valid={validation.uppercase}
            active={hasTyped}
          />
          <Rule
            label="1 Lowercase"
            valid={validation.lowercase}
            active={hasTyped}
          />
          <Rule label="1 Number" valid={validation.number} active={hasTyped} />
          <Rule
            label="8–64 Characters"
            valid={validation.length}
            active={hasTyped}
          />
          <Rule
            label="1 Special Character"
            valid={validation.special}
            active={hasTyped}
          />
        </View>

        <View className="mb-4">
          <View className="relative">
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={secureConfirm}
              placeholder="Confirm password"
              placeholderTextColor="#B0B0B0"
              className={`rounded-lg px-6 py-5 pr-14 font-saans ${confirm.length === 0
                ? "bg-[#F5F5F5]"
                : validation.match
                  ? "bg-[#F0FFF4]"
                  : "bg-[#FFF5F5]"
                }`}
              style={{ fontSize: secureConfirm && confirm.length > 0 ? 20 : 15, letterSpacing: secureConfirm && confirm.length > 0 ? 4 : 0 }}
            />

            <Pressable
              onPress={() => setSecureConfirm(!secureConfirm)}
              className="absolute right-5 top-1/2 -translate-y-1/2"
            >
              <Ionicons
                name={secureConfirm ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#9CA3AF"
              />
            </Pressable>
          </View>

          {showMismatch && (
            <Text className="text-[#EF4444] text-[13px] font-saans mt-2">
              Passwords do not match
            </Text>
          )}
        </View>

        <View className="mt-auto mb-6">
          <Pressable
            disabled={!allValid}
            onPress={() => router.push("/(profile-onboarding)/usage")}
            className={`py-5 rounded-full ${allValid ? "bg-[#211FFE]" : "bg-gray-200"
              }`}
          >
            <Text
              className={`text-center text-lg font-semibold ${allValid ? "text-white" : "text-gray-400"
                }`}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function Rule({
  label,
  valid,
  active,
}: {
  label: string;
  valid: boolean;
  active: boolean;
}) {
  const showError = active && !valid;
  const showSuccess = valid;

  return (
    <View className="flex-row items-center gap-2">
      {/* Icon */}
      <View className="w-4 h-4 items-center justify-center">
        {showSuccess ? (
          <Ionicons name="checkmark" size={16} color="#16A34A" /> // green
        ) : showError ? (
          <Ionicons name="close" size={16} color="#EF4444" /> // red
        ) : (
          <View className="w-2 h-2 rounded-full bg-gray-300" />
        )}
      </View>

      {/* Label */}
      <Text
        className={`text-base font-saans ${showSuccess
          ? "text-green-600"
          : showError
            ? "text-red-500"
            : "text-gray-400"
          }`}
      >
        {label}
      </Text>
    </View>
  );
}
