const React = require('react');
const { Text, TouchableOpacity, View } = require('react-native');
const { Search } = require('lucide-react-native');

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

module.exports = SearchBar;
