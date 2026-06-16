import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';
import BottomBar from '../../../components/home/BottomBar';
import HomeHeader from '../../../components/home/HomeHeader';
import { iconMap } from '../../../components/home/iconMap';
import {
  categoryAssuranceItems,
  categoryBottomNavItems,
  categoryCards,
  categoryHero,
  categoryPromo,
} from '../../../data/mock/categoryMock';

const gridHorizontalPadding = 28;
const cardGap = 5;

function CategoriesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor(
    (width - gridHorizontalPadding - cardGap * 1.2) / 3,
  );
  const cardImageHeight = Math.round(cardWidth * 1.08);

  return (
    <SafeAreaView className="flex-1 bg-[#fbf7f1]">
      <StatusBar barStyle="dark-content" backgroundColor="#fbf7f1" />

      <View className="flex-1 bg-[#fbf7f1]">
        <View
          className="bg-[#fbf7f1] pb-2"
          style={{ paddingTop: Math.max(insets.top, 8) }}
        >
          <HomeHeader />
        </View>

        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ImageBackground
            source={categoryHero.image}
            resizeMode="cover"
            className="mx-[14px] mt-2 h-[180px] overflow-hidden rounded-[14px]"
          >
            <View
              className="flex-1 justify-center px-2"
              style={styles.heroOverlay}
            >
              <Text style={styles.heroTitle}>{categoryHero.title}</Text>
              <Text className="mt-3 text-[12px] leading-[10px] text-[#5d554d]">
                {categoryHero.description}
              </Text>
            </View>
          </ImageBackground>

          <View className="mx-[14px] mt-4 flex-row flex-wrap justify-between">
            {categoryCards.map(item => {
              const Icon = iconMap[item.icon];

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      productId: item.featuredProductId,
                    })
                  }
                  className="mb-4 mt-5 overflow-hidden rounded-[12px] border border-[#eee4d8] bg-white "
                  style={[styles.cardShadow, { width: cardWidth }]}
                >
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full bg-[#f8f0e4]"
                    style={{ height: cardImageHeight }}
                  />

                  <View className="items-center px-2 pb-3 pt-0">
                    <View
                      className="-mt-5 h-[44px] w-[44px] items-center justify-center rounded-full bg-white"
                      style={styles.iconBadgeShadow}
                    >
                      <Icon size={19} color="#c08d39" strokeWidth={1.7} />
                    </View>

                    <Text className="mt-2 text-center text-[10px] font-bold tracking-[0.5px] text-[#1f1a16]">
                      {item.title}
                    </Text>

                    <View className="mt-2 flex-row items-center">
                      <Text className="text-[10px] font-medium text-[#6e655c]">
                        {item.subtitle}
                      </Text>
                      <ArrowRight
                        size={12}
                        color="#7a7066"
                        strokeWidth={2}
                        style={styles.arrowSpacing}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: categoryPromo.featuredProductId,
              })
            }
            className="mx-[14px] mt-5 overflow-hidden rounded-[12px] bg-[#f5ecdf]"
            style={styles.cardShadow}
          >
            <ImageBackground
              source={categoryPromo.image}
              resizeMode="cover"
              className="h-[150px] w-full"
            >
              <View className="flex-1 justify-center bg-[#fff8f14d] px-2 py-4">
                <View className="max-w-[72%]">
                  <Text className="text-[10px] font-bold tracking-[1.8px] text-[#e6ce96]">
                    {categoryPromo.eyebrow}
                  </Text>
                  <Text
                    style={styles.promoTitle}
                    className="mt-3 text-[#181410]"
                  >
                    {categoryPromo.title}
                  </Text>
                  <Text className="mt-1 text-[11px] font-semibold leading-[8px] text-[#5f554d]">
                    {categoryPromo.description}
                  </Text>

                  <View className="mt-2 flex-row items-center self-start rounded-full bg-[#1b1a18] px-4 py-2.5">
                    <Text className="text-[12px] font-bold text-white">
                      {categoryPromo.buttonLabel}
                    </Text>
                    <ArrowRight
                      size={14}
                      color="#ffffff"
                      strokeWidth={2.1}
                      style={styles.arrowSpacing}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View className="mx-[14px] mt-10 flex-row border-y border-[#eee5d8] bg-[#fbf7f1] py-5">
            {categoryAssuranceItems.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <View
                  key={item.id}
                  className={`flex-1 items-center px-2 ${
                    index < categoryAssuranceItems.length - 1
                      ? 'border-r border-[#e2d9cb]'
                      : ''
                  }`}
                >
                  <Icon size={24} color="#1f1d1b" strokeWidth={1.8} />
                  <Text className="mt-3 text-center text-[9px] font-bold leading-[13px] text-[#2a2622]">
                    {item.title}
                  </Text>
                  <Text className="text-center text-[9px] font-bold leading-[13px] text-[#2a2622]">
                    {item.subtitle}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <BottomBar items={categoryBottomNavItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 18,
  },
  heroOverlay: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#171411',
  },
  promoTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  arrowSpacing: {
    marginLeft: 8,
  },
  cardShadow: {
    shadowColor: '#d8c1a0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.025,
    shadowRadius: 8,
    elevation: 1,
  },
  iconBadgeShadow: {
    shadowColor: '#baa17b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 2,
  },
});

export default CategoriesScreen;
