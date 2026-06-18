import React from 'react';
import { Text, View } from 'react-native';
import { iconMap } from './iconMap';

const gold = '#F4C23D';

function AssuranceStrip({ items }) {
  return (
    <View className="mx-4 mt-4 rounded-[18px] border border-[#F4C23D] bg-[#087A34] px-2 py-2">
      <View className="flex-row">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <View
              key={item.id}
              className={`flex-1 items-center px-2 ${
                index < items.length - 1 ? 'border-r border-[#F4C23D]' : ''
              }`}
            >
              <Icon size={20} color={gold} strokeWidth={1.8} />
              <Text className="mt-2 text-center text-[8px] font-semibold leading-[11px] text-[#FFFFFF]">
                {item.title}
              </Text>
              <Text className="text-center text-[8px] font-semibold leading-[11px] text-[#FFFFFF]">
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
