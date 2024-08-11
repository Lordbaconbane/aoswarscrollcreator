import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { abilitiesSlice } from "../components/Abilities/AbilitiesSlice";
import { characteristicSlice } from "../components/Characteristics/CharacteristicsSlice";
import { factionSlice } from "../components/GrandAlliances/GrandAlliancsSlice";
import { keywordsSlice } from "../components/Keywords/KeywordsSlice";
import { loadoutSlice } from "../components/Loadouts/LoadoutSlice";
import { warscrollCardSlice } from "../components/WarscrollCard/WarscrollCardSlice";
import { weaponsSlice } from "../components/Weapons/WeaponsSlice";

// Combine reducers
const rootReducer = combineReducers({
  faction: factionSlice.reducer,
  warscroll: warscrollCardSlice.reducer,
  characteristics: characteristicSlice.reducer,
  keywords: keywordsSlice.reducer,
  weapons: weaponsSlice.reducer,
  abilities: abilitiesSlice.reducer,
  loadout: loadoutSlice.reducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

// Persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
