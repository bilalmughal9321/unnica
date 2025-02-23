import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, TouchableOpacity, View} from 'react-native';
import CreditCardListScreen from '../components/CardList';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/reducer'; // RootState import karein
import NavigationStrings from '../Constant/NavigationStrings';

type CardListScreenProps = StackScreenProps<
  any,
  typeof NavigationStrings.CARD_LIST
>;

interface selectedCard {
  background: string;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

const CardListScreen: React.FC<CardListScreenProps> = ({navigation}) => {
  const [cards, setCard] = useState<selectedCard | null>(null);

  const dispatch = useDispatch();

  const details = useSelector(
    (state: RootState) => state.cardReducer.cardDetails,
  );

  const selectedCard = (card: selectedCard) => {
    console.log('select hua: ', card);

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

    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <CreditCardListScreen onClick={selectedCard} />
    </View>
  );
};

export default CardListScreen;
