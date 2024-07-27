export enum AbilityType {
  default = "Standard",
  command = "Command",
  prayer = "Prayer",
  spell = "Spell",
}

export enum AbilityTypeIcon {
  none = "",
  command = "src/assets/icons/CommandIcon.png",
  prayer = "src/assets/icons/PrayerIcon.png",
  spell = "src/assets/icons/SpellIcon.png",
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
  start_deployment = "src/assets/Banners/Ability_Banner_StartDeploy.png",
  hero = "src/assets/Banners/Ability_Banner_Hero.png",
  move = "src/assets/Banners/Ability_Banner_Movement.png",
  shoot = "src/assets/Banners/Ability_Banner_Shooting.png",
  charge = "src/assets/Banners/Ability_Banner_Charge.png",
  combat = "src/assets/Banners/Ability_Banner_Combat.png",
  end = "src/assets/Banners/Ability_Banner_EndOfTurn.png",
  defensive = "src/assets/Banners/Ability_Banner_Defensive.png",
}

export const AbilityIcon = [
  "Battle Damaged",
  "Control Ability",
  "Defensive Ability",
  "Movement Ability",
  "Offensive Ability",
  "Rallying Ability",
  "Shooting Ability",
  "Special Ability",
];

export enum AbilityIconPath {
  battleDamagedWeaponPath = "src/assets/icons/BattleDamaged_WeaponIcon.png",
  battleDamagedAbilityPath = "src/assets/icons/BattleDamaged_AbilityIcon.png",
  controlIconPath = "src/assets/icons/ControlIcon.png",
  defensiveIconPath = "src/assets/icons/DefensiveIcon.png",
  movementIconPath = "src/assets/icons/MovementIcon.png",
  OffensiveIconPath = "src/assets/icons/OffensiveIcon.png",
  rallyingIconPath = "src/assets/icons/RallyingIcon.png",
  shootingIconPath = "src/assets/icons/ShootingIcon.png",
  specialIconPath = "src/assets/icons/SpecialIcon.png",
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
  "Any Movement Phase",
  "Any Shooting Phase",
  "Deployment Phase",
  "End of Any Turn",
  "Enemy Movement Phase",
  "Passive",
  "Reaction: Opponent declared an ATTACK ability",
  "Reaction: Opponent declared a Spell ability",
  "Reaction: You declared a Charge ability for this unit",
  "Reaction: This unit was picked as the target of a non-Core ability",
  "Reaction: You declared a Fight ability for this unit",
  "Reaction: You declared an ATTACK ability",
  "Your Charge Phase",
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
