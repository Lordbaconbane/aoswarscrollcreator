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
import { setMeleeWeapons, setRangedWeapons } from "../Weapons/WeaponsSlice";
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
        if (data.MeleeWeaponStats) dispatch(setMeleeWeapons(data.meleeWeaponStats));
        if (data.RangedWeaponStats) dispatch(setRangedWeapons(data.rangedWeaponStats));

        // Keywords
        if (data.keywords.keywordAbilities) dispatch(setKeywordAbility(data.keywords.keywordAbilities));
        if (data.keywords.keywordIdentities) dispatch(setKeywordIdentity(data.keywords.keywordIdentities));
        console.log(data.keywords.keywordAbilities);
        console.log(data.keywords.keywordIdentities);

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
