import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const EVERYDAY_NEEDS = [
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "food", label: "Food & Dining", icon: "🍱" },
  { id: "transport", label: "Transportation", icon: "🚗" },
  { id: "bills", label: "Bills & Utilities", icon: "🏠" },
  { id: "subscriptions", label: "Subscriptions", icon: "📱" },
  { id: "healthcare", label: "Healthcare", icon: "🏥" },
];

const FINANCIAL_GOALS = [
  { id: "savings", label: "Savings Goals", icon: "🐷" },
  { id: "investment", label: "Investment Fund", icon: "📈" },
  { id: "debt", label: "Debt Repayment", icon: "💳" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "family", label: "Family & Kids", icon: "👶" },
  { id: "business", label: "Business Expenses", icon: "💼" },
];

const LIFESTYLE = [
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "hobbies", label: "Hobbies", icon: "🎨" },
  { id: "fitness", label: "Fitness & Gym", icon: "💪" },
  { id: "coffee", label: "Coffee & Treats", icon: "🧴" },
  { id: "gifts", label: "Gifts & Donations", icon: "🎁" },
];

export default function Usage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isValid = selected.length > 0;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-14">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-8"
          >
            <Ionicons name="arrow-back" size={20} color="#000" />
          </Pressable>

          <Text className="text-4xl font-saans mb-2">
            What do you want to use Velloca for?
          </Text>
          <Text className="text-gray-400 text-lg font-saans mb-10">
            We’re just curious and need this info for the rules!
          </Text>

          <Text className="text-gray-400 font-saans mb-4">Everyday needs</Text>
          <View className="flex-row flex-wrap gap-3 mb-10">
            {EVERYDAY_NEEDS.map((item) => (
              <UsagePill
                key={item.id}
                {...item}
                selected={selected.includes(item.id)}
                onPress={() => toggleItem(item.id)}
              />
            ))}
          </View>

          <Text className="text-gray-400 font-saans mb-4">Financial goals</Text>
          <View className="flex-row flex-wrap gap-3 mb-10">
            {FINANCIAL_GOALS.map((item) => (
              <UsagePill
                key={item.id}
                {...item}
                selected={selected.includes(item.id)}
                onPress={() => toggleItem(item.id)}
              />
            ))}
          </View>

          <Text className="text-gray-400 font-saans mb-4">Lifestyle</Text>
          <View className="flex-row flex-wrap gap-3">
            {LIFESTYLE.map((item) => (
              <UsagePill
                key={item.id}
                {...item}
                selected={selected.includes(item.id)}
                onPress={() => toggleItem(item.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-6 left-6 right-6">
        <Pressable
          disabled={!isValid}
          onPress={() => router.push("/(profile-onboarding)/nin")}
          className={`py-5 rounded-full ${isValid ? "bg-[#211FFE]" : "bg-gray-200"
            }`}
        >
          <Text
            className={`text-center font-semibold text-lg ${isValid ? "text-white" : "text-gray-400"
              }`}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function UsagePill({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-5 py-4 rounded-full ${selected ? "bg-[#211FFE]" : "bg-gray-100"
        }`}
    >
      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={18}
          color="#fff"
          style={{ marginRight: 6 }}
        />
      )}

      {!selected && <Text className="mr-2">{icon}</Text>}

      <Text className={`font-saans ${selected ? "text-white" : "text-black"}`}>
        {label}
      </Text>
    </Pressable>
  );
}
