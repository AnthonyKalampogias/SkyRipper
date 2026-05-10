# SkyRipper 🌀

**A structured, open JSON dataset of every Skylander character — free for anyone to use.**

No scraping required. No API keys. Just grab the data and build something cool.

> Made with love by a solo dev and Skylanders fan. If this saved you time, you're welcome to [buy me a coffee ☕](https://buymeacoffee.com/kalampogias) — but absolutely no pressure.

---

## What's in here?

Clean, structured JSON data for every playable Skylander across all six mainline games, scraped and parsed from the [Skylanders Wiki](https://skylanders.fandom.com).

Each character includes:

- Identity — name, species, gender, element, role classification
- Lore — quote, biography, personality, detailed story chapters with images, organized quotes by type
- Gameplay — attacks, abilities with upgrades and soul gems, branching skill paths
- Stats — per-variant health, speed, armor, critical hit, elemental power, and more
- Appearances across games and cameo appearances
- Variants — with per-variant images, type, edition, game, and comprehensive stats
- Metadata — trivia facts, trailer links, wiki URL for reference

---

## Repo structure

```
output/
├── index.json              ← Lightweight index of all characters (start here)
└── characters/
    ├── spyro.json
    ├── chop-chop.json
    ├── gill-grunt.json
    └── ...                 ← One file per character
```

---

## index.json

A lightweight summary of every character — perfect for building browse/filter UIs without loading all files at once.

```json
[
  {
    "id": "spyro",
    "name": "Spyro",
    "element": "Magic",
    "primary_game": "Skylanders: Spyro's Adventure",
    "species": "Purple Dragon",
    "variant_count": 3,
    "variants": [
      {
        "id": "spyro-s1",
        "name": "Spyro S1",
        "type": "Core",
        "img": "https://static.wikia.nocookie.net/skylanders/images/7/73/Spyro.jpg"
      },
      ...
    ]
  }
]
```

---

## Character file structure

Each `characters/{id}.json` follows this schema:

```json
{
  "id": "spyro",
  "name": "Spyro",
  "species": "Purple Dragon",
  "gender": "Male",
  "element": "Magic",
  "role": "Core Skylander",
  "primary_game": "Skylanders: Spyro's Adventure",
  "appearances": ["Skylanders: Spyro's Adventure", "Skylanders: Giants", "..."],
  "cameos": ["The Kaos Trap", "..."],
  "world": ["Unknown"],
  "quote": "All Fired Up!",
  "description": "...",
  "biography": "...",
  "personality": "...",
  "story": [
    {
      "story_name": "Character Development",
      "content": "...",
      "hasImage": true,
      "imgPath": "https://static.wikia.nocookie.net/skylanders/..."
    }
  ],
  "quotes": [
    {
      "quote_type": "Battle Cries",
      "content": ["All Fired Up!", "To defend all!", "..."]
    }
  ],
  "trivia": ["Throughout the games, Spyro's design features differ..."],
  "trailers": [
    {
      "name": "Skylanders Spyro's Adventure Spyro Trailer",
      "isValid": true,
      "url": "https://skylanders.fandom.com/wiki/File:..."
    }
  ],
  "gameplay": "...",
  "wiki_url": "https://skylanders.fandom.com/wiki/Spyro",
  "abilities": {
    "basic": [{"name": "Dragon's Fire", "content": "...", "price": 0}],
    "basic_upgrades": [{"name": "Long Range Raze", "content": "...", "price": 500}],
    "soulgems": [{"name": "Spyro's Earth Pound", "content": "..."}],
    "paths": [{"path_name": "Inferno Spyro", "abilities": [...]}]
  },
  "variants": [
    {
      "id": "spyro-s1",
      "variant_name": "Spyro S1",
      "edition": "Series 1",
      "type": "Core",
      "game": "Skylanders: Spyro's Adventure",
      "image": "https://static.wikia.nocookie.net/skylanders/...",
      "attacks": ["Dragon's Fire", "Charge", "Dragon's Flight"],
      "stats": [
        {"stat_name": "Health", "stat_value": "280 / 560"},
        {"stat_name": "Speed", "stat_value": "50 / 98"}
      ],
      "wiki_url": "https://skylanders.fandom.com/wiki/Spyro"
    }
  ]
}
```

### Field reference

| Field                | Type     | Notes                                                                   |
| -------------------- | -------- | ----------------------------------------------------------------------- |
| `id`                 | string   | URL-safe slug e.g. `chop-chop`                                          |
| `element`            | string   | One of: Air, Earth, Fire, Water, Life, Undead, Tech, Magic, Light, Dark |
| `role`               | string   | Character classification e.g. "Core Skylander", "Villain"               |
| `primary_game`       | string   | First game the character appeared in                                    |
| `appearances`        | string[] | All games the character appears in                                      |
| `cameos`             | string[] | Media/games where character appears but isn't playable                  |
| `story`              | object[] | Story chapters with content, images, and narrative                      |
| `quotes`             | object[] | Organized quotes by type (Battle Cries, Book Quotes, etc.)              |
| `trivia`             | string[] | Interesting facts about the character                                   |
| `trailers`           | object[] | Associated trailers with validation status                              |
| `abilities`          | object   | Basic attacks, upgrades, soul gems, and skill paths                     |
| `variants`           | object[] | One entry per physical figure variant                                   |
| `variants[].type`    | string   | Core, Giant, Swap Force, Trap Master, SuperCharger, Sensei              |
| `variants[].edition` | string   | Series 1, Series 2, Legendary, Dark, etc.                               |
| `variants[].stats`   | object[] | Array of stat objects with stat_name and stat_value                     |

---

## Filtering & Accessing Examples

```js
// All Air Skylanders
const air = index.filter((c) => c.element === "Air");

// All Giants
const giants = index.filter((c) => c.variant_types.includes("Giant"));

// All characters from Trap Team
const trapTeam = index.filter(
  (c) => c.primary_game === "Skylanders: Trap Team",
);

// Load full data for one character (including story, abilities, variants)
const spyro = require("./output/characters/spyro.json");
console.log(spyro.story); // Array of story chapters with images
console.log(spyro.quotes); // Organized quotes by type
console.log(spyro.abilities); // Basic attacks, upgrades, soul gems, paths
console.log(spyro.variants); // All figure variants with stats
```

---

## Data quality

The data is parsed from the Skylanders Wiki and is comprehensive and well-structured. Each character includes:

- **Identity & Role**: name, species, gender, element, primary game, role classification
- **Narrative**: quote, biography, personality, detailed story chapters with images, organized quotes by type
- **Gameplay**: attacks per variant, stats (Health, Speed, Armor, Critical Hit, Elemental Power, Strength, Defense, Agility, Luck)
- **Abilities**: basic attacks, purchasable upgrades, soul gem powers, and branching skill paths
- **Metadata**: trivia facts, trailer links, full wiki URL, appearance history across games and cameos
- **Variants**: comprehensive data for each physical figure including edition, type, game, image, and variant-specific stats

Some fields may be empty arrays or contain `null` values when the wiki didn't have that information available. Story images and trailer links are included where available.

Found an issue or missing data? Feel free to open an issue — contributions and corrections are welcome!

---

## Regenerating the index

If you update the character files, you can regenerate `index.json` automatically:

```bash
node generate-index.js
```

This script reads all character files from `output/characters/` and generates an accurate, lightweight index with proper variant counts. Run it anytime you update character data.

---

## Want to extend this?

The dataset currently covers **playable Skylander characters**. Planned future additions:

- [ ] Villains
- [ ] Locations
- [ ] Vehicles (SuperChargers)
- [ ] Traps (Trap Team)
- [ ] Missing info on the data
- [ ] Your call :)

---

## Disclaimer

This project is **unofficial and not affiliated with Activision or Toys for Bob** in any way.

All Skylanders characters, names, and imagery are property of Activision Publishing, Inc. This dataset is intended for fan and educational use only. Data is sourced from the community-maintained [Skylanders Wiki](https://skylanders.fandom.com).

The scraping script used to generate this dataset is not included in this repository to protect the Fandom API from excessive requests.

---

## License

The code and tooling in this repo is MIT licensed. The data itself reflects content from the Skylanders Wiki which is licensed under [CC BY-SA](https://creativecommons.org/licenses/by-sa/3.0/) — please respect that if you redistribute it.
