const sample = [
  {
   name: 'Jake',
   class: 'Warrior',
   armor_class: 17,
   hit_points: 60,
   init: 1,
   perception: 10,
   speed: 30
  }, {
   name: 'Brooks',
   class: 'Bard',
   armor_class: 15,
   hit_points: 55,
   init: 1,
   perception: 15,
   speed: 30
  }, {
   name: 'Spencer',
   class: 'Wizard',
   armor_class: 14,
   hit_points: 50,
   init: 2,
   perception: 15,
   speed: 25
  }
]

const playersReducer = (state = sample, action) => {
  if (action.type === 'ADD_PLAYER') {
    return [...state, action.payload];
  }
  return state;
};

export default playersReducer;
