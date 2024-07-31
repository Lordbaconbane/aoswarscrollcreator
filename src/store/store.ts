import { abilitiesSlice } from "../components/Abilities/AbilitiesSlice";
import { characteristicSlice } from "../components/Characteristics/CharacteristicsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { factionSlice } from "../components/GrandAlliances/GrandAlliancsSlice";
import { keywordsSlice } from "../components/Keywords/KeywordsSlice";
import { loadoutSlice } from "../components/Loadouts/LoadoutSlice";
import { warscrollCardSlice } from "../components/WarscrollCard/WarscrollCardSlice";
import { weaponsSlice } from "../components/Weapons/WeaponsSlice";

// We created a Redux store
export const store = configureStore({
  reducer: {
    faction: factionSlice.reducer,
    warscroll: warscrollCardSlice.reducer,
    characteristics: characteristicSlice.reducer,
    keywords: keywordsSlice.reducer,
    weapons: weaponsSlice.reducer,
    abilities: abilitiesSlice.reducer,
    loadout: loadoutSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
