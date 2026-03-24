import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useKycStore } from "../store/kyc-store";

export default function SelfieCamera() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const { setSelfieImage } = useKycStore();

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    setSelfieImage(photo.uri);
    router.back();
  };

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-[#171726] items-center justify-center px-6">
        <Text className="text-white text-lg text-center mb-4">
          We need camera permission to capture your selfie
        </Text>

        <Pressable
          onPress={requestPermission}
          className="bg-white px-6 py-4 rounded-full"
        >
          <Text className="text-black font-semibold">Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#171726]">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front">
        <View className="flex-1 px-6 pt-16 pb-10 justify-between bg-black/20">
          <View>
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-white/20 items-center justify-center"
            >
              <RemixIcon name="arrow-left-line" size={22} color="#fff" />
            </Pressable>
          </View>

          <View className="items-center">
            <View className="w-[86%] h-[440px] rounded-full border-4 border-white/60 bg-black/40" />
            <Text className="text-white text-xl text-center mt-8 px-6">
              Position your face in the frame
            </Text>
          </View>

          <View className="items-center">
            <Pressable
              onPress={handleCapture}
              className="w-24 h-24 rounded-full border-[6px] border-white items-center justify-center"
            >
              <View className="w-20 h-20 rounded-full bg-white" />
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
