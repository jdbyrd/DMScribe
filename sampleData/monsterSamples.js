window.monsterSamples = [{
	"name": "Acolyte",
	"armor_class": 10,
	"hit_points": 9,
	"strength": 10,
	"dexterity": 10,
	"constitution": 10,
	"intelligence": 10,
	"wisdom": 14,
	"charisma": 11,
	"actions": [
		{
			"damage_dice": "1d4",
			"attack_bonus": 2,
			"desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
			"name": "Club"
		}
	]
}, {
	"name": "Basilisk",
	"armor_class": 12,
	"hit_points": 52,
	"strength": 16,
	"dexterity": 8,
	"constitution": 15,
	"intelligence": 2,
	"wisdom": 8,
	"charisma": 7,
	"actions": [
		{
			"damage_bonus": 3,
			"damage_dice": "2d6 + 2d6",
			"attack_bonus": 5,
			"desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.",
			"name": "Bite"
		}
	]
}, {
	"name": "Cave Bear",
	"armor_class": 12,
	"hit_points": 42,
	"strength": 20,
	"dexterity": 10,
	"constitution": 16,
	"intelligence": 2,
	"wisdom": 13,
	"charisma": 7,
	"actions": [
		{
			"attack_bonus": 0,
			"desc": "The bear makes two attacks: one with its bite and one with its claws.",
			"name": "Multiattack"
		},
		{
			"damage_bonus": 5,
			"damage_dice": "1d8",
			"attack_bonus": 7,
			"desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage.",
			"name": "Bite"
		},
		{
			"damage_bonus": 5,
			"damage_dice": "2d6",
			"attack_bonus": 7,
			"desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
			"name": "Claws"
		}
	]
}]