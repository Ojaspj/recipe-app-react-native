import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { CacheImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";


export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isfav, setIsfav] = useState(false);
  const navigation = useNavigation();
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      // console.log("data:", response.data);
      if (response && response.data) {
        setMealData(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error:", err.message);
    }
  };

  const ingredientsIndexes = (mealData) => {
    if (!mealData) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (mealData["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]*)/;
    const match = url.match(regex);
    if(match && match[1]){
      return match[1];
    }
    return null;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white flex-1"
      contentContainerStyle={{ paddingBottom: 15 }}
    >
      <StatusBar style="light"  />

      {/* recipe image  */}
      <View className="flex-row justify-center">
        <CacheImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
         sharedTransitionTag = {item.strMeal}

        />
      </View>

      {/* back button  */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-white ml-4"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsfav(!isfav)}
          className="p-2 rounded-full bg-white mr-4"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isfav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description here  */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="flex px-4 justify-between space-y-4 pt-8">
          <Animated.View entering={FadeIn.delay(700).springify().damping(12)} className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {mealData?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {mealData?.strArea}
            </Text>
          </Animated.View>
          {/* misc  */}
          <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon size={hp(4)} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients  */}
          <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(mealData).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.8) }}
                        className="font-medium text-neutral-700"
                      >
                        {mealData["strMeasure" + i]}{" "}
                        {mealData["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text
              style={{ fontSize: hp(1.6) }}
              className="text-neutral-600 text-justify"
            >
              {mealData?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video  */}
          {mealData.strYoutube && (
            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(mealData.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
