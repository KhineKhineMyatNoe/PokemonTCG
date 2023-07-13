import {instance} from './baseURL';
import {pokeSetObj} from './pokeSet';

export interface ResultOfSearch {
  data: ResultObj[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}
interface AttackObj {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weak {
  type: string;
  value: string;
}
interface legalities {
  unlimited: string;
  expanded: string;
}
interface images {
  small: string;
  large: string;
}
interface holofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number;
}

interface prices {
  holofoil: holofoil;
}
interface NewSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
    expanded: string;
  };
}

export interface ResultObj {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesTo: string[];
  rules: string[];
  attacks: AttackObj[];
  weaknesses: Weak[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: NewSet;
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers: number[];
  legalities: legalities[];
  images: images;
  tcgplayer: {
    url: string;
    updatedAt: string;
    prices: prices;
  };
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      germanProLow: number;
      suggestedPrice: number;
      reverseHoloSell: number;
      reverseHoloLow: number;
      reverseHoloTrend: number;
      lowPriceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    };
  };
}

export interface SearchObj {
  name: string;
  types: string;
  set: string;
  rarities: string;

  page: number;
  pageSize: number;
}

export const searchPoke = async (data: SearchObj) => {
  console.log(' SErach ' + JSON.stringify(data));
  try {
    const response = await instance.get('cards', {
      params: {
        // q: `types:${data.types} rarities:${data.rarities}`,
        q: `name:${data.name}`,
        // name: 'Pokemon',
        // types: data.types,
        // set: data.set,
        // rarities: data.rarities,
        // page: data.page,
        // pageSize: data.pageSize,
      },
    });
    console.log(JSON.stringify(instance.getUri));

    if (response.status == 200) {
      return response.data as ResultOfSearch;
    }
  } catch (error) {
    throw error;
  }
};

// export const searchPoke = (data: SearchObj) => {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//     },
//   };

//   fetch('https://api.pokemontcg.io/v2/cards?name=Pikachu', options)
//     .then(response => response.json())
//     .then(response => {
//       console.log(' log ' + JSON.stringify(response));
//       if (response) {
//         console.log(' recommand ' + JSON.stringify(response));
//         return response.data;
//         if (response.results) {
//         }
//       } else {
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
