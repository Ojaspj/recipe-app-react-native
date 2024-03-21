import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { CacheImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ meals, categories }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 sapce-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600 mb-4"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
            <Loading size='large' className="mt-20" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
            //   refreshing={isLoadingNext}
            //   onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            //   onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: 8,
          paddingRight: 8,
        }}
        onPress={() => navigation.navigate('RecipeDetail', {...item})}
        className="flex justify-center mb-4 space-y-1"
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        /> */}
        <CacheImage 
         uri={item.strMealThumb }
         style={{
           width: "100%",
           height: index % 3 == 0 ? hp(25) : hp(35),
           borderRadius: 35,
         }}
         sharedTransitionTag = {item.strMeal}
        
        />
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length> 20 ? item.strMeal.slice(0,20) + "..." : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
