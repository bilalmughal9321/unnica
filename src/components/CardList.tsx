import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CrediCard from './Card';
import {useDispatch} from 'react-redux';
import {formatCardNumber} from '../Utils';

interface selectedCard {
  background: string;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

interface cardListProps {
  onClick: (data: selectedCard) => void;
}

const cardData = [
  {
    id: '1',
    background: 'blue',
    number: '7818840273917491',
    name: 'Bilal',
    expiry: '12/24',
    cvc: '123',
  },
  {
    id: '2',
    background: 'purple',
    number: '8446909470662329',
    name: 'Ali',
    expiry: '01/25',
    cvc: '456',
  },
  {
    id: '3',
    background: 'golden',
    number: '1859397320943794',
    name: 'Sara',
    expiry: '11/23',
    cvc: '789',
  },
  {
    id: '4',
    background: 'blue',
    number: '7649668363275262',
    name: 'Atif',
    expiry: '11/23',
    cvc: '789',
  },
];

const CreditCardListScreen: React.FC<cardListProps> = ({onClick}) => {
  const dispatch = useDispatch();

  const handleCardPress = (card: {
    id: string;
    background: string;
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  }) => {
    onClick(card);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cardData.map(item => {
          return (
            <CrediCard
              key={item.id}
              cardDetails={{
                background: item.background,
                number: formatCardNumber(item.number),
                name: item.name,
                expiry: item.expiry,
                cvc: item.cvc,
              }}
              onCardPress={() => handleCardPress(item)}
            />
          );
        })}
      </ScrollView>
      {/* <FlatList
        data={cardData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.cardWrapper}>
            <CrediCard
              cardDetails={{
                background: item.background,
                number: item.number,
                name: item.name,
                expiry: item.expiry,
                cvc: item.cvc,
              }}
              onCardPress={() => {
                console.log('print');
              }}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    padding: 16,
    height: 200,
  },
  cardWrapper: {
    marginVertical: 10,
  },
});

export default CreditCardListScreen;
