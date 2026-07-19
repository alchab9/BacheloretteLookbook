// The whole weekend lives here. Every screen (desktop map + mobile deck) reads
// from this one array, so adding photos or editing copy only happens in this file.
//
// Photo path convention:  /photos/{event}-{outfit}-{alex|natalie|together}.jpg
// Drop real images into public/photos/ with those names and PhotoSlot swaps the
// placeholder for the real <img> automatically. Missing files stay as placeholders.

// Build the three-outfit / nine-photo structure for one event without repeating
// the path strings nine times each.
// `extras` optionally merges per-outfit fields (e.g. a warning) keyed by the
// outfit index (0-2).
function outfitsFor(eventId, extras = {}) {
  return [1, 2, 3].map((outfit, i) => ({
    alex: `photos/${eventId}-${outfit}-alex.jpg`,
    natalie: `photos/${eventId}-${outfit}-natalie.jpg`,
    together: `photos/${eventId}-${outfit}-together.jpg`,
    ...extras[i],
  }))
}

export const events = [
  {
    id: 1,
    day: 'Thursday',
    event: 'Airplane',
    emoji: '✈️',
    caption: 'Money, Money, Money… to Napa we fly. Travel-day glam kicks it off.',
    outfits: outfitsFor(1),
  },
  {
    id: 2,
    day: 'Thursday',
    event: 'Play Clothes',
    emoji: '🌼',
    caption: "Grab your high noon & bottle of wine, it's time to lay all your love on a game table.",
    outfits: outfitsFor(2, {
      2: { warning: "Don't be like Alex! White clothing is reserved for Emily only!" },
    }),
  },
  {
    id: 3,
    day: 'Thursday',
    event: 'PJs',
    emoji: '🌙',
    caption: "Dancing Queens Need Downtime Too. It's Time For Snoozes.",
    outfits: outfitsFor(3),
  },
  {
    id: 4,
    day: 'Friday',
    event: 'Winery',
    emoji: '🍷',
    caption: 'The name of the game is rosé. Swirl, sip, repeat.',
    outfits: outfitsFor(4),
  },
  {
    id: 5,
    day: 'Friday',
    event: 'Play Clothes',
    emoji: '🌸',
    caption: 'Chiquitita, take it easy. A casual evening after tastings.',
    outfits: outfitsFor(5),
  },
  {
    id: 6,
    day: 'Friday',
    event: 'Bathing Suits',
    emoji: '👙',
    caption: 'Waterloo? More like Water-Woo! Pack a swim suit for the hot tub out back.',
    outfits: outfitsFor(6),
  },
  {
    id: 7,
    day: 'Saturday',
    event: 'Pickleball',
    emoji: '🎾',
    caption: 'Take a chance on me, dinking our way to victory! Now\'s the time to show off your dynamic duo costume!',
    outfits: outfitsFor(7),
  },
  {
    id: 8,
    day: 'Saturday',
    event: 'Black Outfit',
    emoji: '🖤',
    caption: 'Voulez-Vous a night out. All black, all disco, all Emily.',
    outfits: outfitsFor(8),
  },
  {
    id: 9,
    day: 'Sunday',
    event: 'Walking Around Town',
    emoji: '🚶‍♀️',
    caption: 'Thank You for the Music. One last day before goodbye.',
    outfits: outfitsFor(9),
  },
]

// The three photos inside an outfit, in the order the mobile deck swipes through them.
export const roles = ['alex', 'natalie', 'together']
export const roleLabels = { alex: 'Alex', natalie: 'Natalie', together: 'Together' }

export const intro = {
  title: "Mamma Mia! Emily's Getting Married!",
  subtitle: "Emily's Bachelorette · Napa Valley",
  tagline: 'Gimme! Gimme! Gimme! A weekend in wine country 🪩🍷',
}

export const outro = {
  title: 'Super Trouper',
  subtitle: 'The weekend of a lifetime for our Dancing Queen, Emily',
  tagline: '💃🪩🍷',
}
