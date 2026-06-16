import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { iconMap } from './iconMap';
import { useAppSelector } from '../../store/hooks';

function BottomBar({ items }) {
  const navigation = useNavigation();
  const wishlistCount = useAppSelector(state => state.wishlist.items.length);

  return (
    <View className="border-t border-[#e6dece] bg-[#fbf7f1] px-3 pt-2 pb-6">
      <View className="flex-row justify-between">
        {items.map(item => {
          const Icon = iconMap[item.icon];
          const color = item.active ? '#c08d39' : '#7c7770';

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              onPress={() => {
                if (item.route) {
                  navigation.navigate(item.route);
                }
              }}
              className="flex-1 items-center"
            >
              <View className="relative">
                <Icon size={22} color={color} strokeWidth={1.9} />
                {item.id === 'wishlist' && wishlistCount > 0 ? (
                  <View className="absolute -right-2 -top-2 h-4 min-w-[16px] items-center justify-center rounded-full bg-[#c79a3b] px-1">
                    <Text className="text-[8px] font-bold text-white">
                      {wishlistCount}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text className={`mt-1 text-[9px] ${item.active ? 'font-bold text-[#c08d39]' : 'text-[#7c7770]'}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default BottomBar;
