import { Autocomplete, TextField, Chip, AccordionDetails } from "@mui/material";
import { setKeywordAbility, setKeywordIdentity } from "./KeywordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const keywordAbilitiesOptions = [
  "Beast",
  "Cavalry",
  "Champion",
  "champion (1/10)",
  "champion (1/5)",
  "champion (1/8)",
  "champion (1/9)",
  "Endless Spell",
  "Faction Terrain",
  "Fly",
  "Hero",
  "Infantry",
  "Invocation",
  "Manifestation",
  "Monster",
  "Musician (1/10)",
  "Musician (1/20)",
  "Musician (1/3)",
  "Musician (1/4)",
  "Musician (1/5)",
  "Musician (1/6)",
  "Reinforcements",
  "Standard bearer (1/10)",
  "Standard bearer (1/20)",
  "Standard bearer (1/3)",
  "Standard bearer (1/5)",
  "Standard bearer (1/6)",
  "Priest (1)",
  "Priest (2)",
  "Priest (3)",
  "Priest (4)",
  "Unique",
  "Ward (2+)",
  "Ward (3+)",
  "Ward (4+)",
  "Ward (5+)",
  "Ward (6+)",
  "War Machine",
  "Warmaster",
  "Wizard (1)",
  "Wizard (2)",
  "Wizard (3)",
];

const keywordIdentitiesOptions = [
  "Abhorrant",
  "Aelf",
  "Akhelian",
  "Alarith",
  "Arcanite",
  "Beast-Smasher",
  "Beastclaw Raiders",
  "Beastflayers",
  "Beastlord",
  "Beasts of Chaos",
  "Blades Of Khorne",
  "Bloodbound",
  "Bloodthirster",
  "Bonesplittaz",
  "Brute",
  "Cauldron Of Blood",
  "Chaos Furies",
  "Chaos Spawn",
  "Chaos",
  "Cities Of Sigmar",
  "Courtier",
  "Daemon",
  "Darkoath",
  "Daughters Of Khaine",
  "Deadwalkers",
  "Death",
  "Deathbringer",
  "Deathmaster",
  "Deathrattle",
  "Destruction",
  "Disc Of Tzeentch",
  "Disciples Of Tzeench",
  "Duardin",
  "Eshin",
  "Flesh Eater Courts",
  "Fyreslayers",
  "Gargant",
  "Gitmob",
  "Gloomspite Gitz",
  "Gorechosen",
  "Gunnar's Oathsworn",
  "Gutbusters",
  "Hedonites Of Slaanesh",
  "Human",
  "Hurakan",
  "Idoneth Deepkin",
  "Ironjawz",
  "Isharann",
  "Kharadron Overlords",
  "Khinerai",
  "Knights",
  "Kroxigor",
  "Kruleboyz",
  "Kurnothi",
  "Lumineth RealmLords",
  "Maggotkin Of Nurgle",
  "Magmadroth",
  "Masterclan",
  "Maw-Grunta",
  "Moonclan",
  "Mortisan",
  "Moulder",
  "Namarti",
  "Nighthaunt",
  "Ogor Mawtribes",
  "Ogor",
  "Order",
  "Orruk Ironjawz",
  "Orruk KruleBoyz",
  "Ossiarch Bonereapers",
  "Pestilens",
  "Rhinox",
  "Rotbringers",
  "Saurus",
  "Scinari",
  "Seraphon",
  "Serfs",
  "Skaven",
  "Skink",
  "Skryre",
  "Skyfarer",
  "Slann",
  "Slaves To Darkness",
  "Sons Of Behemat",
  "Sons of Hashut",
  "Soulblight Gravelords",
  "Squig",
  "Stormcast Eternals",
  "Sybarite",
  "Sylvaneth",
  "Troggoth",
  "Undivided",
  "Vampire",
  "Vanari",
  "Verminus",
  "Vortex Beast",
  "Warflock",
  "Warmaster",
  "Weapon Team",
];

export default function Keywords() {
  const dispatch = useDispatch();

  const keywordAbilities = useSelector((state: RootState) => state.keywords.keywordAbilities);
  const keywordIdentities = useSelector((state: RootState) => state.keywords.keywordIdentities);

  return (
    <AccordionDetails sx={{ display: "flex", flexWrap: "wrap", maxWidth: "1.0" }}>
      <Autocomplete
        clearIcon={false}
        options={keywordAbilitiesOptions}
        value={keywordAbilities}
        freeSolo
        fullWidth
        multiple
        onChange={(event, value) => {
          console.log(event);
          dispatch(setKeywordAbility(value));
        }}
        renderTags={(value, props) =>
          value.map((option, index) => <Chip label={option} {...props({ index })} />)
        }
        renderInput={(params) => (
          <TextField
            label="Keyword-abilities (Ward (6+), Fly, Infantry, Champion, Musician (1/10), etc"
            {...params}
            id="keyword-abilities"
          />
        )}
      />

      <Autocomplete
        clearIcon={false}
        options={keywordIdentitiesOptions}
        value={keywordIdentities}
        freeSolo
        sx={{ mt: 2 }}
        fullWidth
        multiple
        onChange={(_event, value) => {
          dispatch(setKeywordIdentity(value));
        }}
        renderTags={(value, props) =>
          value.map((option, index) => <Chip label={option} {...props({ index })} />)
        }
        renderInput={(params) => (
          <TextField
            label="Keyword Identities (Grand Alliance, Faction, faction specific unit)"
            {...params}
            id="keyword-identities"
          />
        )}
      />
    </AccordionDetails>
  );
}
