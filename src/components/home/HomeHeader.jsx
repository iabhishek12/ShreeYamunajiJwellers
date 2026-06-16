import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Gem, Heart, Menu, Search, ShoppingBag } from 'lucide-react-native';
import { useAppSelector } from '../../store/hooks';
import SidebarMenu from './SidebarMenu';

const gold = '#b58b3c';

function HomeHeader() {
  const navigation = useNavigation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const cartCount = useAppSelector(state => state.cart.totalQuantity);
  const wishlistCount = useAppSelector(state => state.wishlist.items.length);

  return (
    <>
      <View className="flex-row items-center justify-between px-6 pt-1 pb-0">
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-10 w-10 items-center justify-center rounded-full"
          onPress={() => setIsSidebarVisible(true)}
        >
          <Menu size={24} color="#1d1b18" strokeWidth={2} />
        </TouchableOpacity>

        <View className="items-center">
          <Gem size={15} color={gold} strokeWidth={1.7} />
          <Text style={styles.brandTitle}>Shree</Text>
          <Text style={styles.brandSubtitle}>Yamunaji Jewellers</Text>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity activeOpacity={0.8} className="mr-1 h-10 w-10 items-center justify-center rounded-full">
            <Search size={21} color="#1d1b18" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Wishlist')}
            className="relative mr-1 h-10 w-10 items-center justify-center rounded-full"
          >
            <Heart size={21} color="#1d1b18" strokeWidth={2} />
            {wishlistCount > 0 ? (
              <View className="absolute right-0 top-0 h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c79a3b] px-1">
                <Text className="text-[10px] font-bold text-white">
                  {wishlistCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Cart')}
            className="relative h-10 w-10 items-center justify-center rounded-full"
          >
            <ShoppingBag size={21} color="#1d1b18" strokeWidth={2} />
            {cartCount > 0 ? (
              <View className="absolute right-0 top-0 h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c79a3b] px-1">
                <Text className="text-[10px] font-bold text-white">{cartCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <SidebarMenu
        onClose={() => setIsSidebarVisible(false)}
        visible={isSidebarVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  brandTitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    marginTop: 3,
    fontSize: 27,
    lineHeight: 31,
    color: '#1e1b18',
    letterSpacing: 5,
  },
  brandSubtitle: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    marginTop: 3,
    fontSize: 8,
    lineHeight: 10,
    color: gold,
    letterSpacing: 3.5,
  },
});

export default HomeHeader;
