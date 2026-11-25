/**
 * All copy lives here. VESPÈRE is a placeholder concept brand for this
 * experiment — the watches, prices and specs are invented.
 */

export const brand = {
  name: 'VESPÈRE',
  collection: 'Rain Hours',
  tagline: 'Watches for the wet hours',
};

export const nav = ['Collections', 'Atelier', 'Rain Hours', 'Journal'];

export const hero = {
  // Headline lines: roman parts render as capitals, italic parts stay lower-case.
  headline: [
    [{t: 'Made', i: true}, {t: ' for'}],
    [{t: 'wet nights.'}],
    [{t: 'Worn '}, {t: 'against', i: true}, {t: ' the clock.'}],
  ],
  line: 'A midnight-blue sunburst dial in a 40 mm polished steel case.',
};

export type Product = {
  id: string;
  index: string;
  eyebrow: string;
  name: [string, string];
  material: string;
  description: string;
  image: string;
  specs: [label: string, value: string][];
  price: number;
};

const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

export const products: Product[] = [
  {
    id: 'midnight-hour',
    index: '01',
    eyebrow: 'Dress watch',
    name: ['Midnight', 'Hour'],
    material: 'Polished steel & sunburst dial',
    description:
      'A midnight-blue sunburst dial that goes from ink to cobalt as the light moves, gold baton markers and slim dauphine hands under a domed sapphire crystal.',
    image: media('midnight.webp'),
    specs: [
      ['Case', '40 mm'],
      ['Movement', 'Automatic'],
      ['Water', '50 m'],
    ],
    price: 4800,
  },
  {
    id: 'verdant-tide',
    index: '02',
    eyebrow: 'Sport watch',
    name: ['Verdant', 'Tide'],
    material: 'Brushed steel & emerald dial',
    description:
      'The same quiet case in brushed steel with a fluted crown and an emerald dial the colour of a wet street lamp, on a deep green alligator-grain strap.',
    image: media('verdant.webp'),
    specs: [
      ['Case', '42 mm'],
      ['Power reserve', '70 h'],
      ['Water', '100 m'],
    ],
    price: 6200,
  },
  {
    id: 'garnet-dusk',
    index: '03',
    eyebrow: 'Limited edition',
    name: ['Garnet', 'Dusk'],
    material: 'Polished steel & garnet dial',
    description:
      'A garnet sunburst dial that reads almost black indoors and deep red in the street light, finished with a slim steel buckle and a burgundy strap.',
    image: media('garnet.webp'),
    specs: [
      ['Case', '38 mm'],
      ['Edition', 'No. 120'],
      ['Strap', 'Leather'],
    ],
    price: 7900,
  },
];

export const outro = {
  line1: 'Three watches.',
  line2: ['One ', 'wet night.'],
};

export const closing = {
  eyebrow: 'The complete trio',
  title: ['Wear every', 'hour'],
  body: 'Midnight, verdant and garnet: three dials from the same atelier, each delivered in a lacquered case with a spare strap.',
  setNote: 'Set of three',
  setTitle: ['Midnight, verdant ', '& garnet'] as [string, string],
};

export const footer = {
  columns: [
    ['Shop', ['Rain Hours', 'Dress', 'Sport', 'Limited']],
    ['Atelier', ['Movements', 'Bespoke', 'Care & service', 'Book a viewing']],
    ['House', ['Journal', 'Stockists', 'Contact', 'Careers']],
  ] as [string, string[]][],
  concept: 'VESPÈRE is a concept brand made for a design experiment. Watches, prices and imagery are fictional.',
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(n);
