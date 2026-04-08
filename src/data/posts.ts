export interface BlogPost {
  id: number;
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'hidden-alpine-lakes',
    image: '/images/lake.png',
    category: 'Nature',
    title: 'Hidden Alpine Lakes That Will Take Your Breath Away',
    excerpt: 'Discover the most pristine and untouched alpine lakes nestled deep within mountain ranges across the globe.',
    content: [
      'There is something profoundly humbling about standing at the edge of an alpine lake, surrounded by towering peaks that stretch toward an endless sky. These hidden bodies of water, often accessible only by foot, represent some of Earth\'s last truly untouched sanctuaries.',
      'High in the mountains of Patagonia, Lake O\'Higgins reveals its turquoise brilliance only to those willing to trek through dense forests and over rocky moraines. The color — an almost impossible shade of blue-green — comes from glacial flour, tiny particles of rock ground fine by the movement of ice over millennia.',
      'In the Swiss Alps, the Oeschinen Lake sits in a natural amphitheater of limestone cliffs, its crystal waters reflecting the surrounding peaks like a perfect mirror. Accessible by a scenic gondola ride from Kandersteg, this lake transforms with the seasons — from a frozen wonderland in winter to a vibrant swimming spot in summer.',
      'The key to experiencing these lakes at their finest is timing. Early morning, before the wind picks up, offers glass-like reflections. Late afternoon paints the surrounding peaks in golden light. And on rare, perfectly still evenings, the water becomes so calm that it\'s impossible to tell where the lake ends and the sky begins.',
      'These places remind us that the most beautiful corners of our planet are often the hardest to reach — and perhaps that\'s precisely what keeps them beautiful.',
    ],
    author: 'Elena Rivers',
    authorInitials: 'ER',
    date: 'Apr 5, 2026',
    readTime: '6 min read',
  },
  {
    id: 2,
    slug: 'art-of-solo-hiking',
    image: '/images/hiker.png',
    category: 'Adventure',
    title: 'The Art of Solo Hiking: Finding Yourself in the Wild',
    excerpt: 'A guide to embarking on solo hiking adventures that challenge your limits and expand your horizons.',
    content: [
      'Solo hiking is not merely a physical activity — it is a conversation with yourself, mediated by the landscape. When you strip away the noise of companionship, what remains is raw, unfiltered experience.',
      'The first solo hike is always the hardest. Not because of the terrain, but because of the silence. Without someone to fill the gaps, you become acutely aware of every rustle in the undergrowth, every shift in the wind. But gradually, this heightened awareness transforms from anxiety into presence.',
      'Preparation is everything. A solo hiker must be both the navigator and the navigator\'s backup. Carry detailed maps, a reliable GPS device, and always let someone know your planned route and expected return time. Pack for one condition worse than forecasted — mountain weather is notoriously fickle.',
      'The rewards of solo hiking are immeasurable. Standing alone on a summit you\'ve climbed under your own power, watching the world spread out beneath you in every direction — there is no equivalent experience. It is proof, reaffirmed with every step, that you are capable of more than you imagined.',
      'Start small. A familiar trail on a clear day. Build confidence before ambition. And remember: the mountain will always be there tomorrow. There is no summit worth more than your safety.',
    ],
    author: 'Marcus Chen',
    authorInitials: 'MC',
    date: 'Apr 3, 2026',
    readTime: '8 min read',
  },
  {
    id: 3,
    slug: 'chasing-waterfalls',
    image: '/images/waterfall.png',
    category: 'Exploration',
    title: 'Chasing Waterfalls: Earth\'s Most Spectacular Cascades',
    excerpt: 'From hidden jungle falls to towering mountain cascades, explore the world\'s most awe-inspiring waterfalls.',
    content: [
      'Waterfalls have captivated human imagination since we first stumbled upon them — thundering curtains of water that seem to channel the raw power of the earth itself. From the mist-shrouded drops of Iguazu to the ethereal threads of Angel Falls, each cascade tells a unique geological story.',
      'Angel Falls in Venezuela drops an astonishing 979 meters from the summit of Auyán-tepuí, making it the world\'s highest uninterrupted waterfall. The water falls so far that much of it evaporates into mist before reaching the base, creating a perpetual cloud at the mountain\'s foot.',
      'In Iceland, Seljalandsfoss offers a rare experience: visitors can walk behind the curtain of water, watching the world through a translucent veil. In winter, the surrounding rocks glaze over with ice, transforming the falls into a frozen sculpture of unimaginable beauty.',
      'The most powerful waterfall on Earth by volume, Victoria Falls on the Zambia-Zimbabwe border, throws up a spray that can be seen from 50 kilometers away. The local Tonga people call it "Mosi-oa-Tunya" — The Smoke That Thunders.',
      'Whether a gentle cascade over moss-covered rocks or a thundering torrent into an abyss, waterfalls remind us that our planet is alive, constantly reshaping itself in the most dramatic fashion possible.',
    ],
    author: 'Sofia Martez',
    authorInitials: 'SM',
    date: 'Mar 28, 2026',
    readTime: '5 min read',
  },
  {
    id: 4,
    slug: 'golden-hour-at-sea',
    image: '/images/ocean.png',
    category: 'Seascape',
    title: 'Golden Hour at Sea: A Photographer\'s Guide',
    excerpt: 'Master the techniques behind capturing the perfect ocean sunset with professional tips and hidden spots.',
    content: [
      'The golden hour at sea is a photographer\'s most reliable ally and most demanding subject. That brief window when the sun hangs low over the horizon, painting the water in molten gold, offers light that no studio can replicate.',
      'Timing is critical. Arrive at your chosen spot at least 45 minutes before sunset. This gives you time to scout compositions, set up your tripod, and adjust to the changing light. The best moments often come not at sunset itself, but in the minutes immediately before and after.',
      'A polarizing filter is essential for ocean photography. It cuts through surface glare, revealing the true colors of the water beneath while deepening the sky. Rotate it slowly until you find the angle that best balances these effects.',
      'Long exposures transform the ocean. A 2-4 second exposure smooths the waves into silk while keeping the horizon sharp. A 30-second exposure turns rough surf into ethereal mist. Experiment with different shutter speeds to find the mood that matches your vision.',
      'The best seascape locations are rarely the most famous beaches. Look for interesting foreground elements — weathered rocks, tidal pools, driftwood — that add depth and lead the eye toward the horizon. The ocean provides the light; your job is to frame it.',
    ],
    author: 'James Webb',
    authorInitials: 'JW',
    date: 'Mar 22, 2026',
    readTime: '7 min read',
  },
  {
    id: 5,
    slug: 'enchanted-forests',
    image: '/images/forest.png',
    category: 'Wilderness',
    title: 'Enchanted Forests: Where Light Meets Mystery',
    excerpt: 'Step into the world\'s most magical forests where ancient trees guard secrets of centuries past.',
    content: [
      'There are forests on this planet that feel older than humanity itself — places where the canopy filters light into cathedral beams and the air carries the scent of centuries of undisturbed growth.',
      'The Hoh Rainforest on Washington\'s Olympic Peninsula receives over 3.5 meters of rainfall annually, creating a world draped in mosses, lichens, and ferns. Walking its trails feels like entering a living museum of evolution, where every surface supports life in some form.',
      'In Japan\'s Yakushima Island, ancient cedar trees called "yakusugi" have stood for thousands of years. The oldest, Jōmon Sugi, is estimated to be between 2,170 and 7,200 years old. Its massive trunk, wrapped in moss and scarred by lightning, stands as a living monument to endurance.',
      'The best time to visit a forest is after rain. The light takes on a diffused, ethereal quality. Droplets cling to every surface, catching and scattering what little sunlight filters through. The air is alive with the rich, complex perfume of wet earth and breathing trees.',
      'These forests teach us patience. Every ancient tree began as a seed no bigger than a fingernail. Growth, real growth, happens slowly, steadily, and in silence. There is wisdom in the old woods for those willing to stand still long enough to hear it.',
    ],
    author: 'Aria Woodland',
    authorInitials: 'AW',
    date: 'Mar 18, 2026',
    readTime: '4 min read',
  },
  {
    id: 6,
    slug: 'chasing-northern-lights',
    image: '/images/aurora.png',
    category: 'Phenomenon',
    title: 'Chasing the Northern Lights Across Scandinavia',
    excerpt: 'Everything you need to know about witnessing the aurora borealis in its full glory, from timing to locations.',
    content: [
      'The Northern Lights are not something you simply see — they are something that happens to you. Standing beneath a sky that pulses with curtains of green, purple, and pink light, you understand why ancient peoples wove myths around this phenomenon.',
      'The aurora borealis occurs when charged particles from the sun collide with atmospheric gases, causing them to emit light. The most common color, green, comes from oxygen molecules at altitudes of about 100 kilometers. At higher altitudes, oxygen produces red light, while nitrogen contributes blue and purple hues.',
      'Tromsø, Norway, sits within the "aurora zone" — a ring around the magnetic north pole where northern lights are most frequently observed. From September through March, the city offers excellent viewing conditions and the infrastructure to support aurora chasers from around the world.',
      'The key to a successful aurora viewing is darkness, clear skies, and patience. Light pollution is the enemy — position yourself well away from city centers. Cloud cover forecasts are critical; even a thin layer of cloud can obscure the display entirely.',
      'When the lights finally appear, resist the urge to photograph everything immediately. Give your eyes time to adjust, let the display develop, and allow yourself to simply be present with one of nature\'s most extraordinary spectacles. The camera can wait; the moment cannot.',
    ],
    author: 'Nils Bergström',
    authorInitials: 'NB',
    date: 'Mar 12, 2026',
    readTime: '9 min read',
  },
];

