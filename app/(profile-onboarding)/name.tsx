import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Name() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");

  const isValid = firstName.trim() && lastName.trim();

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

            <Text className="text-4xl font-saans mb-2">Name as in ID</Text>
            <Text className="text-gray-400 text-lg font-saans mb-8">
              Name as in your official documents
            </Text>

            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First name"
              placeholderTextColor="#B0B0B0"
              autoCapitalize="words"
              className="bg-gray-100 rounded-xl font-saans px-4 py-4 text-lg mb-2"
            />
            <Text className="text-sm text-gray-400 mb-6">
              e.g. Jessalyn, not &quot;Jess&quot;
            </Text>

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last name"
              placeholderTextColor="#B0B0B0"
              autoCapitalize="words"
              className="bg-gray-100 rounded-xl font-saans px-4 py-4 text-lg mb-6"
            />

            <TextInput
              value={nickName}
              onChangeText={setNickName}
              placeholder="Nickname (Optional)"
              placeholderTextColor="#B0B0B0"
              autoCapitalize="words"
              className="bg-gray-100 rounded-xl font-saans px-4 py-4 text-lg"
            />
          </View>

          <Pressable
            disabled={!isValid}
            onPress={() => router.push("/(profile-onboarding)/usage")}
            className={`py-5 rounded-full ${
              isValid ? "bg-[#211FFE]" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-center font-semibold  font-saans text-lg ${
                isValid ? "text-white" : "text-gray-400"
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
