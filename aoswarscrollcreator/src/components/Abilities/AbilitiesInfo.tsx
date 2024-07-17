export enum AbilityType {
  default = "Standard",
  command = "Command",
  prayer = "prayer",
  spell = "spell",
}

export enum AbilityPhaseColor {
  start_deployment = "black",
  hero = "darkGoldenRod",
  move = "gray",
  shoot = "darkblue",
  charge = "darkorange",
  combat = "darkred",
  end = "indigo",
  defensive = "darkgreen",
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

export const AbilityPhase = [
  "Start of Turn",
  "Hero Phase",
  "Movement Phase",
  "Shooting Phase",
  "Charge Phase",
  "Combat Phase",
  "Combat Phase",
  "End of Turn",
  "Defensive",
];

export const AbilityUsageRestrictions = [
  "Once Per Turn (Army)",
  "Once Per Battle (Army)",
  "Once Per Battle",
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
  "Reaction: Opponent declared an ATTACK ability,",
  "Reaction: Opponent declared a Spell ability",
  "Reaction: You declared a Charge ability for this unit",
  "Reaction: This unit was picked as the target of a non-Core ability",
  "Reaction: You declared a Fight ability for this unit",
  "Reaction: You declared an ATTACK ability",
  "Your Charge Phase",
  "Your Hero Phase",
  "Your Movement Phase",
  "Your Shooting Phase",
  "Your Shooting Phase",
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
