import AsyncStorage   from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
 export const CacheImage = (props) =>  {
    const [cachedSource, setCachedSource] = useState(null)
    const {uri} = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try{
                const cacheImageData = await AsyncStorage.getItem(uri);
                if(cacheImageData){
                    setCachedSource({uri: cacheImageData})
                }
                else{
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    })
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({uri: base64Data});
                }
            }
            catch(error){
                console.log(error);
                setCachedSource({uri});
            }
        }
        getCachedImage();
    }, []);
    return <Animated.Image source={cachedSource}{...props} />;

 }