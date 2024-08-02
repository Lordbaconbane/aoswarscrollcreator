export enum AbilityType {
  default = "Standard",
  command = "Command",
  prayer = "Prayer",
  spell = "Spell",
}

export enum AbilityTypeIcon {
  none = "",
  command = "Icons/CommandIcon.png",
  prayer = "Icons/PrayerIcon.png",
  spell = "Icons/SpellIcon.png",
}

export enum AbilityLineColor {
  start_deployment = "black",
  hero = "darkGoldenRod",
  move = "gray",
  shoot = "darkblue",
  charge = "#A36303",
  combat = "darkred",
  end = "indigo",
  defensive = "darkgreen",
}

export enum AbilityBanner {
  start_deployment = "Banners/Ability_Banner_StartDeploy.png",
  hero = "Banners/Ability_Banner_Hero.png",
  move = "Banners/Ability_Banner_Movement.png",
  shoot = "Banners/Ability_Banner_Shooting.png",
  charge = "Banners/Ability_Banner_Charge.png",
  combat = "Banners/Ability_Banner_Combat.png",
  end = "Banners/Ability_Banner_EndOfTurn.png",
  defensive = "Banners/Ability_Banner_Defensive.png",
}

export const defaultAbilityIconWidthHeight = 17;

export enum AbilityIcon {
  battleDamaged = "Battle Damaged",
  control = "Control",
  defensive = "Defensive",
  move = "Movement",
  offensive = "Offensive",
  rally = "Rallying",
  shoot = "Shooting",
  special = "Special",
}

export enum AbilityIconPath {
  battleDamagedWeaponPath = "Icons/BattleDamaged_WeaponIcon.png",
  battleDamagedAbilityPath = "Icons/BattleDamaged_AbilityIcon.png",
  controlIconPath = "Icons/ControlIcon.png",
  defensiveIconPath = "Icons/DefensiveIcon.png",
  movementIconPath = "Icons/MovementIcon.png",
  OffensiveIconPath = "Icons/OffensiveIcon.png",
  rallyingIconPath = "Icons/RallyingIcon.png",
  shootingIconPath = "Icons/ShootingIcon.png",
  specialIconPath = "Icons/SpecialIcon.png",
}

export const AbilityPhase = [
  "Start of Turn",
  "Hero Phase",
  "Movement Phase",
  "Shooting Phase",
  "Charge Phase",
  "Combat Phase",
  "End of Turn",
  "Defensive",
];

export const AbilityUsageRestrictions = [
  "Once Per Turn (Army), ",
  "Once Per Battle (Army), ",
  "Once Per Battle, ",
];

export const AbilityTimingText = [
  "Any Charge Phase",
  "Any Combat Phase",
  "Any Hero Phase",
  "Any Movement Phase",
  "Any Shooting Phase",
  "Deployment Phase",
  "End of Any Turn",
  "End of Enemy Turn",
  "End of Your Turn",
  "Enemy Charge Phase",
  "Enemy Combat Phase",
  "Enemy Hero Phase",
  "Enemy Movement Phase",
  "Enemy Shooting Phase",
  "Passive",
  "Reaction: Opponent declared a Spell ability",
  "Reaction: Opponent declared an ATTACK ability",
  "Reaction: This unit was picked as the target of a non-Core ability",
  "Reaction: You declared a Charge ability for this unit",
  "Reaction: You declared a Fight ability for this unit",
  "Reaction: You declared an ATTACK ability",
  "Start of Any Turn",
  "Start of Enemy Turn",
  "Start of Your Turn",
  "Your Charge Phase",
  "Your Combat Phase",
  "Your Hero Phase",
  "Your Movement Phase",
  "Your Shooting Phase",
];

export const AbilityTimingMutuallyExclusive = [
  "Passive",
  "Reaction: Opponent declared an ATTACK ability",
  "Reaction: Opponent declared a Spell ability",
  "Reaction: You declared a Charge ability for this unit",
  "Reaction: This unit was picked as the target of a non-Core ability",
  "Reaction: You declared a Fight ability for this unit",
  "Reaction: You declared an ATTACK ability",
];

export const AbilityKeywords = [
  "Attack",
  "Banish",
  "Charge",
  "Core",
  "Deploy",
  "Deploy Terrain",
  "Fight",
  "Honour Guard",
  "Move",
  "Prayer",
  "Rampage",
  "Retreat",
  "Run",
  "Shoot",
  "Spell",
  "Summon",
  "Unbind",
  "Unlimited",
];
