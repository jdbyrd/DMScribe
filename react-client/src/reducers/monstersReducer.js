const sample = [
  {
    name: 'Giant Rat',
    armor_class: 12,
    hit_points: 7,
    init: 1,
    strength: 7,
    dexterity: 15,
    constitution: 11,
    wisdom: 10,
    charisma: 4,
    image: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/538/1000/1000/636376332197953299.jpeg"
  }, {
    name: 'Bat',
    armor_class: 12,
    hit_points: 1,
    init: 0,
    strength: 2,
    dexterity: 15,
    constitution: 8,
    wisdom: 12,
    charisma: 4,
    image: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/18/305/1000/1000/636379812593010967.jpeg"
  }, {
    name: 'Bugbear',
    armor_class: 16,
    hit_points: 27,
    init: 1,
    strength: 15,
    dexterity: 14,
    constitution: 13,
    wisdom: 11,
    charisma: 9,
    image: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/221/315/315/636252765234633232.jpeg"
  }
]

const monstersReducer = (state = sample, action) => {
  if (action.type === 'ADD_MONSTER') {
    // var updated = action.payload.map((monster, index) => {
    //   monster._id.concat(index);
    //   return monster; 
    // })
    // console.log(updated)
      action.payload.id = action.payload._id.concat(state.length);
      return [...state, action.payload];

  } else if (action.type === 'DELETE_MONSTER') {
      const index = state.findIndex(monster => monster.id === action.payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];

  } else if (action.type === 'ADD_MONSTER_IMG') {
      const index = state.findIndex(monster => monster.id === action.payload.id);
      return [...state.slice(0, index), {...state[index], image: action.payload.url}, ...state.slice(index + 1)];
  } else if (action.type === 'CLEAR_MONSTERS') {
      return action.payload;
  }
  return state;
};

export default monstersReducer;
