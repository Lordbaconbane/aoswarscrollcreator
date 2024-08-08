import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setKeywordAbility, setKeywordIdentity } from "../Keywords/KeywordsSlice";
import {
  setWarscrollControl,
  setWarscrollHealth,
  setWarscrollMove,
  setWarscrollName,
  setWarscrollSave,
  setWarscrollSubtype,
} from "../Characteristics/CharacteristicsSlice";
import { setAllWeaponNames, setMeleeWeapons, setRangedWeapons } from "../Weapons/WeaponsSlice";
import {
  setFactionName,
  setFactionTemplate,
  setFactionWeaponBanner,
  setGrandAlliance,
} from "../GrandAlliances/GrandAlliancsSlice";
import { setAbilities } from "../Abilities/AbilitiesSlice";
import { setLoadoutBody, setLoadoutPoints } from "../Loadouts/LoadoutSlice";
// Import other slice actions as needed

export const ImportData = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        console.log("Trying");
        const fileContent = e.target?.result as string;
        const data = JSON.parse(fileContent);

        if (!fileContent) {
          console.error("File content is empty");
          return;
        }
        console.log("Parsed Data:", data); // Log the entire parsed object

        // Faction
        if (data.faction.grandAlliance) dispatch(setGrandAlliance(data.faction.grandAlliance));
        if (data.faction.factionName) dispatch(setFactionName(data.faction.factionName));
        if (data.faction.factionTemplate) dispatch(setFactionTemplate(data.faction.factionTemplate));
        if (data.faction.factionWeaponBanner)
          dispatch(setFactionWeaponBanner(data.faction.factionWeaponBanner));

        // Characteristics
        if (data.characteristics.warscrollName)
          dispatch(setWarscrollName(data.characteristics.warscrollName));
        if (data.characteristics.warscrollSubtype)
          dispatch(setWarscrollSubtype(data.characteristics.warscrollSubtype));
        if (data.characteristics.warscrollMove)
          dispatch(setWarscrollMove(data.characteristics.warscrollMove));
        if (data.characteristics.warscrollSave)
          dispatch(setWarscrollSave(data.characteristics.warscrollSave));
        if (data.characteristics.warscrollSave)
          dispatch(setWarscrollControl(data.characteristics.warscrollControl));
        if (data.characteristics.warscrollHealth)
          dispatch(setWarscrollHealth(data.characteristics.warscrollHealth));

        // Weapons
        if (data.weapons.meleeWeaponStats) dispatch(setMeleeWeapons(data.weapons.meleeWeaponStats));
        if (data.weapons.rangedWeaponStats) dispatch(setRangedWeapons(data.weapons.rangedWeaponStats));

        // Weapon names
        if (data.weapons.allWeaponNames) dispatch(setAllWeaponNames(data.weapons.allWeaponNames));

        // Abilities
        if (data.abilities.abilities) dispatch(setAbilities(data.abilities.abilities));

        // Loadouts
        if (data.loadout.body) dispatch(setLoadoutBody(data.loadout.body));
        if (data.loadout.points) dispatch(setLoadoutPoints(data.loadout.points));

        // Keywords
        if (data.keywords.keywordAbilities) dispatch(setKeywordAbility(data.keywords.keywordAbilities));
        if (data.keywords.keywordIdentities) dispatch(setKeywordIdentity(data.keywords.keywordIdentities));

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  const importData = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return { importData, fileInputRef, handleFileChange };
};
