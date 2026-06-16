import React from 'react';
import { Text, View } from 'react-native';
import { iconMap } from './iconMap';

const gold = '#b58b3c';

function AssuranceStrip({ items }) {
  return (
    <View className="mx-4 mt-5 rounded-[18px] border border-[#e6ddcf] bg-white px-2 py-4">
      <View className="flex-row">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <View
              key={item.id}
              className={`flex-1 items-center px-2 ${
                index < items.length - 1 ? 'border-r border-[#eee5d8]' : ''
              }`}
            >
              <Icon size={20} color={gold} strokeWidth={1.8} />
              <Text className="mt-2 text-center text-[8px] font-semibold leading-[11px] text-[#433d38]">
                {item.title}
              </Text>
              <Text className="text-center text-[8px] font-semibold leading-[11px] text-[#433d38]">
                {item.subtitle}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default AssuranceStrip;
