import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Categories({ activeCategory, setactiveCategory }) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((cat, index) => {
          return (
            <TouchableOpacity
              key={index}
              // onPress={() => setactiveCategory(cat.name)}
              className="flex items-center space-y-1"
            >
                <View className="mb-8">
                    <Text
                        className={`text-sm font-semibold ${
                        activeCategory === cat.name ? "text-amber-400" : "text-gray-600"
                        }`}
                    >
                        {cat.name}
                    </Text>
                </View>
                <Image
                  source={{ uri: cat.image }}
                  style={{ width: hp(6), height: hp(6) }}
                />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
