import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { iconMap } from './iconMap';

function BottomBar({ items }) {
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
              className="flex-1 items-center"
            >
              <Icon size={22} color={color} strokeWidth={1.9} />
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
