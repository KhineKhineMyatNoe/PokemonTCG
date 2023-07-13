import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ListRenderItem,
  Alert,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import DropDownPicker from 'react-native-dropdown-picker';
import {PhoneHeight, PhoneWidth} from '../config';
import DropdownIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import HeadText from '../components/HeadText';
import SearchTextInput from '../components/SearchTextInput';
import {useMutation, useQuery} from '@tanstack/react-query';
import {PokemonTypes, pokeTypeApi} from '../apis/pokeType';
import {PokemonRarity, pokeRarityApi} from '../apis/pokeRarity';
import {PokemonSet, pokeSetApi, pokeSetObj} from '../apis/pokeSet';
import DropDownComponent from '../components/DropDownComponent';
import {Dropdown} from 'react-native-element-dropdown';
import {ResultObj, SearchObj, searchPoke} from '../apis/searchPoke';
import CardComponent from '../components/CardComponent';

interface Props {
  navigation: any;
}
interface DropdownTypeObj {
  label: string;
  value: string;
}

type DropdownArray = DropdownTypeObj[];

type CardListArray = ResultObj[];

const Home: React.FC<Props> = ({navigation}: Props) => {
  const typeQuery = useQuery({
    queryKey: ['types'],
    queryFn: pokeTypeApi,
    retry: 1,
    refetchOnMount: false,
  });
  const rarityQuery = useQuery({
    queryKey: ['rarities'],
    queryFn: pokeRarityApi,
    retry: 1,
    refetchOnMount: false,
  });

  const setQuery = useQuery({
    queryKey: ['sets'],
    queryFn: pokeSetApi,
    retry: 1,
    refetchOnMount: false,
  });

  const [name, setName] = useState('');

  const [typeList, settypeList] = useState<DropdownArray>([]);

  const [selectedType, setSelectedType] = useState<string>('');
  const [rarity, setRarity] = useState<DropdownArray>([]);
  const [selectedRarity, setselectedRarity] = useState('');
  const [pokeSet, setpokeSet] = useState<DropdownArray>([]);
  const [selectedSet, setselectedSet] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(12);
  const [cardList, setcardList] = useState<ResultObj[]>([]);

  const createQuestionMutation = useMutation({
    mutationFn: searchPoke,
    onSuccess: (result, varaiables) => {
      if (result?.data) {
        setcardList(result.data);
      }
      console.log(JSON.stringify(result?.data));

      // Alert.alert('Question created successfully');
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (typeQuery.data && typeQuery.data.length > 0) {
      var newAr: DropdownArray = [];
      typeQuery.data.map((val, index) =>
        newAr.push({
          label: val,
          value: val,
        }),
      );
      settypeList([...newAr]);
    }
  }, [typeQuery.data]);

  useEffect(() => {
    if (rarityQuery.data && rarityQuery.data.length > 0) {
      var newAr: DropdownArray = [];
      rarityQuery.data.map((val, index) =>
        newAr.push({
          label: val,
          value: val,
        }),
      );
      setRarity([...newAr]);
    }
  }, [rarityQuery.data]);

  useEffect(() => {
    const data: SearchObj = {
      name: name,
      types: selectedType,
      set: selectedSet,
      rarities: selectedRarity,

      page: page,
      pageSize: pageSize,
    };

    if (name != '' || selectedType != '') {
      createQuestionMutation.mutate({
        ...data,
      });
    }
  }, [name, selectedType, selectedSet, selectedRarity]);

  useEffect(() => {
    if (setQuery.data && setQuery.data.length > 0) {
      var newAr: DropdownArray = [];
      setQuery.data.map((val, index) =>
        newAr.push({
          label: val.name,
          value: val.name,
        }),
      );
      setpokeSet([...newAr]);
    }
  }, [setQuery.data]);

  const renderType: ListRenderItem<string> | null | undefined = ({
    item,
    index,
  }) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#EEE',
        }}>
        <TouchableOpacity onPress={() => {}}>
          <Text>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCard: ListRenderItem<ResultObj> = ({item, index}) => {
    return (
      <CardComponent
        NameTitle={item.name}
        RarityTxt={item.rarity}
        AmtText={item.cardmarket.prices.averageSellPrice}
        Available={item.set.total}
        ImageView={item.images.small}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <HeadText title="TCG Marketplace" />
      {/* Logo */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',

            borderRadius: 55,
            width: 55,
            height: 55,
            marginTop: -25,
          }}>
          {/* <Image
            resizeMode="stretch"
            source={require('../images/Logo.png')}
            style={{width: 68, height: 42}}
          /> */}
        </View>
        <View style={{position: 'absolute', top: -35}}>
          <Image
            resizeMode="stretch"
            source={require('../images/Logo.png')}
            style={{width: 80, height: 54}}
            // style={{width: 70, height: 44}}
          />
        </View>
      </View>
      {/* filter */}
      <View style={{height: 30}} />
      <View style={{marginHorizontal: 20}}>
        <View>
          <SearchTextInput
            placeholderText="Name..."
            placeholderTextColor={'#BCBBBB'}
            textInputValue={name}
            onType={text => {
              setName(text);
            }}
            TextInputStyle={styles.FilterInput}
          />
        </View>
        {/* filter three */}
        <View style={{flexDirection: 'row', marginTop: 20}}>
          {/* Type */}
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={{
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
            }}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            itemTextStyle={{
              fontFamily: 'Poppins-Regular',

              fontSize: 11,
            }}
            placeholderStyle={{
              fontFamily: 'Poppins-Regular',
              color: '#BCBBBB',
              fontSize: 11,
            }}
            data={typeList}
            labelField="label"
            valueField="value"
            placeholder="Type"
            value={selectedType}
            onChange={item => {
              setSelectedType(item.value);
            }}
          />

          {/* <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 30,
                backgroundColor: 'white',
                maxHeight: PhoneHeight / 2,
              }}>
              <FlatList
                data={typeList}
                renderItem={renderType}
                keyExtractor={(item, index) => index.toString()}
              />
           */}

          {/* <TouchableOpacity onPress={() => {}} style={styles.bgDropdownFilter}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#BCBBBB',
                fontSize: 11,
              }}>
              Type
            </Text>
            <View style={{width: 2}} />
            <DropdownIcon name="chevron-down" size={16} color={'#BCBBBB'} />
          </TouchableOpacity> */}
          <View style={{width: 20}} />
          {/* Rarity */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={{
              fontFamily: 'Poppins-Regular',
              color: '#BCBBBB',
              fontSize: 11,
            }}
            selectedTextStyle={{
              fontFamily: 'Poppins-Regular',

              fontSize: 11,
            }}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            itemTextStyle={{
              fontFamily: 'Poppins-Regular',

              fontSize: 11,
            }}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={rarity}
            labelField="label"
            valueField="value"
            placeholder="Rarity"
            value={selectedRarity}
            onChange={item => {
              setselectedRarity(item.value);
            }}
          />
          <View style={{width: 20}} />
          {/* Set  */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={{
              fontFamily: 'Poppins-Regular',
              color: '#BCBBBB',
              fontSize: 11,
            }}
            selectedTextStyle={{
              fontFamily: 'Poppins-Regular',

              fontSize: 11,
            }}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            itemTextStyle={{
              fontFamily: 'Poppins-Regular',

              fontSize: 11,
            }}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={pokeSet}
            labelField="label"
            valueField="value"
            placeholder="Set"
            value={selectedSet}
            onChange={item => {
              setselectedSet(item.value);
            }}
          />
        </View>
      </View>
      {/* {typeList && typeList.length > 0
        ? typeList.map(item => <Text>{item}</Text>)
        : null} */}

      {/* {rarity && rarity.length > 0
        ? rarity.map(item => <Text>{item}</Text>)
        : null} */}

      {/* filter */}
      <View style={{height: 50}} />

      <FlatList
        data={cardList}
        renderItem={renderCard}
        keyExtractor={(item: ResultObj, index: number) => index.toString()}
        //style={{backgroundColor: 'blue'}}
      />
      <LinearGradient
        colors={['red', 'yellow', 'green']}
        start={{x: 0.7, y: 0}}
        style={styles.linearGradient}>
        {/* <Text style={styles.buttonText}>
          Sign in with Facebook
        </Text> */}
      </LinearGradient>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  FilterInput: {
    backgroundColor: 'white',
    height: 35,
    borderRadius: 50,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    fontFamily: 'Poppins-Regular',
    elevation: 2,
    fontSize: 14,
  },
  linearGradient: {
    width: '100%',
    height: 30,
    // flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
  },
  dropdown: {
    backgroundColor: '#fff',
    height: 35,
    paddingHorizontal: 15,
    width: (PhoneWidth - 80) / 3,
    alignSelf: 'center',
    borderRadius: 15,
    color: '#BCBBBB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
