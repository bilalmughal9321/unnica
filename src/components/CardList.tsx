import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import CrediCard from './Card';
import {useDispatch} from 'react-redux';

interface cardListProps {}

const cardData = [
  {
    id: '1',
    background: 'blue',
    number: '0000 0000 0000 0001',
    name: 'Bilal',
    expiry: '12/24',
    cvc: '123',
  },
  {
    id: '2',
    background: 'purple',
    number: '0000 0000 0000 0002',
    name: 'Ali',
    expiry: '01/25',
    cvc: '456',
  },
  {
    id: '3',
    background: 'golden',
    number: '0000 0000 0000 0003',
    name: 'Sara',
    expiry: '11/23',
    cvc: '789',
  },
];

const CreditCardListScreen: React.FC<cardListProps> = ({}) => {
  const dispatch = useDispatch();

  const handleCardPress = (card: {
    id: string;
    background: string;
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  }) => {
    console.log(`Card pressed:`, card);

    dispatch({
      type: 'SELECTED_CARD',
      cardDetails: {
        background: card.background,
        number: card.number,
        name: card.name,
        expiry: card.expiry,
        cvc: card.cvc,
      },
    });
  };

  return (
    <View style={styles.container}>
      {cardData.map(item => {
        return (
          <CrediCard
            key={item.id}
            cardDetails={{
              background: item.background,
              number: item.number,
              name: item.name,
              expiry: item.expiry,
              cvc: item.cvc,
            }}
            onCardPress={() => handleCardPress(item)}
          />
        );
      })}

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
