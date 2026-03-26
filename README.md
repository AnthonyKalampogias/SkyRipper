# SkyRipper 🌀

**A structured, open JSON dataset of every Skylander character — free for anyone to use.**

No scraping required. No API keys. Just grab the data and build something cool.

> Made with love by a solo dev and Skylanders fan. If this saved you time, you're welcome to [buy me a coffee ☕](https://buymeacoffee.com/kalampogias) — but absolutely no pressure.

---

## What's in here?

Clean, structured JSON data for every playable Skylander across all six mainline games, scraped and parsed from the [Skylanders Wiki](https://skylanders.fandom.com).

Each character includes:

- Identity — name, species, gender, element
- Lore — quote, biography, personality, story
- Gameplay — attacks, stats (speed, armor, critical hit, elemental power)
- Appearances across games
- Variants — with per-variant images, type, edition, and stats
- Wiki URL for reference

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
    "variant_count": 3,
    "variant_types": ["Core"],
    "variant_ids": ["spyro", "dark-spyro", "legendary-spyro"],
    "image": "https://static.wikia.nocookie.net/skylanders/..."
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
  "species": "Dragon",
  "gender": "Male",
  "element": "Magic",
  "primary_game": "Skylanders: Spyro's Adventure",
  "appearances": ["Skylanders: Spyro's Adventure", "Skylanders: Giants", "..."],
  "cameos": null,
  "world": ["Skylands"],
  "quote": "All Fired Up!",
  "description": "...",
  "biography": "...",
  "personality": "...",
  "story": "...",
  "wiki_url": "https://skylanders.fandom.com/wiki/Spyro",

  "variants": [
    {
      "id": "spyro",
      "variant_name": "Spyro",
      "edition": "Series 1",
      "type": "Core",
      "game": "Skylanders: Spyro's Adventure",
      "image": "https://static.wikia.nocookie.net/skylanders/...",
      "attacks": ["Fire Breath", "Horn Charge", "Dragon Flight"],
      "stats": {
        "speed": 50,
        "armor": 18,
        "critical_hit": 30,
        "elemental_power": 25,
        "strength": 60,
        "defense": 50,
        "agility": 90,
        "luck": 60
      },
      "wiki_url": "https://skylanders.fandom.com/wiki/Spyro"
    }
  ]
}
```

### Field reference

| Field                | Type           | Notes                                                                   |
| -------------------- | -------------- | ----------------------------------------------------------------------- |
| `id`                 | string         | URL-safe slug e.g. `chop-chop`                                          |
| `element`            | string         | One of: Air, Earth, Fire, Water, Life, Undead, Tech, Magic, Light, Dark |
| `primary_game`       | string         | First game the character appeared in                                    |
| `appearances`        | string[]       | All games the character appears in                                      |
| `variants`           | object[]       | One entry per physical figure variant                                   |
| `variants[].type`    | string         | Core, Giant, Swap Force, Trap Master, SuperCharger, Sensei              |
| `variants[].edition` | string         | Series 1, Series 2, Legendary, Dark, etc.                               |
| `stats`              | object \| null | null when not available on the wiki                                     |

---

## Filtering examples

```js
// All Air Skylanders
const air = index.filter((c) => c.element === "Air");

// All Giants
const giants = index.filter((c) => c.variant_types.includes("Giant"));

// All characters from Trap Team
const trapTeam = index.filter(
  (c) => c.primary_game === "Skylanders: Trap Team",
);

// Load full data for one character
const spyro = require("./output/characters/spyro.json");
```

---

## Data quality

The data is parsed from the Skylanders Wiki and is generally accurate but not guaranteed to be perfect. Some fields may be `null` when the wiki page didn't have that information structured in a way the parser could read.

Known limitations:

- `stats` may be `null` for characters with non-standard wiki pages
- Some variant images may point to placeholder or element icon images
- Story characters (e.g. Cy) are included as they appear in the Skylanders category on the wiki

Found an issue? Open one — contributions and corrections are welcome.

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
