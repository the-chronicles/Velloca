import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

export default function LinkCard() {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const cleanedCardNumber = cardNumber.replace(/\s/g, "");

  const cardType = useMemo(
    () => detectCardType(cleanedCardNumber),
    [cleanedCardNumber],
  );

  const maskedTopDigits =
    cleanedCardNumber.length >= 4 ? cleanedCardNumber.slice(-4) : "••••";

  const displayName =
    cardholderName.trim().length > 0 ? cardholderName : "Your Name";

  const isCardNumberValid = cleanedCardNumber.length >= 16;
  const isNameValid = cardholderName.trim().length >= 2;
  const isExpiryValid = /^\d{2}\/\d{2}$/.test(expiryDate);
  const isCvvValid = /^\d{3,4}$/.test(cvv);

  const isValid =
    isCardNumberValid && isNameValid && isExpiryValid && isCvvValid;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 bg-white">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 170 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-16">
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-[#F0F0F0] items-center justify-center mb-8"
            >
              <RemixIcon name="arrow-left-line" size={22} color="#111827" />
            </Pressable>

            <Text className="text-4xl font-saans text-black mb-2">
              Card in your name
            </Text>

            <Text className="text-[#A3A3A3] font-saans text-lg leading-8 mb-8">
              Add your debit or credit card information securely
            </Text>

            {/* Card Preview */}
            <View className="bg-[#211FFE] rounded-[32px] px-6 py-6 mb-8 shadow-lg">
              <View className="flex-row items-start justify-between mb-20">
                <View className="w-12 h-12 items-center justify-center">
                  <Image
                    source={require("@/assets/images/Subtract.png")}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </View>

                <View className="bg-white/10 rounded-full px-4 py-2 flex-row items-center gap-2">
                  <Text className="text-white text-4xl">•</Text>
                  <Text className="text-white font-saans text-xl font-semibold">
                    {maskedTopDigits}
                  </Text>
                  <RemixIcon
                    name={getCardIcon(cardType)}
                    size={22}
                    color="#fff"
                  />
                </View>
              </View>

              <Text className="text-white font-saans text-2xl">
                {displayName}
              </Text>
            </View>

            {/* Card Number */}
            <View className="relative mb-6">
              <TextInput
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                placeholder="Card Number"
                placeholderTextColor="#A3A3A3"
                keyboardType="number-pad"
                maxLength={23}
                className="bg-[#F7F7F7] rounded-2xl px-5 py-5 pr-16 text-xl font-saans text-black"
              />

              {cardType !== "unknown" && (
                <View className="absolute right-5 top-1/2 -translate-y-1/2">
                  <CardBrandBadge cardType={cardType} />
                </View>
              )}
            </View>

            {/* Cardholder Name */}
            <TextInput
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholder="Cardholder Name"
              placeholderTextColor="#A3A3A3"
              autoCapitalize="words"
              className="bg-[#F7F7F7] rounded-2xl px-5 py-5 text-xl font-saans text-black mb-6"
            />

            {/* Expiry + CVV */}
            <View className="flex-row gap-4 mb-8">
              <TextInput
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiry(text))}
                placeholder="Expiry Date"
                placeholderTextColor="#A3A3A3"
                keyboardType="number-pad"
                maxLength={5}
                className="flex-1 bg-[#F7F7F7] rounded-2xl px-5 py-5 text-xl font-saans text-black"
              />

              <TextInput
                value={cvv}
                onChangeText={(text) => setCvv(text.replace(/\D/g, ""))}
                placeholder="CVV"
                placeholderTextColor="#A3A3A3"
                keyboardType="number-pad"
                maxLength={4}
                className="flex-1 bg-[#F7F7F7] rounded-2xl px-5 py-5 text-xl font-saans text-black"
              />
            </View>

            {/* Secure card */}
            <View className="bg-[#EAF8EE] border border-[#BDECC8] rounded-[28px] px-6 py-6 flex-row items-start">
              <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-5">
                <RemixIcon name="shield-check-fill" size={22} color="#16A34A" />
              </View>

              <View className="flex-1">
                <Text className="text-[#0F6B34] text-2xl font-saans font-semibold mb-2">
                  Secure & Encrypted
                </Text>
                <Text className="text-[#0F6B34] font-saans text-lg leading-8">
                  Your card information is encrypted with bank-level security
                  and PCI-DSS compliance.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Fixed bottom button */}
        <View className="absolute left-6 right-6 bottom-8">
          <Pressable
            disabled={!isValid}
            onPress={() => router.push("/(wallet)/card-linked-success")}
            className={`py-5 rounded-full ${
              isValid ? "bg-[#211FFE]" : "bg-[#EAEAEA]"
            }`}
          >
            <Text
              className={`text-center font-saans text-xl ${
                isValid ? "text-white" : "text-[#A3A3A3]"
              }`}
            >
              Link Card
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function CardBrandBadge({ cardType }: { cardType: string }) {
  if (cardType === "mastercard") {
    return (
      <View className="flex-row items-center">
        <View className="w-6 h-6 rounded-full bg-[#EB001B]" />
        <View className="w-6 h-6 rounded-full bg-[#F79E1B] -ml-2" />
      </View>
    );
  }

  if (cardType === "visa") {
    return <Text className="text-[#1A1F71] font-bold text-lg">VISA</Text>;
  }

  if (cardType === "verve") {
    return <Text className="text-[#0A7A33] font-bold text-base">VERVE</Text>;
  }

  if (cardType === "amex") {
    return <Text className="text-[#2E77BC] font-bold text-base">AMEX</Text>;
  }

  return null;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function detectCardType(number: string) {
  if (/^4/.test(number)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(number)) return "mastercard";
  if (/^(506|507|650)/.test(number)) return "verve";
  if (/^(34|37)/.test(number)) return "amex";
  return "unknown";
}

function getCardIcon(cardType: string) {
  if (cardType === "mastercard") return "bank-card-fill";
  if (cardType === "visa") return "bank-card-fill";
  if (cardType === "verve") return "bank-card-fill";
  if (cardType === "amex") return "bank-card-fill";
  return "bank-card-fill";
}
