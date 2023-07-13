import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {PhoneWidth} from '../config';

interface Props {
  NameTitle: string;
  RarityTxt: string;
  AmtText: number;
  Available: number;
  ImageView: string;
}
const CardComponent: React.FC<Props> = ({
  NameTitle,
  RarityTxt,
  AmtText,
  Available,
  ImageView,
}: Props) => {
  const [height, setHeight] = useState(0);
  const [cardheight, setcardHeight] = useState(0);

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{zIndex: 1}}
        onLayout={event => setHeight(event.nativeEvent.layout.height)}>
        <Image
          source={{uri: ImageView}}
          style={styles.pokemonImg}
          resizeMode="contain"
        />
      </View>
      <View
        style={styles.cardContainer}
        onLayout={event => setcardHeight(event.nativeEvent.layout.height)}>
        <View style={{height: 75}} />
        <Text style={styles.NameStyle}>{NameTitle}</Text>
        <Text style={styles.Rarity}>{RarityTxt}</Text>
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <View>
            <Text style={styles.Amount}>{'$' + AmtText}</Text>
          </View>
          <View style={{width: 15}} />
          <View>
            <Text style={styles.Available}>{Available + ' left'}</Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: cardheight - 20,
          }}>
          <View style={styles.selectCardBtn}>
            <Text style={styles.selectCardBtn}>Select card</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  NameStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: '#1D1C1C',
  },
  Rarity: {
    color: '#0F6DB0',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  Amount: {
    color: '#6A6969',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  Available: {
    color: '#6A6969',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  pokemonImg: {
    width: 194,
    height: 271,
    //  position: 'absolute',
  },
  cardContainer: {
    backgroundColor: 'white',

    paddingBottom: 30,
    borderRadius: 15,
    width: PhoneWidth - 110,
    alignItems: 'center',
    zIndex: 0,
    // position: 'absolute',
    top: -65,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  selectCardBtn: {
    backgroundColor: '#FDCE29',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
});
export default CardComponent;
