import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../../../components/home/HomeHeader';
import SearchBar from '../../../components/home/SearchBar';
import HeroBanner from '../../../components/home/HeroBanner';
import CategoryRow from '../../../components/home/CategoryRow';
import AssuranceStrip from '../../../components/home/AssuranceStrip';
import CollectionCard from '../../../components/home/CollectionCard';
import SectionHeader from '../../../components/home/SectionHeader';
import BestSellerRow from '../../../components/home/BestSellerRow';
import NewArrivalsSection from '../../../components/home/NewArrivalsSection';
import PromiseSection from '../../../components/home/PromiseSection';
import ReviewSwiperSection from '../../../components/home/ReviewSwiperSection';
import BottomBar from '../../../components/home/BottomBar';
import {
  assuranceItems,
  bestSellerItems,
  categoryItems,
  collectionCards,
  heroBanner,
  newArrivalsSection,
  promiseSection,
  reviewSection,
} from '../../../data/mock/homeMock';
import { categoryBottomNavItems } from '../../../data/mock/categoryMock';
import { useAppSelector } from '../../../store/hooks';

const scrollContentStyle = {
  paddingBottom: 16,
};

const homeBottomNavItems = categoryBottomNavItems.map(item => ({
  ...item,
  active: item.id === 'home',
}));

function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const user = useAppSelector(state => state.auth.user);

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
          contentContainerStyle={scrollContentStyle}
        >
          <View>
            <SearchBar />
            <HeroBanner banner={heroBanner} />
            <CategoryRow items={categoryItems} />
            <AssuranceStrip items={assuranceItems} />
             <SectionHeader
              title="Best Sellers"
              actionLabel="VIEW ALL"
              onPress={() => navigation.navigate('AllProducts')}
            />
<BestSellerRow items={bestSellerItems} />
            {user ? (
              <Text className="mx-4 mt-4 text-[12px] font-medium text-[#087A34]">
                Welcome back, {user.name}
              </Text>
            ) : null}

            <View className="mx-4 mt-5 flex-row gap-3">
              {collectionCards.map(item => (
                <CollectionCard key={item.id} item={item} />
              ))}
            </View>

           
            
            <PromiseSection section={promiseSection} />
            <NewArrivalsSection section={newArrivalsSection} />
            <ReviewSwiperSection section={reviewSection} />
          </View>
        </ScrollView>

        <BottomBar items={homeBottomNavItems} />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
