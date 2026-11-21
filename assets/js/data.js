/* ==========================================================================
   Wanderluxe — demo content
   ========================================================================== */

const U = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  taj: U('photo-1564507592333-c60657eea523'),
  jaipur: U('photo-1599661046289-e31897846e41'),
  udaipur: U('photo-1615836245337-f5b9b2303f10'),
  kerala: U('photo-1602216056096-3b40cc0c9944'),
  goa: U('photo-1512343879784-a960bf40e7f2'),
  ladakh: U('photo-1581793745862-99fde7fa73d2'),
  manali: U('photo-1626621341517-bbf3d9990a23'),
  varanasi: U('photo-1561361513-2d000a50f0dc'),
  andaman: U('photo-1589308078059-be1415eab4c3'),
  darjeeling: U('photo-1544735716-392fe2489ffa'),
  rishikesh: U('photo-1591018653367-7b1b58a0bbc0'),
  meghalaya: U('photo-1593181629936-11c609b8db9b'),
  bali: U('photo-1537996194471-e657df975ab4'),
  dubai: U('photo-1512453979798-5ea266f8880c'),
  maldives: U('photo-1514282401047-d79a71a590e8'),
  switzerland: U('photo-1530122037265-a5f1f91d3b99'),
  paris: U('photo-1502602898657-3e91760cbb34'),
  thailand: U('photo-1552465011-b4e21bf6e79a'),
  singapore: U('photo-1525625293386-3f8f99389edd'),
  japan: U('photo-1493976040374-85c8e12f0c0e'),
  vietnam: U('photo-1528127269322-539801943592'),
  turkey: U('photo-1541432901042-2d8bd64b4a9b'),
  mountain: U('photo-1501785888041-af3ef285b470'),
  lake: U('photo-1476514525535-07fb3b4ae5f1'),
  beach: U('photo-1507525428034-b723cf961d3e'),
  forest: U('photo-1469474968028-56623f02e42e'),
  snow: U('photo-1519681393784-d120267933ba'),
  desert: U('photo-1509316785289-025f5b846b35'),
  temple: U('photo-1548013146-72479768bada'),
  boat: U('photo-1518509562904-e7ef99cdcc86'),
  resort: U('photo-1540541338287-41700207dee6'),
  underwater: U('photo-1544551763-46a013bb70d5'),
  travel: U('photo-1488646953014-85cb44e25828'),
  road: U('photo-1500530855697-b586d89ba3ee'),
  santorini: U('photo-1533105079780-92b9be482077'),
  paris2: U('photo-1499856871958-5b9627545d1a'),
  venice: U('photo-1523906834658-6e24ef2386f9')
};

