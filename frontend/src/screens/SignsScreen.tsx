import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import trafficSignsData from '../data/traffic_signs.json';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/ummugulsunn/ehliyet-rehberim/main/';

export default function SignsScreen() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(trafficSignsData[0].categoryName);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategoryData = trafficSignsData.find(cat => cat.categoryName === selectedCategory);

  const filteredSigns = currentCategoryData?.signs.filter(sign => 
    sign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sign.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const renderSignItem = ({ item }: { item: any }) => (
    <View style={styles.signCard}>
      <Image 
        source={{ uri: `${GITHUB_RAW_BASE}${item.imageUrl}` }} 
        style={styles.signImage} 
        resizeMode="contain"
      />
      <View style={styles.signInfo}>
        <Text style={styles.signName}>{item.name}</Text>
        <Text style={styles.signDesc}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {trafficSignsData.map((cat, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.categoryBtn, selectedCategory === cat.categoryName && styles.categoryBtnActive]}
              onPress={() => setSelectedCategory(cat.categoryName)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat.categoryName && styles.categoryTextActive]}>
                {cat.categoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder={t('signs_search_placeholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List */}
      <FlatList 
        data={filteredSigns}
        keyExtractor={item => item.id}
        renderItem={renderSignItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  categoriesWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesContainer: {
    padding: 10,
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  categoryBtnActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#666',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E9F2',
  },
  listContainer: {
    padding: 15,
    gap: 15,
  },
  signCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  signImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  signDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});
