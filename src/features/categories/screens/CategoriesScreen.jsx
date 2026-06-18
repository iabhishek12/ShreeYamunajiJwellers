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
import SearchBar from '../../../components/home/SearchBar';
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
const green = '#087A34';
const gold = '#F4C23D';

function CategoriesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor(
    (width - gridHorizontalPadding - cardGap * 1.2) / 3,
  );
  const cardImageHeight = Math.round(cardWidth * 1.08);

  return (
    <SafeAreaView className="flex-1 bg-[#087A34]">
      <StatusBar barStyle="light-content" backgroundColor="#087A34" />

      <View className="flex-1 bg-[#FFFDF4]">
        <View
          className="bg-[#087A34] pb-3"
          style={{ paddingTop: Math.max(insets.top, 4) }}
        >
          <HomeHeader />
        </View>

        <ScrollView
          className="flex-1"
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <SearchBar />

          <ImageBackground
            source={categoryHero.image}
            resizeMode="cover"
            className="mx-4 mt-5 h-[180px] overflow-hidden rounded-[18px] bg-[#FFD44D]"
          >
            <View
              className="flex-1 justify-center px-4"
              style={styles.heroOverlay}
            >
              <Text style={styles.heroTitle}>{categoryHero.title}</Text>
              <Text className="mt-2 max-w-[170px] text-[11px] font-semibold leading-[15px] text-[#202020]">
                {categoryHero.description}
              </Text>
            </View>
          </ImageBackground>

          <View className="mx-4 mt-4 flex-row flex-wrap justify-between">
            {categoryCards.map(item => {
              const Icon = iconMap[item.icon];

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('AllProducts', {
                      categoryId: item.id,
                    })
                  }
                  className="mb-4 mt-5 overflow-hidden rounded-[16px] border border-[#F4C23D] bg-white"
                  style={[styles.cardShadow, { width: cardWidth }]}
                >
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full bg-[#FFF6DF]"
                    style={{ height: cardImageHeight }}
                  />

                  <View className="items-center px-2 pb-3 pt-0">
                    <View
                      className="-mt-5 h-[44px] w-[44px] items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFFDF4]"
                      style={styles.iconBadgeShadow}
                    >
                      <Icon size={19} color={green} strokeWidth={1.7} />
                    </View>

                    <Text className="mt-2 text-center text-[10px] font-bold text-[#087A34]">
                      {item.title}
                    </Text>

                    <View className="mt-2 flex-row items-center">
                      <Text className="text-[10px] font-medium text-[#202020]">
                        {item.subtitle}
                      </Text>
                      <ArrowRight
                        size={12}
                        color={green}
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
            className="mx-4 mt-5 overflow-hidden rounded-[18px] border border-[#F4C23D] bg-[#087A34]"
            style={styles.cardShadow}
          >
            <ImageBackground
              source={categoryPromo.image}
              resizeMode="cover"
              className="h-[150px] w-full"
            >
              <View
                className="flex-1 justify-center px-4 py-4"
                style={styles.promoOverlay}
              >
                <View className="max-w-[72%]">
                  <Text className="text-[10px] font-extrabold text-[#F4C23D]">
                    {categoryPromo.eyebrow}
                  </Text>
                  <Text
                    style={styles.promoTitle}
                    className="mt-3 text-white"
                  >
                    {categoryPromo.title}
                  </Text>
                  <Text className="mt-1 text-[11px] font-semibold leading-[15px] text-[#FFFDF4]">
                    {categoryPromo.description}
                  </Text>

                  <View className="mt-4 flex-row items-center self-start rounded-[14px] bg-[#F4C23D] px-4 py-2.5">
                    <Text className="text-[12px] font-bold text-[#087A34]">
                      {categoryPromo.buttonLabel}
                    </Text>
                    <ArrowRight
                      size={14}
                      color={green}
                      strokeWidth={2.1}
                      style={styles.arrowSpacing}
                    />
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View className="mx-4 mt-5 flex-row rounded-[18px] border border-[#F4C23D] bg-[#087A34] px-2 py-3">
            {categoryAssuranceItems.map((item, index) => {
              const Icon = iconMap[item.icon];

              return (
                <View
                  key={item.id}
                  className={`flex-1 items-center px-2 ${
                    index < categoryAssuranceItems.length - 1
                      ? 'border-r border-[#F4C23D]'
                      : ''
                  }`}
                >
                  <Icon size={20} color={gold} strokeWidth={1.8} />
                  <Text className="mt-2 text-center text-[8px] font-semibold leading-[11px] text-white">
                    {item.title}
                  </Text>
                  <Text className="text-center text-[8px] font-semibold leading-[11px] text-white">
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
    backgroundColor: 'rgba(255,212,77,0.62)',
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
    color: green,
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
  promoOverlay: {
    backgroundColor: 'rgba(8,122,52,0.72)',
  },
  arrowSpacing: {
    marginLeft: 8,
  },
  cardShadow: {
    shadowColor: green,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  iconBadgeShadow: {
    shadowColor: gold,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 2,
  },
});

export default CategoriesScreen;