export const FEATURED_POST = {
  id: 7,
  slug: 'ancient-deserts',
  image: '/images/desert.png',
  category: 'Travel Guide',
  title: 'The Ancient Deserts: A Journey Through Time & Stone',
  excerpt: 'Venture deep into the heart of the world\'s most dramatic desert landscapes, where towering sandstone arches and sculpted canyons tell stories of millions of years of geological transformation.',
  content: [
    'The desert is often misunderstood as empty, barren, devoid of interest. But to anyone who has watched a sandstone arch glow crimson at sunset, or traced the sinuous curves of a slot canyon carved by millennia of flash floods, the desert reveals itself as one of Earth\'s most dynamic and beautiful landscapes.',
    'Monument Valley, straddling the Utah-Arizona border, presents perhaps the most iconic desert scenery on the planet. Its towering buttes — remnants of the sandstone layers that once covered the entire region — rise like ancient sentinels from the valley floor, their forms sculpted by 250 million years of wind and water.',
    'The Sahara Desert, covering an area roughly the size of the United States, is far from the monotonous sand sea many imagine. It encompasses gravel plains, rocky plateaus, oases, seasonal rivers, and sand dunes that can reach heights of 180 meters. The variety of landscapes within this single desert is staggering.',
    'Desert photography demands a different mindset. The light is harsh and unforgiving during midday, but the hour around sunrise and sunset in the desert produces colors that simply don\'t exist elsewhere — deep purples, fiery oranges, and subtle pinks that seem to emanate from the rocks themselves.',
    'To truly experience a desert, you must spend a night in one. As the sun sets and the temperature drops, the sky opens up into a canopy of stars so dense it seems almost solid. In the absolute silence of a desert night, you can hear your own heartbeat. It is a profound, almost spiritual experience that no photograph can capture.',
  ],
  author: 'Jordan Rhodes',
  authorInitials: 'JR',
  date: 'March 15, 2026',
  readTime: '12 min read',
};

export const CATEGORIES = [
  { name: 'Nature', image: '/images/forest.png', count: 24, slug: 'nature' },
  { name: 'Adventure', image: '/images/hiker.png', count: 18, slug: 'adventure' },
  { name: 'Seascape', image: '/images/ocean.png', count: 15, slug: 'seascape' },
  { name: 'Arctic', image: '/images/aurora.png', count: 9, slug: 'arctic' },
];
