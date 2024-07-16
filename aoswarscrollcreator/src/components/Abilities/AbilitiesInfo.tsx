export enum AbilityType {
  default = "default",
  command = "Command",
  prayer = "prayer",
  spell = "spell",
}

export enum AbilityPhaseColor {
  start = "black",
  hero = "darkGoldenRod",
  move = "gray",
  shoot = "darkblue",
  charge = "darkorange",
  combat = "darkred",
  end = "indigo",
}

export const AbilityTiming = [
  "Any Charge Phase",
  "Any Combat Phase",
  "Any Movement Phase",
  "Any Shooting Phase",
  "Deployment Phase",
  "End of Any Turn",
  "Enemy Movement Phase",
  "Passive",
  "Reaction: Opponent declard an ATTACK ability,",
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
