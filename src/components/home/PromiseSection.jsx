import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gem } from 'lucide-react-native';

function PromiseSection({ section }) {
  return (
    <View className="mx-2 mt-8 px-[2px] pb-2 pt-[2px] bg-[#FFF6DF] rounded-lg overflow-hidden">
      <Image
        source={section.image}
        resizeMode="cover"
        className="absolute top-0 left-0 h-full w-full opacity-20"
      />

      <View className="items-center px-2 pb-1 pt-9">
        <Gem size={23} color="#F4A300" strokeWidth={1.8} />

        <Text className="mt-4 text-center text-[11px] font-bold tracking-[3.2px] text-[#F28A00]">
          {section.label}
        </Text>

        <Text style={styles.title} className="mt-4 text-center">
          {section.title}
          <Text style={styles.titleAccent}>{section.accentTitle}</Text>
        </Text>

        <Text className="mt-5 px-[8px] text-center text-[14px] font-medium leading-[28px] text-[#5B5B5B]">
          {section.description}
        </Text>

        <View
          className="mt-6 flex-row overflow-hidden rounded-[18px] border border-[#F4C23D] bg-[#087A34]"
          style={styles.statsCard}
        >
          {section.stats.map((item, index) => (
            <View
              key={item.id}
              className={`flex-1 px-2 py-[15px] ${
                index < section.stats.length - 1 ? 'border-r border-[#F4C23D]' : ''
              }`}
            >
              <Text className="text-center text-[18px] font-bold text-[#F4C23D]">
                {item.value}
              </Text>
              <Text className="mt-[2px] mb-2 text-center text-[11px] leading-[15px] tracking-[0.2px] text-[#FFFFFF]">
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroAsset: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  statsCard: {
    width: '100%',
  },
  title: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 27,
    lineHeight: 34,
    color: '#087A34',
  },
  titleAccent: {
    color: '#B72516',
  },
});

export default PromiseSection;
