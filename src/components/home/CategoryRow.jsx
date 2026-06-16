import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { iconMap } from './iconMap';

const gold = '#c08d39';

function CategoryRow({ items }) {
  const navigation = useNavigation();

  return (
    <View className="mx-2 mt-6 flex-row justify-between px-2">
      {items.map(item => {
        const Icon = iconMap[item.icon];

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Categories')}
            className="items-center"
          >
            <View className="h-[50px] w-[50px] items-center justify-center rounded-full bg-[#f2ede7]">
              <Icon size={20} color={gold} strokeWidth={1.8} />
            </View>
            <Text className="mt-3 text-[10px] font-medium text-[#3c3834]">
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CategoryRow;
