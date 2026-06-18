import React, { useRef } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Award, ArrowLeft, ArrowRight, Star } from 'lucide-react-native';

function ReviewSwiperSection({ section }) {
  const swiperRef = useRef(null);

  const goToSlide = step => {
    if (!section.reviews.length || !swiperRef.current) {
      return;
    }

    swiperRef.current.scrollBy(step, true);
  };

  return (
    <View className="mx-4 mt-5 mb-4 rounded-[28px] px-[9px] py-[14px] bg-orange-300" style={styles.container}>
      <View className="h-[345px]">
        <Swiper
          ref={ref => {
            swiperRef.current = ref;
          }}
          loop={section.reviews.length > 1}
          autoplay={section.reviews.length > 1}
          autoplayTimeout={3.5}
          loadMinimal
          loadMinimalSize={1}
          showsPagination
          showsButtons={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination}
          removeClippedSubviews
        >
          {section.reviews.map(item => (
            <View key={item.id} className="px-3 py-3">
              <View className="items-center">
                <View className="h-[40px] w-[40px] items-center justify-center rounded-full border border-[#F4C23D] bg-[#FFF6DF]">
                  <Award size={20} color="#087A34" strokeWidth={1.8} />
                </View>

                <Text className="mt-3 text-center text-[9px] font-bold tracking-[2.8px] text-[#000000]">
                  {section.label}
                </Text>

                <View className="mt-[10px] flex-row">
                  {[0, 1, 2, 3, 4].map(index => (
                    <Star
                      key={`${item.id}-star-${index}`}
                      size={15}
                      color="yellow"
                      fill="yellow"
                      strokeWidth={1.6}
                    />
                  ))}
                </View>

                <Text style={styles.quote} className="mt-3 px-3 font-700 text-center">
                  "{item.quote}"
                </Text>

                <View className="mt-5 flex-row items-center">
                  <View className="h-[40px] w-[40px] items-center justify-center rounded-full bg-[#087A34]">
                    <Text style={styles.avatarText}>{item.initials}</Text>
                  </View>
                  <View className="ml-3">
                    <Text className="text-[14px] font-bold text-[#202020]">
                      {item.name}
                    </Text>
                    <Text className="mt-[2px] text-[11px] text-[#5B5B5B]">
                      {item.location} | {item.badge}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#0b63cee7',
    borderWidth: 1,
    borderColor: '#F4C23D',
    shadowColor: '#8A6A1B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 22,
    elevation: 3,
  },
  quote: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 17,
    lineHeight: 28,
    color: '#ffff',
  },
  avatarText: {
    fontFamily: Platform.select({
      ios: 'Baskerville',
      android: 'serif',
      default: 'serif',
    }),
    fontSize: 16,
    color: '#FFFFFF',
  },
  pagination: {
    bottom: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginHorizontal: 4,
    backgroundColor: '#F4D77D',
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 999,
    marginHorizontal: 4,
    backgroundColor: '#087A34',
  },
});

export default ReviewSwiperSection;
