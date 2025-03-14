import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import countries from '../Constant/Countries.json';

// Country interface define karna
interface Country {
  name: string;
  dialling_code: string;
}

// Sample country data

interface CountryCodePickerProps {
  visible: boolean;
  onSelect: (code: string) => void;
  onClose: () => void;
}

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  visible,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (item: string) => {
    setSearch('');
    onSelect(item);
  };

  const handleClose = () => {
    setSearch('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton1}
            onPress={() => handleClose()}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Search country"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={item => `${item.name}`}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelect(item.dialling_code)}>
                <Text style={styles.countryItem}>
                  {item.flag} {item.name} ({item.dialling_code})
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => handleClose()}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styling ke liye ek example stylesheet
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0)', // Semi-transparent background
  },
  modalContainer: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // Yahan par marginTop ya paddingTop set karein
    marginTop: 170, // Adjust karein according to your requirement
  },
  closeButton1: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  searchInput: {
    marginVertical: 20,
    // paddingBottom: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    borderRadius: 5,
  },
  countryItem: {
    padding: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  closeButton: {
    padding: 10,
    textAlign: 'center',
    color: 'red',
    marginBottom: 50,
  },
});

export default CountryCodePicker;
