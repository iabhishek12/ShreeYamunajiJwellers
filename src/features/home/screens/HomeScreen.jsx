const React = require('react');
const { SafeAreaView, ScrollView, StatusBar, Text, View } = require('react-native');
const { useSafeAreaInsets } = require('react-native-safe-area-context');
const HomeHeader = require('../../../components/home/HomeHeader');
const SearchBar = require('../../../components/home/SearchBar');
const HeroBanner = require('../../../components/home/HeroBanner');
const CategoryRow = require('../../../components/home/CategoryRow');
const AssuranceStrip = require('../../../components/home/AssuranceStrip');
const CollectionCard = require('../../../components/home/CollectionCard');
const SectionHeader = require('../../../components/home/SectionHeader');
const BestSellerRow = require('../../../components/home/BestSellerRow');
const BottomBar = require('../../../components/home/BottomBar');
const {
  assuranceItems,
  bestSellerItems,
  bottomNavItems,
  categoryItems,
  collectionCards,
  heroBanner,
} = require('../../../data/mock/homeMock');
const { useAppSelector } = require('../../../store/hooks');

const scrollContentStyle = {
  paddingBottom: 16,
};

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const user = useAppSelector(state => state.auth.user);

  return (
    <SafeAreaView className="flex-1 bg-[#fbf7f1]">
      <StatusBar barStyle="dark-content" backgroundColor="#fbf7f1" />

      <View className="flex-1 bg-[#fbf7f1]">
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={scrollContentStyle}
        >
          <View style={{ paddingTop: Math.max(insets.top, 6) }}>
            <HomeHeader />
            <SearchBar />
            <HeroBanner banner={heroBanner} />
            <CategoryRow items={categoryItems} />
            <AssuranceStrip items={assuranceItems} />

            {user ? (
              <Text className="mx-4 mt-4 text-[12px] font-medium text-[#8b7c6c]">
                Welcome back, {user.name}
              </Text>
            ) : null}

            <View className="mx-4 mt-5 flex-row gap-3">
              {collectionCards.map(item => (
                <CollectionCard key={item.id} item={item} />
              ))}
            </View>

            <SectionHeader title="Best Sellers" actionLabel="VIEW ALL" />
            <BestSellerRow items={bestSellerItems} />
          </View>
        </ScrollView>

        <BottomBar items={bottomNavItems} />
      </View>
    </SafeAreaView>
  );
}

module.exports = HomeScreen;
