import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
  }, []); // Thêm rootNavigationState vào dependency để cập nhật khi có thay đổi

  const CheckNavLoaded = () => {
    if ( !rootNavigationState.key) {
      return null; // Trả về null nếu rootNavigationState chưa sẵn sàng
    }
  };

  // Thêm điều kiện hiển thị thành phần dựa trên `user`
  if (!user) {
    return <Redirect href={'login'} />;
  }

  return user && (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? 
      <Redirect href={'/(tabs)/home'} />
    :
    <Redirect href={'/login/index'} />
    }
      
      
    </View>
  );
}
