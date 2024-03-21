import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CacheImage } from "../helpers/image";


export default function Categories({categories,  activeCategory, handleChangeCategory }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonClass = isActive ? 'bg-amber-400' : 'bg-black/20';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center space-y-1"
            >
              <View className={"rounded-full p-[6px] "+activeButtonClass}>
                {/* <Image
                  source={{ uri: cat.strCategoryThumb }}
                  className="rounded-full"
                  style={{ width: hp(6), height: hp(6) }}
                /> */}
                <CacheImage 
                uri={cat.strCategoryThumb }
                className="rounded-full"
                style={{ width: hp(6), height: hp(6) }}
                
                />
              </View>
              <View>
                <Text>{cat.strCategory}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