/* ------------------------------- Destinations ------------------------------ */
const DESTINATIONS = [
  {
    id: 'agra-taj-mahal', name: 'Agra & Taj Mahal', state: 'Uttar Pradesh', country: 'India', region: 'india',
    image: IMG.taj, gallery: [IMG.taj, IMG.temple, IMG.travel, IMG.road],
    tagline: 'The eternal monument of love', tags: ['Heritage', 'UNESCO'], featured: true,
    description: 'Agra is home to the Taj Mahal, the world\'s most celebrated monument to love and one of the seven wonders of the modern world. Beyond the marble dome, the city holds the mighty Agra Fort, the ghost city of Fatehpur Sikri and markets brimming with marble inlay craft. Sunrise over the Yamuna, with the Taj glowing pink, is a moment that stays with you forever.',
    attractions: ['Taj Mahal at sunrise', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itmad-ud-Daulah', 'Sadar Bazaar'],
    bestTime: 'October – March', idealDuration: '2–3 days', price: 8999, rating: 4.9, reviews: 2841
  },
  {
    id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', country: 'India', region: 'india',
    image: IMG.jaipur, gallery: [IMG.jaipur, IMG.desert, IMG.temple, IMG.travel],
    tagline: 'The pink city of palaces', tags: ['Heritage', 'Culture'], featured: true,
    description: 'Jaipur is a royal canvas painted in rose pink — from the honeycomb windows of Hawa Mahal to the mirrored halls of Amber Fort. Shop for block prints and blue pottery in the old bazaars, sip masala chai on a rooftop, and watch the sun set behind Nahargarh Fort. It is the perfect gateway to Rajasthan\'s desert romance.',
    attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort', 'Johari Bazaar'],
    bestTime: 'October – March', idealDuration: '2–4 days', price: 7499, rating: 4.8, reviews: 1964
  },
  {
    id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', country: 'India', region: 'india',
    image: IMG.udaipur, gallery: [IMG.udaipur, IMG.lake, IMG.temple, IMG.desert],
    tagline: 'City of lakes and royal romance', tags: ['Romantic', 'Heritage'], featured: true,
    description: 'Udaipur floats on a mirror of lakes, framed by the Aravalli hills and crowned with white marble palaces. Take a boat ride past the Lake Palace, wander the ghats at sunset, and dine under the stars with the city lights shimmering on the water. It is India\'s most romantic escape.',
    attractions: ['Lake Pichola boat ride', 'City Palace', 'Jag Mandir', 'Saheliyon-ki-Bari', 'Sajjangarh Palace', 'Bagore-ki-Haveli'],
    bestTime: 'September – March', idealDuration: '3 days', price: 9499, rating: 4.9, reviews: 1523
  },
  {
    id: 'kerala-backwaters', name: 'Kerala Backwaters', state: 'Kerala', country: 'India', region: 'india',
    image: IMG.kerala, gallery: [IMG.kerala, IMG.forest, IMG.beach, IMG.boat],
    tagline: 'God\'s own country, slow and green', tags: ['Nature', 'Honeymoon'], featured: true,
    description: 'Drift through a labyrinth of palm-fringed canals on a private houseboat, where the only sounds are birdsong and water lapping the hull. Kerala pairs tranquil backwaters with tea-carpeted hills in Munnar, wild beaches in Kovalam and the healing traditions of Ayurveda. This is slow travel at its most beautiful.',
    attractions: ['Alleppey houseboat cruise', 'Munnar tea gardens', 'Kumarakom bird sanctuary', 'Athirappilly Falls', 'Fort Kochi', 'Varkala beach'],
    bestTime: 'October – March', idealDuration: '5–7 days', price: 12999, rating: 4.9, reviews: 2310
  },
  {
    id: 'goa', name: 'Goa', state: 'Goa', country: 'India', region: 'india',
    image: IMG.goa, gallery: [IMG.goa, IMG.beach, IMG.boat, IMG.resort],
    tagline: 'Sun, sand and Portuguese soul', tags: ['Beach', 'Nightlife'], featured: true,
    description: 'Goa is India\'s sunshine state — 100 km of coastline where golden beaches meet whitewashed churches and spice plantations. Spend mornings in cafés, afternoons on a catamaran and evenings at beach shacks with fresh seafood and live music. North Goa buzzes, South Goa unwinds; both are pure holiday.',
    attractions: ['Palolem Beach', 'Fort Aguada', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Anjuna flea market', 'Grande Island snorkelling'],
    bestTime: 'November – February', idealDuration: '3–5 days', price: 5999, rating: 4.7, reviews: 3422
  },
  {
    id: 'leh-ladakh', name: 'Leh & Ladakh', state: 'Ladakh', country: 'India', region: 'india',
    image: IMG.ladakh, gallery: [IMG.ladakh, IMG.snow, IMG.mountain, IMG.lake],
    tagline: 'High passes, blue lakes, big silence', tags: ['Adventure', 'Road Trip'], featured: true,
    description: 'Ladakh is a world above the clouds — lunar landscapes, prayer flags snapping in thin cold air and the impossibly blue Pangong Lake. Ride the legendary Khardung La, sleep in a Nubra homestay and watch monasteries glow at golden hour. Every turn is a postcard and every pass a story.',
    attractions: ['Pangong Lake', 'Nubra Valley', 'Khardung La', 'Thiksey Monastery', 'Magnetic Hill', 'Shanti Stupa'],
    bestTime: 'May – September', idealDuration: '6–8 days', price: 18999, rating: 4.9, reviews: 1187
  },
  {
    id: 'manali', name: 'Manali', state: 'Himachal Pradesh', country: 'India', region: 'india',
    image: IMG.manali, gallery: [IMG.manali, IMG.snow, IMG.mountain, IMG.forest],
    tagline: 'Pine forests and snow peaks', tags: ['Mountains', 'Adventure'], featured: true,
    description: 'Manali is the Himalayan playground — apple orchards, deodar forests and the roaring Beas river. Stroll Old Manali\'s cafés, paraglide over Solang Valley, or drive through the Atal Tunnel to the stark beauty of Lahaul. In winter the slopes turn white; in summer they turn green. Either way, it is magic.',
    attractions: ['Solang Valley', 'Hadimba Temple', 'Old Manali', 'Atal Tunnel & Sissu', 'Jogini Falls', 'Naggar Castle'],
    bestTime: 'March – June & October – February', idealDuration: '4–5 days', price: 8499, rating: 4.7, reviews: 2630
  },
  {
    id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', region: 'india',
    image: IMG.varanasi, gallery: [IMG.varanasi, IMG.temple, IMG.boat, IMG.travel],
    tagline: 'The oldest living city', tags: ['Spiritual', 'Culture'], featured: false,
    description: 'On the banks of the Ganges, Varanasi has been a city of pilgrimage for over 3,000 years. Take a dawn boat ride past the ghats, witness the fire-lit Ganga Aarti at Dashashwamedh and lose yourself in lanes that smell of incense and fresh jalebi. It is chaotic, sacred and utterly unforgettable.',
    attractions: ['Dashashwamedh Ghat aarti', 'Sunrise boat ride', 'Kashi Vishwanath Temple', 'Sarnath', 'Manikarnika Ghat', 'Banaras silk market'],
    bestTime: 'October – March', idealDuration: '2–3 days', price: 6499, rating: 4.7, reviews: 1740
  },
  {
    id: 'andaman', name: 'Andaman Islands', state: 'Andaman & Nicobar', country: 'India', region: 'india',
    image: IMG.andaman, gallery: [IMG.andaman, IMG.beach, IMG.underwater, IMG.resort],
    tagline: 'Turquoise water, white sand', tags: ['Islands', 'Honeymoon'], featured: true,
    description: 'The Andamans are India\'s tropical secret — powder-white beaches, coral gardens and jungle islands where time slows down. Snorkel with clownfish at Elephant Beach, watch the sun sink behind Radhanagar\'s palms and explore the eerie ruins of Ross Island. It is the closest thing to paradise without a passport.',
    attractions: ['Radhanagar Beach', 'Elephant Beach snorkelling', 'Cellular Jail', 'Ross Island', 'Neil Island', 'Scuba diving at Havelock'],
    bestTime: 'October – May', idealDuration: '5–7 days', price: 15999, rating: 4.8, reviews: 1402
  },
  {
    id: 'darjeeling', name: 'Darjeeling', state: 'West Bengal', country: 'India', region: 'india',
    image: IMG.darjeeling, gallery: [IMG.darjeeling, IMG.mountain, IMG.forest, IMG.travel],
    tagline: 'Tea, toy trains and Kanchenjunga', tags: ['Mountains', 'Nature'], featured: false,
    description: 'Perched at 2,000 m, Darjeeling wakes to the smell of first-flush tea and the sight of Kanchenjunga turning gold. Ride the UNESCO toy train through misty hills, wander colonial-era tearooms and watch prayer flags flutter at the Peace Pagoda. It is old-world charm with a Himalayan view.',
    attractions: ['Tiger Hill sunrise', 'Darjeeling Himalayan Railway', 'Happy Valley Tea Estate', 'Batasia Loop', 'Peace Pagoda', 'Mall Road'],
    bestTime: 'March – May & October – December', idealDuration: '3–4 days', price: 7999, rating: 4.6, reviews: 1122
  },
  {
    id: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', country: 'India', region: 'india',
    image: IMG.rishikesh, gallery: [IMG.rishikesh, IMG.mountain, IMG.forest, IMG.boat],
    tagline: 'Yoga capital on the Ganges', tags: ['Adventure', 'Spiritual'], featured: false,
    description: 'Where the Ganges leaves the Himalayas, Rishikesh blends white-water thrills with ashram calm. Raft grade III–IV rapids, jump off cliff ledges, then join a sunset aarti or a yoga class by the river. It is the perfect weekend reset for body and mind.',
    attractions: ['White-water rafting', 'Lakshman Jhula', 'Triveni Ghat aarti', 'Beatles Ashram', 'Bungee jumping', 'Neer Garh waterfall'],
    bestTime: 'September – November & February – May', idealDuration: '2–3 days', price: 4999, rating: 4.7, reviews: 2015
  },
  {
    id: 'meghalaya', name: 'Meghalaya', state: 'Meghalaya', country: 'India', region: 'india',
    image: IMG.meghalaya, gallery: [IMG.meghalaya, IMG.forest, IMG.mountain, IMG.boat],
    tagline: 'Abode of clouds and living roots', tags: ['Nature', 'Offbeat'], featured: false,
    description: 'Meghalaya is a green dream — root bridges woven by generations, waterfalls that vanish into caves and the cleanest village in Asia. Walk the double-decker bridge at Nongriat, kayak the crystal Umngot river at Dawki and sleep in a bamboo hut under the clouds. It is India\'s most underrated escape.',
    attractions: ['Living root bridges', 'Dawki river', 'Mawlynnong village', 'Elephant Falls', 'Mawsmai Caves', 'Laitlum Canyons'],
    bestTime: 'October – April', idealDuration: '4–5 days', price: 10999, rating: 4.8, reviews: 892
  },
  {
    id: 'bali', name: 'Bali', state: 'Indonesia', country: 'Indonesia', region: 'international',
    image: IMG.bali, gallery: [IMG.bali, IMG.resort, IMG.beach, IMG.forest],
    tagline: 'Island of gods and sunsets', tags: ['Islands', 'Honeymoon'], featured: true,
    description: 'Bali is a mood as much as a place — rice terraces glowing green, incense drifting from temple gates and surf breaks at golden hour. Split your stay between Ubud\'s jungle calm and Seminyak\'s beach clubs, climb Mount Batur for sunrise and end the day with a flower bath. It is the honeymoon that keeps giving.',
    attractions: ['Ubud rice terraces', 'Tanah Lot temple', 'Mount Batur sunrise', 'Nusa Penida', 'Uluwatu cliffs', 'Seminyak beach clubs'],
    bestTime: 'April – October', idealDuration: '6–8 days', price: 52999, rating: 4.8, reviews: 3120
  },
  {
    id: 'dubai', name: 'Dubai', state: 'UAE', country: 'UAE', region: 'international',
    image: IMG.dubai, gallery: [IMG.dubai, IMG.desert, IMG.resort, IMG.travel],
    tagline: 'Where the desert meets the skyline', tags: ['City', 'Family'], featured: true,
    description: 'Dubai does everything bigger — the world\'s tallest tower, indoor ski slopes and shopping malls with aquariums. But the city\'s soul lives in the old creek, where dhows drift past spice souks and gold markets. Add a red-dune safari, a desert dinner under the stars and you have the perfect family escape.',
    attractions: ['Burj Khalifa', 'Desert safari', 'Dubai Mall & fountain', 'Palm Jumeirah', 'Old Dubai souks', 'Museum of the Future'],
    bestTime: 'November – March', idealDuration: '4–5 days', price: 42999, rating: 4.8, reviews: 2760
  },
  {
    id: 'maldives', name: 'Maldives', state: 'Maldives', country: 'Maldives', region: 'international',
    image: IMG.maldives, gallery: [IMG.maldives, IMG.resort, IMG.underwater, IMG.beach],
    tagline: 'One island, one resort, pure blue', tags: ['Honeymoon', 'Luxury'], featured: true,
    description: 'The Maldives is the definition of escape: a speck of sand in an ocean of blue, a villa over the water and nothing on the agenda but snorkelling, sunsets and seafood. Wake to reef sharks gliding beneath your deck, swim with manta rays and fall asleep to the sound of the sea.',
    attractions: ['Overwater villa stay', 'Snorkelling with manta rays', 'Sunset dolphin cruise', 'Sandbank picnic', 'Spa over the lagoon', 'Bioluminescent beach'],
    bestTime: 'November – April', idealDuration: '4–5 days', price: 84999, rating: 4.9, reviews: 1890
  },
  {
    id: 'switzerland', name: 'Switzerland', state: 'Central Europe', country: 'Switzerland', region: 'international',
    image: IMG.switzerland, gallery: [IMG.switzerland, IMG.snow, IMG.lake, IMG.mountain],
    tagline: 'Alpine postcards come alive', tags: ['Mountains', 'Luxury'], featured: true,
    description: 'Switzerland is a country that looks engineered for wonder — snow-capped peaks, emerald lakes and villages of flower-boxed chalets. Ride the Glacier Express, stand on Jungfraujoch and take a boat across Lake Lucerne. Every train window is a painting and every fondue tastes better with a view.',
    attractions: ['Jungfraujoch', 'Glacier Express', 'Lake Lucerne', 'Interlaken', 'Zermatt & Matterhorn', 'Chillon Castle'],
    bestTime: 'May – September & December – March', idealDuration: '6–8 days', price: 114999, rating: 4.9, reviews: 1420
  },
  {
    id: 'paris', name: 'Paris', state: 'France', country: 'France', region: 'international',
    image: IMG.paris, gallery: [IMG.paris, IMG.paris2, IMG.travel, IMG.venice],
    tagline: 'The city of light and love', tags: ['City', 'Romantic'], featured: false,
    description: 'Paris needs no introduction — but it still surprises. Beyond the Eiffel Tower are hidden courtyards, market streets and museums that reward slow wandering. Cruise the Seine at dusk, share crêpes in Montmartre and end the night watching the tower sparkle. It is romance, rehearsed nightly.',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Seine river cruise', 'Montmartre', 'Notre-Dame & Latin Quarter', 'Palace of Versailles'],
    bestTime: 'April – June & September – October', idealDuration: '4–6 days', price: 92999, rating: 4.8, reviews: 2210
  },
  {
    id: 'thailand', name: 'Phuket & Krabi', state: 'Thailand', country: 'Thailand', region: 'international',
    image: IMG.thailand, gallery: [IMG.thailand, IMG.boat, IMG.beach, IMG.temple],
    tagline: 'Limestone cliffs and island hops', tags: ['Beach', 'Budget'], featured: true,
    description: 'Thailand\'s Andaman coast is a playground of limestone karsts, hidden lagoons and turquoise water. Island-hop from Phuket to Phi Phi, kayak through sea caves in Phang Nga Bay and end the day with a Thai massage and pad thai on the beach. Great value, endless sunshine.',
    attractions: ['Phi Phi Islands', 'Phang Nga Bay', 'James Bond Island', 'Krabi Railay Beach', 'Big Buddha', 'Old Phuket Town'],
    bestTime: 'November – April', idealDuration: '5–7 days', price: 38999, rating: 4.7, reviews: 3350
  },
  {
    id: 'singapore', name: 'Singapore', state: 'Singapore', country: 'Singapore', region: 'international',
    image: IMG.singapore, gallery: [IMG.singapore, IMG.travel, IMG.resort, IMG.beach],
    tagline: 'The garden city that never sleeps', tags: ['City', 'Family'], featured: false,
    description: 'Singapore packs a continent into a city — futuristic gardens, hawker centres with Michelin stars and Sentosa\'s theme parks. Watch the Supertrees light up, ride the Singapore Flyer and eat your way through Chinatown and Little India. Clean, safe and brilliant for families.',
    attractions: ['Gardens by the Bay', 'Sentosa Island', 'Marina Bay Sands', 'Singapore Zoo', 'Hawker food tour', 'Clarke Quay'],
    bestTime: 'February – April', idealDuration: '4–5 days', price: 64999, rating: 4.8, reviews: 1980
  },
  {
    id: 'japan', name: 'Japan', state: 'Japan', country: 'Japan', region: 'international',
    image: IMG.japan, gallery: [IMG.japan, IMG.temple, IMG.travel, IMG.mountain],
    tagline: 'Cherry blossoms and neon nights', tags: ['Culture', 'City'], featured: false,
    description: 'Japan is a study in beautiful contradictions — silent shrines beside neon arcades, bullet trains and ryokan baths, matcha and Michelin sushi. See Kyoto\'s torii gates at dawn, ride the Shinkansen to Osaka and watch Mount Fuji appear through the clouds. It is a journey of a lifetime.',
    attractions: ['Fushimi Inari shrine', 'Mount Fuji', 'Shibuya Crossing', 'Kyoto temples', 'Osaka street food', 'Nara deer park'],
    bestTime: 'March – May & October – November', idealDuration: '7–10 days', price: 124999, rating: 4.9, reviews: 1650
  },
  {
    id: 'vietnam', name: 'Vietnam', state: 'Vietnam', country: 'Vietnam', region: 'international',
    image: IMG.vietnam, gallery: [IMG.vietnam, IMG.boat, IMG.forest, IMG.beach],
    tagline: 'Lanterns, limestone and pho', tags: ['Culture', 'Budget'], featured: false,
    description: 'Vietnam rewards the curious — Hanoi\'s motorbike ballet, the emerald bays of Ha Long, lantern-lit Hoi An and the beaches of Da Nang. Cruise between limestone islands, learn to cook spring rolls and sip egg coffee on a balcony. Rich in flavour, gentle on the wallet.',
    attractions: ['Ha Long Bay cruise', 'Hoi An ancient town', 'Hanoi Old Quarter', 'Da Nang beaches', 'Cu Chi tunnels', 'Sapa rice terraces'],
    bestTime: 'October – April', idealDuration: '6–9 days', price: 45999, rating: 4.7, reviews: 1240
  },
  {
    id: 'turkey', name: 'Turkey', state: 'Türkiye', country: 'Turkey', region: 'international',
    image: IMG.turkey, gallery: [IMG.turkey, IMG.santorini, IMG.travel, IMG.desert],
    tagline: 'Where continents and balloons meet', tags: ['Culture', 'Romantic'], featured: false,
    description: 'Turkey bridges Europe and Asia — Istanbul\'s domes and bazaars, the fairy chimneys of Cappadocia and the turquoise coast. Float over Cappadocia at sunrise in a hot-air balloon, soak in a hammam and eat your weight in baklava. History, scenery and warmth in one trip.',
    attractions: ['Cappadocia balloon ride', 'Hagia Sophia', 'Grand Bazaar', 'Pamukkale terraces', 'Bosphorus cruise', 'Ephesus ruins'],
    bestTime: 'April – May & September – October', idealDuration: '6–8 days', price: 71999, rating: 4.8, reviews: 980
  }
];

/* --------------------------------- Packages -------------------------------- */
const PACKAGES = [
  {
    id: 'golden-triangle', name: 'Golden Triangle Heritage Tour', type: 'family', region: 'india',
    destinationId: 'agra-taj-mahal', location: 'Delhi · Agra · Jaipur', days: 5, nights: 4,
    price: 24999, oldPrice: 31999, badge: 'Bestseller', image: IMG.taj, gallery: [IMG.taj, IMG.jaipur, IMG.temple],
    rating: 4.8, reviews: 326, groupSize: '2–12 guests', startCity: 'New Delhi',
    highlights: ['Taj Mahal sunrise', 'Amber Fort', '4★ hotels', 'Private AC car'],
    travelDates: ['2026-12-05', '2026-12-12', '2026-12-19', '2027-01-09', '2027-01-23'],
    overview: 'India\'s most iconic circuit in five relaxed days. Explore Mughal Delhi, watch the sun rise over the Taj Mahal, then head to the pink city of Jaipur for forts, bazaars and royal dinners. Private transfers, handpicked 4★ hotels and a local guide in every city make this the perfect first India trip for families.',
    itinerary: [
      { day: 1, title: 'Arrive in Delhi · Old & New City', detail: 'Meet your driver at the airport and check in. Afternoon tour of Qutub Minar and Humayun\'s Tomb, evening at India Gate and Connaught Place.', meals: 'Dinner', stay: '4★ hotel, Delhi' },
      { day: 2, title: 'Delhi → Agra · Taj at sunset', detail: 'Drive the Yamuna Expressway to Agra. Visit Agra Fort and Mehtab Bagh for the classic sunset view of the Taj across the river.', meals: 'Breakfast, Dinner', stay: '4★ hotel, Agra' },
      { day: 3, title: 'Taj Mahal sunrise → Jaipur', detail: 'Early entry to the Taj Mahal with a licensed guide, then Fatehpur Sikri en route to Jaipur. Evening free in the old city.', meals: 'Breakfast, Dinner', stay: '4★ hotel, Jaipur' },
      { day: 4, title: 'Jaipur · Amber Fort & bazaars', detail: 'Jeep ride up to Amber Fort, photo stop at Hawa Mahal, City Palace and Jantar Mantar. Sunset at Nahargarh with chai.', meals: 'Breakfast, Dinner', stay: '4★ hotel, Jaipur' },
      { day: 5, title: 'Jaipur → Delhi · Departure', detail: 'Leisurely breakfast, block-print shopping stop, then transfer to Delhi airport for your flight home.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Delhi', name: 'The Suryaa New Delhi', category: '4★', nights: 1 },
      { city: 'Agra', name: 'Crystal Sarovar Premiere', category: '4★', nights: 1 },
      { city: 'Jaipur', name: 'Ramada by Wyndham Jaipur', category: '4★', nights: 2 }
    ],
    transport: [
      { mode: 'Private car', detail: 'Air-conditioned Innova with chauffeur for all transfers and sightseeing' },
      { mode: 'Flights', detail: 'Return flights not included — we can add them on request' }
    ],
    included: ['4 nights in handpicked 4★ hotels', 'Daily breakfast and dinner', 'Private AC car with driver', 'English-speaking local guides', 'All monument entry tickets', '24×7 on-trip support'],
    excluded: ['Airfare / train fare to Delhi', 'Lunches and personal expenses', 'Camera fees at monuments', 'Travel insurance (add-on available)']
  },
  {
    id: 'kerala-backwaters', name: 'Kerala Backwaters & Munnar', type: 'family', region: 'india',
    destinationId: 'kerala-backwaters', location: 'Kochi · Munnar · Alleppey · Kovalam', days: 6, nights: 5,
    price: 31999, oldPrice: 38999, badge: 'Family favourite', image: IMG.kerala, gallery: [IMG.kerala, IMG.forest, IMG.boat],
    rating: 4.9, reviews: 412, groupSize: '2–10 guests', startCity: 'Kochi',
    highlights: ['Private houseboat', 'Tea gardens', 'Ayurveda spa', 'Beach day'],
    travelDates: ['2026-11-28', '2026-12-10', '2026-12-24', '2027-01-14', '2027-02-04'],
    overview: 'Six days of green silence, spice-scented hills and a night on your own private houseboat. Start in Fort Kochi, climb into Munnar\'s tea country, drift through the Alleppey backwaters and finish with a lazy beach day in Kovalam. Ideal for families and couples who want to slow down.',
    itinerary: [
      { day: 1, title: 'Arrive Kochi · Fort Kochi walk', detail: 'Airport pickup and check-in. Evening heritage walk past the Chinese fishing nets, St Francis Church and Jew Town.', meals: 'Dinner', stay: 'Boutique hotel, Kochi' },
      { day: 2, title: 'Kochi → Munnar · Tea country', detail: 'Scenic drive past waterfalls to Munnar. Afternoon tea plantation tour and tasting at a working estate.', meals: 'Breakfast, Dinner', stay: 'Hill resort, Munnar' },
      { day: 3, title: 'Munnar · Eravikulam & Top Station', detail: 'Spot nilgiri tahr at Eravikulam National Park, then drive to Top Station for valley views. Evening at leisure.', meals: 'Breakfast, Dinner', stay: 'Hill resort, Munnar' },
      { day: 4, title: 'Munnar → Alleppey · Houseboat', detail: 'Drive down to the backwaters and board your private houseboat. Cruise canals, watch village life and dine on board.', meals: 'Breakfast, Lunch, Dinner', stay: 'Private houseboat' },
      { day: 5, title: 'Alleppey → Kovalam · Beach time', detail: 'Disembark after breakfast and drive to Kovalam. Afternoon at Lighthouse Beach with an optional Ayurvedic massage.', meals: 'Breakfast', stay: 'Beach resort, Kovalam' },
      { day: 6, title: 'Kovalam → Kochi · Departure', detail: 'Slow breakfast by the sea, then transfer to Kochi airport for your onward flight.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Kochi', name: 'Fragrant Nature Kochi', category: '4★', nights: 1 },
      { city: 'Munnar', name: 'Chandy\'s Windy Woods', category: '4★', nights: 2 },
      { city: 'Alleppey', name: 'Premium private houseboat', category: 'Deluxe', nights: 1 },
      { city: 'Kovalam', name: 'The Leela Kovalam (partial sea view)', category: '5★', nights: 1 }
    ],
    transport: [
      { mode: 'Private car', detail: 'AC sedan/SUV with driver for the full circuit' },
      { mode: 'Houseboat', detail: 'Private 2-bedroom houseboat with chef and crew' }
    ],
    included: ['5 nights accommodation', 'Daily breakfast, 4 dinners', 'Private houseboat with all meals', 'AC car with driver', 'Tea estate tour & tasting', 'Airport transfers'],
    excluded: ['Airfare to Kochi', 'Ayurveda treatments', 'Lunches', 'Entry fees not mentioned']
  },
  {
    id: 'goa-escape', name: 'Goa Beach Escape', type: 'budget', region: 'india',
    destinationId: 'goa', location: 'North Goa · South Goa', days: 4, nights: 3,
    price: 12999, oldPrice: 16999, badge: 'Best value', image: IMG.goa, gallery: [IMG.goa, IMG.beach, IMG.boat],
    rating: 4.6, reviews: 528, groupSize: '2–8 guests', startCity: 'Goa',
    highlights: ['Beach hopping', 'Sunset cruise', 'Scooter included', 'Beach shack stay'],
    travelDates: ['2026-11-27', '2026-12-11', '2026-12-25', '2027-01-08', '2027-01-22'],
    overview: 'A no-fuss, high-fun Goa break. Stay steps from the sand in Candolim, cruise the Mandovi at sunset, explore Latin Quarter lanes and spend a full day beach-hopping in the south. Scooter rental and airport transfers included, so you can go wherever the day takes you.',
    itinerary: [
      { day: 1, title: 'Arrive Goa · Candolim sunset', detail: 'Airport pickup and check-in. Collect your scooter and head to Candolim beach for sunset and dinner at a shack.', meals: '—', stay: 'Beach hotel, Candolim' },
      { day: 2, title: 'North Goa · Forts & flea markets', detail: 'Visit Fort Aguada, Chapora Fort and Anjuna. Afternoon free at Baga, evening at the Saturday night market (seasonal).', meals: 'Breakfast', stay: 'Beach hotel, Candolim' },
      { day: 3, title: 'South Goa · Beaches & cruise', detail: 'Drive south to Palolem and Cabo de Rama. Evening Mandovi river sunset cruise with live music.', meals: 'Breakfast', stay: 'Beach hotel, Candolim' },
      { day: 4, title: 'Old Goa · Departure', detail: 'Morning visit to Basilica of Bom Jesus and Fontainhas Latin Quarter, then airport drop.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [{ city: 'Candolim', name: 'Resort Rio (pool view)', category: '3★', nights: 3 }],
    transport: [
      { mode: 'Scooter', detail: 'One scooter per two guests for 3 days, helmets included' },
      { mode: 'Airport transfers', detail: 'Private AC car both ways' }
    ],
    included: ['3 nights with breakfast', 'Airport transfers', 'Scooter rental with helmets', 'Mandovi sunset cruise', 'Local support number'],
    excluded: ['Flights to Goa', 'Fuel and parking', 'Meals other than breakfast', 'Water sports']
  },
  {
    id: 'rajasthan-romance', name: 'Rajasthan Royal Romance', type: 'honeymoon', region: 'india',
    destinationId: 'udaipur', location: 'Udaipur · Jodhpur · Jaipur', days: 6, nights: 5,
    price: 42999, oldPrice: 52999, badge: 'Couples pick', image: IMG.udaipur, gallery: [IMG.udaipur, IMG.jaipur, IMG.desert],
    rating: 4.9, reviews: 214, groupSize: '2 guests', startCity: 'Udaipur',
    highlights: ['Lake Palace dinner', 'Private boat', 'Palace hotels', 'Couple spa'],
    travelDates: ['2026-12-02', '2026-12-16', '2027-01-06', '2027-01-20', '2027-02-10'],
    overview: 'A honeymoon written in marble and moonlight. Begin with a candlelit boat ride on Lake Pichola, stay in heritage havelis, then move to the blue city of Jodhpur and finish in royal Jaipur. Every stay is handpicked for romance, with flower décor, a couple spa and private dinners included.',
    itinerary: [
      { day: 1, title: 'Arrive Udaipur · Lake Pichola', detail: 'Private pickup, rose-petal welcome and heritage haveli check-in. Sunset boat ride past Jag Mandir with champagne.', meals: 'Dinner', stay: 'Heritage haveli, Udaipur' },
      { day: 2, title: 'Udaipur · Palaces & candlelight', detail: 'City Palace and Saheliyon-ki-Bari in the morning. Evening private candlelit dinner overlooking the lake.', meals: 'Breakfast, Dinner', stay: 'Heritage haveli, Udaipur' },
      { day: 3, title: 'Udaipur → Jodhpur · Blue city', detail: 'Drive to Jodhpur via Ranakpur Jain temple. Sunset from Mehrangarh Fort ramparts, then blue-city bazaar walk.', meals: 'Breakfast', stay: 'Boutique haveli, Jodhpur' },
      { day: 4, title: 'Jodhpur → Jaipur · Desert drive', detail: 'Scenic drive to Jaipur. Afternoon couple spa and evening rooftop dinner with live folk music.', meals: 'Breakfast, Dinner', stay: 'Heritage hotel, Jaipur' },
      { day: 5, title: 'Jaipur · Amber Fort & romance', detail: 'Amber Fort, Hawa Mahal and City Palace with a private guide. Farewell dinner at a palace restaurant.', meals: 'Breakfast, Dinner', stay: 'Heritage hotel, Jaipur' },
      { day: 6, title: 'Jaipur · Departure', detail: 'Breakfast, last-minute shopping and transfer to Jaipur airport.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Udaipur', name: 'Jagat Niwas Palace (lake view)', category: 'Heritage', nights: 2 },
      { city: 'Jodhpur', name: 'Ratan Vilas', category: 'Heritage', nights: 1 },
      { city: 'Jaipur', name: 'Alsisar Haveli', category: 'Heritage', nights: 2 }
    ],
    transport: [
      { mode: 'Private car', detail: 'AC sedan with chauffeur, decorated on arrival' },
      { mode: 'Boat', detail: 'Private sunset boat on Lake Pichola' }
    ],
    included: ['5 nights heritage stays', 'Daily breakfast, 4 dinners', 'Private AC car', 'Sunset boat ride', 'Couple spa session', 'Flower decoration & cake'],
    excluded: ['Flights', 'Monument camera fees', 'Lunches', 'Personal shopping']
  },
  {
    id: 'maldives-honeymoon', name: 'Maldives Overwater Honeymoon', type: 'honeymoon', region: 'international',
    destinationId: 'maldives', location: 'Male · North Malé Atoll', days: 5, nights: 4,
    price: 84999, oldPrice: 104999, badge: 'Luxury', image: IMG.maldives, gallery: [IMG.maldives, IMG.resort, IMG.underwater],
    rating: 4.9, reviews: 168, groupSize: '2 guests', startCity: 'Male',
    highlights: ['Overwater villa', 'All-inclusive', 'Speedboat transfer', 'Sunset cruise'],
    travelDates: ['2026-12-04', '2026-12-18', '2027-01-15', '2027-02-05', '2027-02-19'],
    overview: 'Four nights in an overwater villa with the Indian Ocean beneath your floor. All meals, speedboat transfers and a sunset dolphin cruise are included. Snorkel straight from your deck, book a floating spa and watch the sky turn orange from your private hammock. Pure, uncomplicated luxury.',
    itinerary: [
      { day: 1, title: 'Arrive Male · Speedboat to resort', detail: 'Meet at Velana airport and transfer by speedboat. Welcome drink, villa orientation and sunset cocktails.', meals: 'Dinner', stay: 'Overwater villa' },
      { day: 2, title: 'Reef day · Snorkel & spa', detail: 'Guided house-reef snorkel with manta rays, afternoon at the overwater spa, dinner on the beach.', meals: 'Breakfast, Lunch, Dinner', stay: 'Overwater villa' },
      { day: 3, title: 'Sandbank picnic · Sunset cruise', detail: 'Private sandbank picnic, then a sunset dolphin cruise with sparkling wine.', meals: 'Breakfast, Lunch, Dinner', stay: 'Overwater villa' },
      { day: 4, title: 'Free day · Water sports', detail: 'Kayaking, paddleboarding or an optional dive. Farewell candlelit dinner under the stars.', meals: 'Breakfast, Lunch, Dinner', stay: 'Overwater villa' },
      { day: 5, title: 'Departure', detail: 'Breakfast, last swim and speedboat transfer to Male airport.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [{ city: 'North Malé Atoll', name: 'Ocean Vista Resort — Overwater Villa', category: '5★', nights: 4 }],
    transport: [
      { mode: 'Speedboat', detail: 'Return shared speedboat transfers from Male airport' },
      { mode: 'Seaplane', detail: 'Optional upgrade available' }
    ],
    included: ['4 nights overwater villa', 'All meals (breakfast, lunch, dinner)', 'Return speedboat transfers', 'Sunset dolphin cruise', 'Snorkelling gear', 'Honeymoon cake & décor'],
    excluded: ['International flights', 'Spa treatments', 'Scuba diving', 'Green tax (payable at resort)']
  },
  {
    id: 'ladakh-expedition', name: 'Ladakh Bike Expedition', type: 'adventure', region: 'india',
    destinationId: 'leh-ladakh', location: 'Leh · Nubra · Pangong', days: 8, nights: 7,
    price: 38999, oldPrice: 45999, badge: 'Adrenaline', image: IMG.ladakh, gallery: [IMG.ladakh, IMG.snow, IMG.mountain],
    rating: 4.9, reviews: 142, groupSize: '6–12 riders', startCity: 'Leh',
    highlights: ['Royal Enfield', 'Khardung La', 'Pangong camp', 'Backup vehicle'],
    travelDates: ['2027-06-12', '2027-06-26', '2027-07-10', '2027-07-24', '2027-08-07'],
    overview: 'Eight days, two wheels and the highest motorable roads on earth. Ride from Leh over Khardung La into the Nubra dunes, follow the Shyok to Pangong and return through the Chang La. A support vehicle carries luggage and spares, and a mechanic rides with the group throughout.',
    itinerary: [
      { day: 1, title: 'Arrive Leh · Acclimatise', detail: 'Rest day at 3,500 m. Evening orientation, bike allocation and a short test ride.', meals: 'Dinner', stay: 'Boutique guesthouse, Leh' },
      { day: 2, title: 'Leh · Monasteries & Shanti Stupa', detail: 'Easy day visiting Thiksey, Hemis and Shanti Stupa to acclimatise before the high passes.', meals: 'Breakfast, Dinner', stay: 'Boutique guesthouse, Leh' },
      { day: 3, title: 'Leh → Nubra via Khardung La', detail: 'Ride the legendary Khardung La (5,359 m) and descend to Diskit. Evening at the Maitreya Buddha and sand dunes.', meals: 'Breakfast, Dinner', stay: 'Luxury camp, Nubra' },
      { day: 4, title: 'Nubra → Pangong via Shyok', detail: 'The wildest ride of the trip along the Shyok river. Arrive at Pangong Lake for sunset.', meals: 'Breakfast, Dinner', stay: 'Lake camp, Pangong' },
      { day: 5, title: 'Pangong → Leh via Chang La', detail: 'Sunrise by the lake, then ride back over Chang La with stops at Chemrey and Shey.', meals: 'Breakfast, Dinner', stay: 'Boutique guesthouse, Leh' },
      { day: 6, title: 'Leh → Hanle (optional) / rest', detail: 'Choose a ride to the remote Hanle observatory or a free day in Leh markets and cafés.', meals: 'Breakfast, Dinner', stay: 'Boutique guesthouse, Leh' },
      { day: 7, title: 'Leh · Magnetic Hill loop', detail: 'Short ride to Magnetic Hill, Sangam and Gurudwara Pathar Sahib. Farewell dinner.', meals: 'Breakfast, Dinner', stay: 'Boutique guesthouse, Leh' },
      { day: 8, title: 'Departure', detail: 'Transfer to Kushok Bakula Rimpochee airport.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Leh', name: 'The Bodhi Tree Guesthouse', category: 'Boutique', nights: 5 },
      { city: 'Nubra', name: 'Hunder Sarai Luxury Camp', category: 'Luxury camp', nights: 1 },
      { city: 'Pangong', name: 'Pangong Retreat Camp', category: 'Deluxe camp', nights: 1 }
    ],
    transport: [
      { mode: 'Royal Enfield 500', detail: 'One bike per rider, fuel for the full route included' },
      { mode: 'Support vehicle', detail: 'Backup SUV with luggage, spares and mechanic' }
    ],
    included: ['7 nights accommodation', 'Royal Enfield with fuel', 'Support vehicle & mechanic', 'Inner Line Permits', 'Daily breakfast & dinner', 'Oxygen cylinders on board'],
    excluded: ['Flights to Leh', 'Lunches', 'Travel insurance (mandatory)', 'Damage to bike']
  },
  {
    id: 'rishikesh-camping', name: 'Rishikesh Rafting & Camping', type: 'adventure', region: 'india',
    destinationId: 'rishikesh', location: 'Rishikesh · Shivpuri', days: 3, nights: 2,
    price: 8999, oldPrice: 11999, badge: 'Weekend thrill', image: IMG.rishikesh, gallery: [IMG.rishikesh, IMG.boat, IMG.forest],
    rating: 4.7, reviews: 386, groupSize: '4–20 guests', startCity: 'Rishikesh',
    highlights: ['16 km rafting', 'Riverside camp', 'Cliff jump', 'Bonfire night'],
    travelDates: ['2026-11-28', '2026-12-05', '2026-12-19', '2027-01-02', '2027-01-16'],
    overview: 'The perfect two-night reset from Delhi. Camp beside the Ganges, raft 16 km of grade III rapids, leap off a cliff into the river and end the day with bonfire music under the stars. All meals, safety gear and instructors included — no experience needed.',
    itinerary: [
      { day: 1, title: 'Arrive camp · Beach games', detail: 'Check in by noon, lunch, then volleyball, kayaking and a sunset walk to the river. Bonfire and dinner.', meals: 'Lunch, Dinner', stay: 'Riverside camp' },
      { day: 2, title: 'Rafting day · 16 km', detail: 'Safety briefing and raft from Shivpuri to NIM Beach — grade III rapids, body surfing and a cliff jump.', meals: 'Breakfast, Lunch, Dinner', stay: 'Riverside camp' },
      { day: 3, title: 'Sunrise yoga · Departure', detail: 'Morning yoga and breakfast, optional bungee jump, then transfer to Rishikesh station.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [{ city: 'Shivpuri', name: 'Ganga View Riverside Camp', category: 'Deluxe tent', nights: 2 }],
    transport: [
      { mode: 'Shared transfer', detail: 'Rishikesh railway station / bus stand pickup and drop' },
      { mode: 'Raft', detail: '16 km guided rafting with all safety equipment' }
    ],
    included: ['2 nights deluxe tent', 'All meals from day 1 lunch', '16 km rafting with guide', 'Safety gear & life jackets', 'Bonfire & beach games', 'Station transfers'],
    excluded: ['Travel to Rishikesh', 'Bungee / zipline', 'Alcohol', 'Personal expenses']
  },
  {
    id: 'manali-weekend', name: 'Manali Weekend Getaway', type: 'weekend', region: 'india',
    destinationId: 'manali', location: 'Manali · Solang · Sissu', days: 3, nights: 2,
    price: 9499, oldPrice: 12499, badge: 'Long weekend', image: IMG.manali, gallery: [IMG.manali, IMG.snow, IMG.mountain],
    rating: 4.6, reviews: 455, groupSize: '2–10 guests', startCity: 'Delhi',
    highlights: ['Atal Tunnel', 'Solang Valley', 'Volvo coach', 'Café hopping'],
    travelDates: ['2026-11-27', '2026-12-04', '2026-12-18', '2027-01-01', '2027-01-15'],
    overview: 'Leave Friday night, be in the mountains by breakfast. This three-day escape covers Solang Valley, the Atal Tunnel and the snowfields of Sissu, with a cozy Old Manali café stay and an overnight Volvo coach from Delhi. Maximum mountain, minimum leave.',
    itinerary: [
      { day: 1, title: 'Delhi → Manali · Overnight coach', detail: 'Board the AC Volvo from Majnu-ka-Tilla around 6 pm. Travel overnight through the hills.', meals: '—', stay: 'Overnight Volvo' },
      { day: 2, title: 'Manali · Solang & Old Manali', detail: 'Arrive, check in and freshen up. Afternoon in Solang Valley with optional paragliding, evening in Old Manali cafés.', meals: 'Breakfast, Dinner', stay: 'Boutique stay, Old Manali' },
      { day: 3, title: 'Atal Tunnel → Sissu → Delhi', detail: 'Drive through the Atal Tunnel to Sissu for snow and river views. Return to Manali by evening and board the coach to Delhi.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [{ city: 'Old Manali', name: 'The Himalayan Cottage', category: 'Boutique', nights: 1 }],
    transport: [
      { mode: 'Volvo coach', detail: 'Delhi–Manali–Delhi AC sleeper coach' },
      { mode: 'Local cab', detail: 'Private cab for Solang, Atal Tunnel and Sissu' }
    ],
    included: ['Return Volvo coach from Delhi', '1 night boutique stay', 'Breakfast & dinner', 'Private cab for sightseeing', 'Atal Tunnel permits', 'Local support'],
    excluded: ['Paragliding / adventure activities', 'Lunches', 'Snow gear rental', 'Personal expenses']
  },
  {
    id: 'bali-bliss', name: 'Bali Island Bliss', type: 'honeymoon', region: 'international',
    destinationId: 'bali', location: 'Ubud · Seminyak · Nusa Penida', days: 6, nights: 5,
    price: 64999, oldPrice: 78999, badge: 'Trending', image: IMG.bali, gallery: [IMG.bali, IMG.resort, IMG.beach],
    rating: 4.8, reviews: 274, groupSize: '2–8 guests', startCity: 'Denpasar',
    highlights: ['Private pool villa', 'Nusa Penida tour', 'Floating breakfast', 'Airport transfers'],
    travelDates: ['2026-12-08', '2026-12-22', '2027-01-12', '2027-01-26', '2027-02-09'],
    overview: 'Five nights split between Ubud\'s jungle and Seminyak\'s beaches, with a full-day Nusa Penida boat tour in between. Stay in a private pool villa, wake up to a floating breakfast and end each day with a Bali sunset. Flights, transfers and daily breakfast included.',
    itinerary: [
      { day: 1, title: 'Arrive Bali · Ubud villa', detail: 'Airport pickup and transfer to your private pool villa in Ubud. Flower bath and welcome dinner.', meals: 'Dinner', stay: 'Pool villa, Ubud' },
      { day: 2, title: 'Ubud · Rice terraces & temples', detail: 'Tegallalang rice terraces, Tirta Empul water temple and the Monkey Forest. Evening Balinese dance.', meals: 'Breakfast', stay: 'Pool villa, Ubud' },
      { day: 3, title: 'Nusa Penida day trip', detail: 'Speedboat to Nusa Penida — Kelingking Beach, Angel\'s Billabong and Crystal Bay snorkelling.', meals: 'Breakfast, Lunch', stay: 'Pool villa, Ubud' },
      { day: 4, title: 'Ubud → Seminyak', detail: 'Morning floating breakfast, then transfer to Seminyak. Afternoon at the beach club.', meals: 'Breakfast', stay: 'Beach resort, Seminyak' },
      { day: 5, title: 'Seminyak · Sunset & spa', detail: 'Free morning, couple spa in the afternoon and a sunset dinner at Tanah Lot or Uluwatu.', meals: 'Breakfast, Dinner', stay: 'Beach resort, Seminyak' },
      { day: 6, title: 'Departure', detail: 'Breakfast and airport transfer.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Ubud', name: 'Jungle View Private Pool Villa', category: '5★', nights: 3 },
      { city: 'Seminyak', name: 'The Seminyak Beach Resort', category: '5★', nights: 2 }
    ],
    transport: [
      { mode: 'Private car', detail: 'AC car with driver for all transfers and tours' },
      { mode: 'Speedboat', detail: 'Return fast boat to Nusa Penida' }
    ],
    included: ['5 nights with daily breakfast', 'Private pool villa in Ubud', 'Airport transfers', 'Nusa Penida full-day tour', 'Floating breakfast once', 'Couple spa (60 min)'],
    excluded: ['International flights', 'Visa on arrival (if applicable)', 'Lunches & dinners not listed', 'Travel insurance']
  },
  {
    id: 'dubai-family', name: 'Dubai City & Desert Family Fun', type: 'family', region: 'international',
    destinationId: 'dubai', location: 'Dubai · Abu Dhabi', days: 5, nights: 4,
    price: 54999, oldPrice: 66999, badge: 'Kids love it', image: IMG.dubai, gallery: [IMG.dubai, IMG.desert, IMG.resort],
    rating: 4.8, reviews: 392, groupSize: '2–12 guests', startCity: 'Dubai',
    highlights: ['Burj Khalifa 124F', 'Desert safari', 'Ferrari World', 'Dhow cruise'],
    travelDates: ['2026-12-06', '2026-12-20', '2027-01-10', '2027-01-24', '2027-02-07'],
    overview: 'Five days of skyline, sand and theme parks. Ride to the 124th floor of Burj Khalifa, spend an evening in the desert with camel rides and BBQ, then take the family to Ferrari World in Abu Dhabi. A dhow dinner cruise and Dubai Mall fountain show complete the trip.',
    itinerary: [
      { day: 1, title: 'Arrive Dubai · Dhow cruise', detail: 'Airport pickup and hotel check-in. Evening dhow dinner cruise on Dubai Creek with live entertainment.', meals: 'Dinner', stay: '4★ hotel, Deira' },
      { day: 2, title: 'Dubai city tour · Burj Khalifa', detail: 'Jumeirah Mosque, Palm Jumeirah and Dubai Mall. Timed entry to Burj Khalifa 124th floor at sunset.', meals: 'Breakfast', stay: '4★ hotel, Deira' },
      { day: 3, title: 'Desert safari · BBQ under stars', detail: 'Morning free. Afternoon dune bashing, camel ride, henna and tanoura show with BBQ dinner in the desert.', meals: 'Breakfast, Dinner', stay: '4★ hotel, Deira' },
      { day: 4, title: 'Abu Dhabi · Ferrari World', detail: 'Full-day trip to Abu Dhabi with Ferrari World tickets and a photo stop at Sheikh Zayed Mosque.', meals: 'Breakfast', stay: '4★ hotel, Deira' },
      { day: 5, title: 'Departure', detail: 'Breakfast, last shopping at the gold souk and airport drop.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [{ city: 'Dubai', name: 'Citymax Bur Dubai', category: '4★', nights: 4 }],
    transport: [
      { mode: 'Private van', detail: 'AC van with driver for all transfers and tours' },
      { mode: 'Flights', detail: 'Return flights can be added on request' }
    ],
    included: ['4 nights with breakfast', 'Airport transfers', 'Burj Khalifa 124F tickets', 'Desert safari with BBQ', 'Ferrari World tickets', 'Dhow dinner cruise'],
    excluded: ['International flights', 'UAE tourist visa', 'Lunches', 'Optional theme parks']
  },
  {
    id: 'swiss-alpine', name: 'Switzerland Alpine Dream', type: 'honeymoon', region: 'international',
    destinationId: 'switzerland', location: 'Zurich · Lucerne · Interlaken · Zermatt', days: 7, nights: 6,
    price: 129999, oldPrice: 149999, badge: 'Premium', image: IMG.switzerland, gallery: [IMG.switzerland, IMG.snow, IMG.lake],
    rating: 4.9, reviews: 96, groupSize: '2–6 guests', startCity: 'Zurich',
    highlights: ['Jungfraujoch', 'Glacier Express', 'Swiss Travel Pass', 'Lake Lucerne'],
    travelDates: ['2027-05-14', '2027-06-04', '2027-06-25', '2027-09-10', '2027-09-24'],
    overview: 'Seven days of alpine wonder by train. Ride the Glacier Express, stand on the Jungfraujoch — the Top of Europe — and cruise Lake Lucerne. With a Swiss Travel Pass covering trains, boats and museums, all you have to do is look out the window.',
    itinerary: [
      { day: 1, title: 'Arrive Zurich · Lucerne', detail: 'Airport pickup, activate your Swiss Travel Pass and train to Lucerne. Evening walk on the Chapel Bridge.', meals: '—', stay: 'Hotel, Lucerne' },
      { day: 2, title: 'Mount Titlis · Engelberg', detail: 'Rotair cable car to Mount Titlis, cliff walk and glacier cave. Afternoon back in Lucerne.', meals: 'Breakfast', stay: 'Hotel, Lucerne' },
      { day: 3, title: 'Lucerne → Interlaken', detail: 'Panoramic train to Interlaken. Afternoon cruise on Lake Brienz and stroll through the old town.', meals: 'Breakfast', stay: 'Hotel, Interlaken' },
      { day: 4, title: 'Jungfraujoch · Top of Europe', detail: 'Train to Europe\'s highest station, Ice Palace and Sphinx observatory. Optional paragliding in the evening.', meals: 'Breakfast', stay: 'Hotel, Interlaken' },
      { day: 5, title: 'Interlaken → Zermatt', detail: 'Scenic rail to Zermatt. Evening walk with Matterhorn views and fondue dinner.', meals: 'Breakfast, Dinner', stay: 'Hotel, Zermatt' },
      { day: 6, title: 'Gornergrat · Glacier Express', detail: 'Morning cogwheel train to Gornergrat, afternoon on the Glacier Express route through the Alps.', meals: 'Breakfast', stay: 'Hotel, Zermatt' },
      { day: 7, title: 'Zermatt → Zurich · Departure', detail: 'Train to Zurich airport for your flight home.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Lucerne', name: 'Hotel des Balances (river view)', category: '4★', nights: 2 },
      { city: 'Interlaken', name: 'Hotel Interlaken', category: '4★', nights: 2 },
      { city: 'Zermatt', name: 'Hotel Walliserhof', category: '4★', nights: 2 }
    ],
    transport: [
      { mode: 'Swiss Travel Pass', detail: '8-day consecutive pass for trains, boats and museums' },
      { mode: 'Excursions', detail: 'Titlis, Jungfraujoch and Gornergrat tickets included' }
    ],
    included: ['6 nights in 4★ hotels', 'Daily breakfast', '8-day Swiss Travel Pass', 'Jungfraujoch & Titlis tickets', 'Gornergrat railway', 'Airport transfers'],
    excluded: ['International flights', 'Schengen visa fees', 'Lunches & dinners not listed', 'City taxes']
  },
  {
    id: 'thailand-group', name: 'Thailand Island Hopper — Group Tour', type: 'group', region: 'international',
    destinationId: 'thailand', location: 'Phuket · Phi Phi · Krabi', days: 6, nights: 5,
    price: 46999, oldPrice: 57999, badge: 'Small group', image: IMG.thailand, gallery: [IMG.thailand, IMG.boat, IMG.beach],
    rating: 4.7, reviews: 208, groupSize: '8–16 travellers', startCity: 'Phuket',
    highlights: ['Phi Phi speedboat', 'James Bond Island', 'Group leader', 'Beach parties'],
    travelDates: ['2026-12-13', '2026-12-27', '2027-01-17', '2027-02-14', '2027-03-07'],
    overview: 'Join a small group of like-minded travellers for six days of island hopping, kayaking and beach nights. Speedboat to Phi Phi, canoe through Phang Nga\'s sea caves and finish in Railay. A fun, social trip with a group leader and most meals included.',
    itinerary: [
      { day: 1, title: 'Arrive Phuket · Patong evening', detail: 'Airport pickup, check-in and group welcome dinner. Evening walk along Patong Beach.', meals: 'Dinner', stay: 'Beach hotel, Patong' },
      { day: 2, title: 'Phi Phi Islands speedboat', detail: 'Full-day speedboat to Maya Bay, Pileh Lagoon and Bamboo Island with snorkelling and lunch.', meals: 'Breakfast, Lunch', stay: 'Beach hotel, Patong' },
      { day: 3, title: 'Phuket → Krabi · Railay', detail: 'Transfer to Krabi and longtail boat to Railay. Afternoon rock climbing or beach time.', meals: 'Breakfast', stay: 'Resort, Ao Nang' },
      { day: 4, title: 'Four Islands tour', detail: 'Longtail boat to Chicken Island, Tup Island and Poda with snorkelling and a beach picnic.', meals: 'Breakfast, Lunch', stay: 'Resort, Ao Nang' },
      { day: 5, title: 'Phang Nga Bay · James Bond Island', detail: 'Sea canoe through limestone caves, visit James Bond Island and the floating Muslim village.', meals: 'Breakfast, Lunch', stay: 'Resort, Ao Nang' },
      { day: 6, title: 'Departure', detail: 'Breakfast and transfer to Phuket airport.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Phuket', name: 'Andaman Beach Suites', category: '4★', nights: 2 },
      { city: 'Krabi', name: 'Ao Nang Cliff Beach Resort', category: '4★', nights: 3 }
    ],
    transport: [
      { mode: 'Speedboat', detail: 'Phi Phi and island-hopping speedboats' },
      { mode: 'Longtail boat', detail: 'Krabi four-island and Phang Nga tours' }
    ],
    included: ['5 nights with breakfast', 'Airport transfers', 'Phi Phi speedboat tour', 'Four Islands tour', 'Phang Nga canoe tour', 'English-speaking group leader'],
    excluded: ['International flights', 'Thailand visa (if applicable)', 'Dinners', 'National park fees (approx. THB 400/day)']
  },
  {
    id: 'andaman-coral', name: 'Andaman Coral Islands', type: 'honeymoon', region: 'india',
    destinationId: 'andaman', location: 'Port Blair · Havelock · Neil Island', days: 5, nights: 4,
    price: 34999, oldPrice: 42999, badge: 'Island romance', image: IMG.andaman, gallery: [IMG.andaman, IMG.beach, IMG.underwater],
    rating: 4.8, reviews: 176, groupSize: '2–6 guests', startCity: 'Port Blair',
    highlights: ['Radhanagar Beach', 'Scuba dive', 'Private ferry', 'Candlelit dinner'],
    travelDates: ['2026-12-03', '2026-12-17', '2027-01-07', '2027-01-21', '2027-02-11'],
    overview: 'Five days across three islands — Port Blair\'s history, Havelock\'s white sand and Neil\'s quiet shores. Snorkel a coral reef, try a beginner scuba dive and end with a candlelit dinner on the beach. Private ferries and transfers make island hopping effortless.',
    itinerary: [
      { day: 1, title: 'Arrive Port Blair · Cellular Jail', detail: 'Airport pickup and check-in. Afternoon Cellular Jail visit and the light-and-sound show.', meals: 'Dinner', stay: 'Hotel, Port Blair' },
      { day: 2, title: 'Port Blair → Havelock', detail: 'Private ferry to Havelock. Afternoon at Radhanagar Beach — widely rated Asia\'s best.', meals: 'Breakfast', stay: 'Beach resort, Havelock' },
      { day: 3, title: 'Elephant Beach · Snorkelling', detail: 'Speedboat to Elephant Beach for snorkelling and water sports. Evening candlelit dinner on the sand.', meals: 'Breakfast, Dinner', stay: 'Beach resort, Havelock' },
      { day: 4, title: 'Havelock → Neil Island', detail: 'Ferry to Neil Island. Visit Bharatpur Beach, Natural Bridge and Laxmanpur sunset point.', meals: 'Breakfast', stay: 'Resort, Neil Island' },
      { day: 5, title: 'Neil → Port Blair · Departure', detail: 'Ferry back to Port Blair, optional souvenir stop and airport drop.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Port Blair', name: 'Sinclairs Bayview', category: '4★', nights: 1 },
      { city: 'Havelock', name: 'Symphony Palms Beach Resort', category: '4★', nights: 2 },
      { city: 'Neil Island', name: 'Summer Sands Beach Resort', category: '3★', nights: 1 }
    ],
    transport: [
      { mode: 'Private ferry', detail: 'AC catamaran ferries between islands' },
      { mode: 'Speedboat', detail: 'Elephant Beach transfers' }
    ],
    included: ['4 nights accommodation', 'Daily breakfast', 'All ferry tickets', 'Airport transfers', 'Snorkelling at Elephant Beach', 'Candlelit dinner'],
    excluded: ['Flights to Port Blair', 'Scuba diving', 'Water sports', 'Lunches']
  },
  {
    id: 'meghalaya-group', name: 'Meghalaya Group Explorer', type: 'group', region: 'india',
    destinationId: 'meghalaya', location: 'Shillong · Cherrapunji · Dawki', days: 5, nights: 4,
    price: 22999, oldPrice: 27999, badge: 'Offbeat', image: IMG.meghalaya, gallery: [IMG.meghalaya, IMG.forest, IMG.boat],
    rating: 4.8, reviews: 118, groupSize: '8–14 travellers', startCity: 'Guwahati',
    highlights: ['Root bridges', 'Dawki kayaking', 'Camping', 'Local guide'],
    travelDates: ['2026-11-21', '2026-12-12', '2027-01-09', '2027-02-06', '2027-03-06'],
    overview: 'Five days in India\'s greenest state with a small, friendly group. Trek to the double-decker root bridge, kayak the crystal-clear Umngot at Dawki, sleep in a riverside camp and explore the cleanest village in Asia. A gentle adventure for nature lovers.',
    itinerary: [
      { day: 1, title: 'Guwahati → Shillong', detail: 'Pickup from Guwahati airport, drive to Shillong via Umiam Lake. Evening at Police Bazaar.', meals: 'Dinner', stay: 'Hotel, Shillong' },
      { day: 2, title: 'Shillong → Cherrapunji', detail: 'Elephant Falls, Mawsmai Caves and Seven Sisters Falls. Sunset at Laitlum Canyons.', meals: 'Breakfast, Dinner', stay: 'Homestay, Cherrapunji' },
      { day: 3, title: 'Root bridge trek · Nongriat', detail: 'Trek down 3,000 steps to the double-decker living root bridge and swim in the blue pools.', meals: 'Breakfast, Lunch, Dinner', stay: 'Homestay, Cherrapunji' },
      { day: 4, title: 'Dawki · Umngot kayaking', detail: 'Drive to Dawki for kayaking on the glass-clear river, then Mawlynnong village. Riverside camp night.', meals: 'Breakfast, Dinner', stay: 'Riverside camp, Shnongpdeng' },
      { day: 5, title: 'Camp → Guwahati · Departure', detail: 'Sunrise by the river, breakfast and drive back to Guwahati airport.', meals: 'Breakfast', stay: '—' }
    ],
    hotels: [
      { city: 'Shillong', name: 'Hotel Centre Point', category: '3★', nights: 1 },
      { city: 'Cherrapunji', name: 'Polo Orchid Homestay', category: 'Homestay', nights: 2 },
      { city: 'Shnongpdeng', name: 'Umngot Riverside Camp', category: 'Deluxe tent', nights: 1 }
    ],
    transport: [
      { mode: 'Tempo traveller', detail: 'AC vehicle for the full group' },
      { mode: 'Kayak', detail: 'Umngot river kayaking with instructor' }
    ],
    included: ['4 nights accommodation', 'Daily breakfast & 4 dinners', 'AC tempo traveller', 'Root bridge trek guide', 'Dawki kayaking', 'Airport transfers'],
    excluded: ['Flights to Guwahati', 'Lunches', 'Entry fees', 'Personal expenses']
  },
  {
    id: 'custom-builder', name: 'Build Your Own Custom Tour', type: 'custom', region: 'india',
    destinationId: 'kerala-backwaters', location: 'Anywhere in India & beyond', days: 0, nights: 0,
    price: 0, oldPrice: 0, badge: 'Made for you', image: IMG.lake, gallery: [IMG.lake, IMG.mountain, IMG.beach],
    rating: 5.0, reviews: 88, groupSize: 'Any size', startCity: 'Your city',
    highlights: ['Your dates', 'Your budget', 'Private guide', '24×7 support'],
    travelDates: [], priceOnRequest: true,
    overview: 'Tell us your dates, budget and travel style — our planners will design a trip around you. Honeymoons, multi-generational family holidays, corporate retreats or solo sabbaticals; we handle flights, stays, transfers, guides and experiences, then send a single clear quote.',
    itinerary: [
      { day: 1, title: 'Share your brief', detail: 'Send us your dates, number of travellers, budget and what you love doing on holiday.', meals: '—', stay: '—' },
      { day: 2, title: 'Get a tailored plan', detail: 'A dedicated planner sends a day-by-day plan and transparent quote within 24 hours.', meals: '—', stay: '—' },
      { day: 3, title: 'Refine & confirm', detail: 'Adjust hotels, pace and experiences until it feels right. Pay a small booking deposit to lock dates.', meals: '—', stay: '—' }
    ],
    hotels: [{ city: 'Your choice', name: 'Handpicked stays at every budget', category: '3★–5★', nights: 0 }],
    transport: [{ mode: 'Your choice', detail: 'Private car, train, flight or a mix — we arrange it all' }],
    included: ['Personal travel planner', 'Custom day-by-day itinerary', 'Transparent single quote', 'All bookings handled', '24×7 on-trip support'],
    excluded: ['Anything outside the agreed plan', 'Optional experiences', 'Personal expenses']
  }
];

/* ---------------------------------- Offers --------------------------------- */
const OFFERS = [
  { code: 'WANDER10', title: 'Flat 10% off your first trip', text: 'New to Wanderluxe? Use this code on any domestic package and save up to ₹5,000.', off: '10% OFF', image: IMG.kerala, days: 5 },
  { code: 'HONEYMOON15', title: 'Honeymoon upgrade on us', text: 'Book any honeymoon package and get a free room upgrade plus a candlelit dinner.', off: 'FREE UPGRADE', image: IMG.maldives, days: 9 },
  { code: 'GROUP20', title: 'Friends who travel together', text: 'Groups of 6 or more save an extra 20% per person on selected group departures.', off: '20% OFF', image: IMG.ladakh, days: 14 }
];

/* ---------------------------------- Blogs ---------------------------------- */
const BLOGS = [
  {
    id: 'best-time-india', title: 'The best time to visit India, month by month',
    excerpt: 'Monsoon, winter or summer? Here is exactly when to go where, from the Himalayas to the backwaters.',
    category: 'Travel tips', date: '2026-11-12', read: '7 min', author: 'Aarav Mehta', image: IMG.taj,
    body: 'India is a subcontinent, so "best time" depends entirely on where you are going. October to March is the golden window for Rajasthan, Agra, Kerala and Goa — dry days, cool evenings and clear monument views. For Ladakh and Spiti, June to September is the only realistic window once the passes open. The northeast blooms from October to April, while the Andamans are at their best from November to May. Monsoon (June–September) is not a write-off: it is the most dramatic time in the Western Ghats and the best value for luxury hotels.'
  },
  {
    id: 'ladakh-road-trip', title: 'Ladakh by bike: 8 days, 5 passes, one unforgettable high',
    excerpt: 'Everything first-time riders need to know about acclimatisation, permits and packing light.',
    category: 'Adventure', date: '2026-11-05', read: '9 min', author: 'Rhea Kapoor', image: IMG.ladakh,
    body: 'The secret to Ladakh is not speed — it is acclimatisation. Give yourself two full days in Leh before Khardung La, drink more water than you think you need and skip the beer for the first three days. Inner Line Permits are now issued online, and your operator should handle them. Pack layers, not bulk: a windproof shell, thermal base, gloves and a balaclava will do more than a heavy jacket. And ride with a support vehicle — not because you will need it, but because the mountains have a way of surprising even experienced riders.'
  },
  {
    id: 'kerala-houseboat', title: 'What a night on a Kerala houseboat is really like',
    excerpt: 'Slow canals, fresh karimeen and the gentle rhythm of life on the backwaters.',
    category: 'Stays', date: '2026-10-28', read: '5 min', author: 'Nikhil Menon', image: IMG.kerala,
    body: 'A houseboat in Alleppey is not a cruise — it is a floating veranda. You board around noon, drift through narrow canals lined with coconut palms, and stop for the night in a quiet backwater. The crew cooks fresh fish, tapioca and appam; you eat on the deck as fireflies appear. Choose a smaller two-bedroom boat over a big one, ask for an upper-deck cabin and carry mosquito repellent. The best part is the silence.'
  },
  {
    id: 'dubai-family-guide', title: 'Dubai with kids: a 5-day plan that actually works',
    excerpt: 'How to balance theme parks, desert and downtime without anyone melting down.',
    category: 'Family', date: '2026-10-19', read: '6 min', author: 'Sara Khan', image: IMG.dubai,
    body: 'Dubai is a brilliant family destination if you pace it. Put a theme park day after a late arrival, not before. Book Burj Khalifa for the last slot before sunset so you get day and night views. The desert safari is a long afternoon — take the shorter dune-bashing option with younger children. And build in one pool afternoon: it will be the day they remember most.'
  },
  {
    id: 'honeymoon-india', title: '10 romantic escapes in India under ₹40,000',
    excerpt: 'Private pools, lake palaces and beach sunsets that do not require a passport.',
    category: 'Honeymoon', date: '2026-10-08', read: '8 min', author: 'Ishita Rao', image: IMG.udaipur,
    body: 'You do not need an international flight for a honeymoon that feels far away. Udaipur\'s heritage havelis, a private houseboat in Alleppey, a beach villa in South Goa, a treehouse in Wayanad and a luxury camp in Nubra all deliver the magic. Book shoulder-season dates (late September, early February) for the best rates, ask hotels for honeymoon perks — most offer décor or a cake free — and choose one splurge night rather than five average ones.'
  },
  {
    id: 'packing-smart', title: 'The 12-item carry-on that covers every Indian climate',
    excerpt: 'From 35°C beaches to 3,500 m mountain passes, here is the capsule that works.',
    category: 'Travel tips', date: '2026-09-26', read: '4 min', author: 'Aarav Mehta', image: IMG.mountain,
    body: 'Start with layers: a breathable tee, a light merino long-sleeve, a packable down jacket and a rain shell. Add one pair of comfortable walking shoes, one sandal, quick-dry trousers and a scarf that doubles as a sun wrap. Pack a universal adapter, a power bank, a reusable bottle with filter and a small medical kit. Everything else — including that fourth pair of shoes — you will not use.'
  }
];

/* ----------------------------------- FAQs ---------------------------------- */
const FAQ_GROUPS = [
  {
    id: 'booking', title: 'Booking & payments',
    items: [
      { q: 'How do I book a tour package?', a: 'Pick a package, choose your travel date and number of travellers, then enter your details. You will get an instant booking confirmation with a booking ID. A 25% deposit secures your dates; the balance is due 15 days before departure.' },
      { q: 'What payment methods do you accept?', a: 'This demo uses a mock checkout. On the live site we accept UPI, credit/debit cards, net banking and EMI on selected cards. International cards are accepted for overseas packages.' },
      { q: 'Is my booking confirmed immediately?', a: 'Yes. Your seats are held as soon as you complete the booking form. You will see a confirmation screen and can view the booking any time under "My Bookings".' },
      { q: 'Can I book for someone else?', a: 'Absolutely. Enter the lead traveller\'s details and add a note in "Special requests" with the other travellers\' names. We will send the documents to the lead traveller\'s email.' }
    ]
  },
  {
    id: 'changes', title: 'Changes & cancellations',
    items: [
      { q: 'What is your cancellation policy?', a: 'Free cancellation up to 15 days before departure. Between 14 and 7 days, 50% of the package cost is refundable. Within 7 days, the booking is non-refundable. Flight and visa costs follow the airline/embassy rules.' },
      { q: 'Can I change my travel date?', a: 'Yes, subject to availability. Date changes are free up to 15 days before departure; after that, any supplier charges apply. Use the "My Bookings" page or contact your planner.' },
      { q: 'What happens if a trip is cancelled by you?', a: 'If we cancel for operational reasons, you get a full refund or a free move to another departure — your choice. We will always offer the closest alternative first.' }
    ]
  },
  {
    id: 'travel', title: 'On the trip',
    items: [
      { q: 'Are flights included in the package price?', a: 'Domestic packages generally exclude flights unless stated. International packages include airport transfers but not airfare, because fares vary by city. We can add flights at the time of booking.' },
      { q: 'What standard are the hotels?', a: 'Each package lists its hotels and categories. We use handpicked 3★ to 5★ properties and heritage stays. If a listed hotel is unavailable, we substitute one of equal or higher standard.' },
      { q: 'Do you provide visa assistance?', a: 'Yes, for international trips we provide a document checklist, invitation letters where needed and guidance through the application. Embassy fees are payable separately.' },
      { q: 'Is travel insurance included?', a: 'Basic insurance is included on selected international packages. We strongly recommend the add-on for adventure trips, and it is mandatory for Ladakh bike expeditions.' }
    ]
  },
  {
    id: 'custom', title: 'Custom & group trips',
    items: [
      { q: 'Can you build a custom itinerary?', a: 'Yes — that is our favourite kind of work. Share your dates, budget and travel style and a planner will send a tailored day-by-day plan within 24 hours, free of charge.' },
      { q: 'Do you organise corporate offsites?', a: 'We do. We handle flights, stays, meeting spaces, team activities and billing under one invoice. Ask for our corporate deck via the contact page.' },
      { q: 'What is the minimum group size?', a: 'Group departures run with 8–16 travellers. For private groups, we can operate from 4 people upwards, with pricing adjusted accordingly.' }
    ]
  }
];

const TESTIMONIALS = [
  { name: 'Ananya & Rohan', trip: 'Maldives Honeymoon', text: 'Every detail was handled — the speedboat, the villa upgrade, even a cake on our last night. We just showed up and enjoyed it. Easily the best trip of our lives.', avatar: 'https://i.pravatar.cc/100?img=32', rating: 5 },
  { name: 'The Sharma family', trip: 'Golden Triangle', text: 'Travelling with two kids and my parents could have been chaos. Our driver and guides made it effortless, and the Taj at sunrise made everyone emotional. Worth every rupee.', avatar: 'https://i.pravatar.cc/100?img=12', rating: 5 },
  { name: 'Kabir Nair', trip: 'Ladakh Bike Expedition', text: 'The support crew was outstanding. Oxygen when I needed it, a mechanic who fixed a puncture at 4,500 m, and views I still dream about. Already booked Spiti for next year.', avatar: 'https://i.pravatar.cc/100?img=68', rating: 5 }
];

const NOTIFICATIONS = [
  { id: 'n1', icon: 'offer', tone: 'gold', title: 'Flat 10% off your first trip', text: 'Use code WANDER10 on any domestic package. Ends soon.', time: '2 hours ago', unread: true },
  { id: 'n2', icon: 'calendar', tone: 'teal', title: 'Winter departures now open', text: 'December & January dates for Rajasthan, Kerala and Goa are live.', time: 'Yesterday', unread: true },
  { id: 'n3', icon: 'bell', tone: '', title: 'Free cancellation up to 15 days', text: 'Book with confidence — plans change, we get it.', time: '2 days ago', unread: true },
  { id: 'n4', icon: 'star', tone: 'gold', title: '4.9/5 from 12,000+ travellers', text: 'Thank you for making us India\'s highest-rated boutique tour operator.', time: '3 days ago', unread: false }
];
