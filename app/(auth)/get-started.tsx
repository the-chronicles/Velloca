import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COUNTRIES = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
];

export default function GetStarted() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const digitCount = phoneNumber.replace(/\D/g, "").length;
  const isPhoneValid = digitCount === 10 || digitCount === 11;

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

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
              Enter your phone number
            </Text>

            <Text className="text-[#9E9E9E] text-[15px] font-saans leading-[22px] mb-8">
              Enter your phone number. We will send you a confirmation code
              there
            </Text>

            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={() => {
                  setSearchQuery("");
                  setIsDropdownVisible(true);
                }}
                className="flex-row items-center bg-[#F5F5F5] rounded-lg px-3 py-[14px] gap-1.5"
              >
                <Text style={{ fontSize: 18 }}>{selectedCountry.flag}</Text>
                <Text className="text-black font-saans text-[15px] font-medium">
                  {selectedCountry.code}
                </Text>
                <Ionicons name="chevron-down" size={14} color="#666" />
              </Pressable>

              <View className="flex-1 bg-[#F5F5F5] rounded-lg px-5 py-[14px]">
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone number"
                  placeholderTextColor="#B0B0B0"
                  keyboardType="phone-pad"
                  className="text-[15px] font-saans text-black"
                  style={{ padding: 0 }}
                />
              </View>
            </View>
          </View>

          <View className="mb-4">
            <Pressable
              disabled={!isPhoneValid}
              onPress={() => setShowConfirmModal(true)}
              className={`py-5 rounded-full mb-4 ${isPhoneValid ? "bg-[#211FFE]" : "bg-[#F0F0F0]"
                }`}
            >
              <Text
                className={`text-center font-saans text-[16px] font-semibold ${isPhoneValid ? "text-white" : "text-[#B0B0B0]"
                  }`}
              >
                Get Started
              </Text>
            </Pressable>

            <Pressable>
              <Text className="text-center font-saans text-[#9E9E9E] text-[15px]">
                Already have an account?{" "}
                <Text className="text-black font-semibold underline">
                  Login
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View className="flex-1 justify-end px-6" style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 12 : 24 }}>
          <Pressable
            className="absolute inset-0"
            onPress={() => setShowConfirmModal(false)}
          >
            <BlurView intensity={10} tint="dark" className="absolute inset-0" />
          </Pressable>

          <View className="bg-white rounded-[32px] p-6  w-full">
            <View className="w-14 h-14 rounded-full bg-[#EDEDFF] items-center justify-center mb-5">
              <Ionicons name="call" size={24} color="#211FFE" />
            </View>

            <Text className="text-[22px] font-saans font-bold text-black mb-2">
              ({selectedCountry.code}){phoneNumber}
            </Text>

            <Text className="text-[#9E9E9E] text-[15px] font-saans leading-[22px] mb-6">
              Is this number correct? We will send you a confirmation code there
            </Text>

            <View className="flex-row gap-4">
              <Pressable
                onPress={() => setShowConfirmModal(false)}
                className="flex-1 bg-[#F0F0F0] py-[16px] rounded-full"
              >
                <Text className="text-center font-saans text-[15px] font-semibold text-black">
                  Go back
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowConfirmModal(false);
                  const formattedPhone = phoneNumber.startsWith("0")
                    ? phoneNumber.slice(1)
                    : phoneNumber;
                  router.push({
                    pathname: "/(auth)/verify-email",
                    params: { phone: `${selectedCountry.code}${formattedPhone}` },
                  });
                }}
                className="flex-1 bg-[#211FFE] py-[16px] rounded-full"
              >
                <Text className="text-center font-saans text-[15px] font-semibold text-white">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isDropdownVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <Pressable
            className="flex-1"
            onPress={() => setIsDropdownVisible(false)}
          />
          <View
            className="bg-white rounded-t-3xl px-6 pt-5"
            style={{
              height: "65%",
              paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
            }}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-saans font-bold text-black">
                Select Country
              </Text>
              <Pressable
                onPress={() => setIsDropdownVisible(false)}
                className="p-1"
              >
                <Ionicons name="close" size={24} color="#000" />
              </Pressable>
            </View>

            {/* Search Input */}
            <View className="flex-row items-center bg-[#F5F5F5] rounded-xl px-4 py-3 gap-2 mb-4">
              <Ionicons name="search" size={20} color="#888" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search country name or code"
                placeholderTextColor="#A0A0A0"
                className="flex-1 text-[15px] font-saans text-black"
                style={{ padding: 0 }}
                autoCorrect={false}
              />
            </View>

            {/* Country List */}
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.name + item.code}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setSelectedCountry(item);
                    setIsDropdownVisible(false);
                  }}
                  className="flex-row items-center justify-between py-4 border-b border-[#F5F5F5]"
                >
                  <View className="flex-row items-center gap-3">
                    <Text style={{ fontSize: 22 }}>{item.flag}</Text>
                    <Text className="text-black font-saans text-base">
                      {item.name}
                    </Text>
                  </View>
                  <Text className="text-[#666] font-saans font-medium text-base">
                    {item.code}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
