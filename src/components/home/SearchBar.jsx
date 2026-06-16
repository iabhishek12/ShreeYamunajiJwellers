import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Search } from 'lucide-react-native';

function SearchBar() {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="mx-4 mt-1 flex-row items-center rounded-[16px] border border-[#e8dfd2] bg-white px-5 py-4"
    >
      <Search size={19} color="#73706a" strokeWidth={2} />
      <Text className="ml-4 text-[13px] text-[#8c877f]">
        Search for rings, earrings, necklaces...
      </Text>
      <View className="flex-1" />
    </TouchableOpacity>
  );
}

export default SearchBar;
