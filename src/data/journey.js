// The whole weekend lives here. Every screen (desktop map + mobile deck) reads
// from this one array, so adding photos or editing copy only happens in this file.
//
// Photo path convention:  /photos/{event}-{outfit}-{alex|natalie|together}.jpg
// Drop real images into public/photos/ with those names and PhotoSlot swaps the
// placeholder for the real <img> automatically. Missing files stay as placeholders.

// Build the three-outfit / nine-photo structure for one event without repeating
// the path strings nine times each.
function outfitsFor(eventId) {
  return [1, 2, 3].map((outfit) => ({
    alex: `photos/${eventId}-${outfit}-alex.jpg`,
    natalie: `photos/${eventId}-${outfit}-natalie.jpg`,
    together: `photos/${eventId}-${outfit}-together.jpg`,
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
    caption: 'Landed & loose — exploring before the disco lights come on.',
    outfits: outfitsFor(2),
  },
  {
    id: 3,
    day: 'Thursday',
    event: 'PJs',
    emoji: '🌙',
    caption: 'Slipping Through My Fingers… into cozy pajamas. Night one, wine in hand.',
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
    caption: 'Chiquitita, take it easy — a casual afternoon between tastings.',
    outfits: outfitsFor(5),
  },
  {
    id: 6,
    day: 'Friday',
    event: 'Bathing Suits',
    emoji: '👙',
    caption: 'Lay All Your Love (of poolside lounging) On Me. Sun, spritz, sparkle.',
    outfits: outfitsFor(6),
  },
  {
    id: 7,
    day: 'Saturday',
    event: 'Pickleball',
    emoji: '🎾',
    caption: 'Take a Chance on Me — dinking our way to victory. Sporty & cute.',
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
    caption: 'Thank You for the Music. One last stroll before goodbye.',
    outfits: outfitsFor(9),
  },
]

// The three photos inside an outfit, in the order the mobile deck swipes through them.
export const roles = ['alex', 'natalie', 'together']
export const roleLabels = { alex: 'Alex', natalie: 'Natalie', together: 'Together' }

export const intro = {
  title: 'Here We Go Again',
  subtitle: "Emily's Bachelorette · Napa Valley",
  tagline: 'Gimme! Gimme! Gimme! a weekend in wine country 🪩🍷',
}

export const outro = {
  title: 'Super Trouper',
  subtitle: 'The weekend of a lifetime for our Dancing Queen, Emily',
  tagline: '💃🪩🍷',
}
