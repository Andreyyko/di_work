export type Track = {
  id: number;
  title: string;
  src: string;
};

export type Category = {
  id: number;
  title: string;
  tracks: Track[];
};

export const audioData: Category[] = [
  {
    id: 1,
    title: "Фортепіано",
    tracks: [
      {
        id: 1,
        title: "A Very Brady Special",
        src: "/audio/piano/A Very Brady Special.mp3",
      },
      {
        id: 2,
        title: "Babbling brook",
        src: "/audio/piano/Babbling brook.mp3",
      },
      {
        id: 3,
        title: "Calm and relaxing piano",
        src: "/audio/piano/Calm and relaxing piano.mp3",
      },
      {
        id: 4,
        title: "Celestial piano",
        src: "/audio/piano/Celestial piano.mp3",
      },
      {
        id: 5,
        title: "Cozy piano for relaxation",
        src: "/audio/piano/Cozy piano for relaxation.mp3",
      },
      {
        id: 6,
        title: "Gentle romantic piano",
        src: "/audio/piano/Gentle romantic piano.mp3",
      },
      {
        id: 7,
        title: "Isolation Waltz",
        src: "/audio/piano/Isolation Waltz.mp3",
      },
      {
        id: 8,
        title: "Lovely Piano Song",
        src: "/audio/piano/Lovely Piano Song.mp3",
      },
      { id: 9, title: "Mist", src: "/audio/piano/Mist.mp3" },
      {
        id: 10,
        title: "Nostalgic piano solo",
        src: "/audio/piano/Nostalgic piano solo.mp3",
      },
      {
        id: 11,
        title: "Nostalgic Piano",
        src: "/audio/piano/Nostalgic Piano.mp3",
      },
      { id: 12, title: "Piano 1", src: "/audio/piano/Piano 1.mp3" },
      { id: 13, title: "Piano 2", src: "/audio/piano/Piano 2.mp3" },
      { id: 14, title: "Piano calm", src: "/audio/piano/Piano calm.mp3" },
      {
        id: 15,
        title: "Piano Magic Motive",
        src: "/audio/piano/Piano Magic Motive.mp3",
      },
      {
        id: 16,
        title: "Piano music for relaxation",
        src: "/audio/piano/Piano music for relaxation.mp3",
      },
      { id: 17, title: "Piano music", src: "/audio/piano/Piano music.mp3" },
      {
        id: 18,
        title: "Piano nostalgic music",
        src: "/audio/piano/Piano nostalgic music.mp3",
      },
      { id: 19, title: "Pond", src: "/audio/piano/Pond.mp3" },
      { id: 20, title: "Puddle", src: "/audio/piano/Puddle.mp3" },
      {
        id: 21,
        title: "Relaxing classical piano 2",
        src: "/audio/piano/Relaxing classical piano 2.mp3",
      },
      {
        id: 22,
        title: "Relaxing classical piano",
        src: "/audio/piano/Relaxing classical piano.mp3",
      },
      {
        id: 23,
        title: "Relaxing piano ambient",
        src: "/audio/piano/Relaxing piano ambient.mp3",
      },
      {
        id: 24,
        title: "Relaxing piano",
        src: "/audio/piano/Relaxing piano.mp3",
      },
      { id: 25, title: "Shining Stars", src: "/audio/piano/Shining Stars.mp3" },
      {
        id: 26,
        title: "Soft calm piano music",
        src: "/audio/piano/Soft calm piano music.mp3",
      },
      {
        id: 27,
        title: "Spring sunshine piano",
        src: "/audio/piano/Spring sunshine piano.mp3",
      },
      { id: 28, title: "Spring", src: "/audio/piano/Spring.mp3" },
    ],
  },
  {
    id: 2,
    title: "Скрипка",
    tracks: [
      {
        id: 101,
        title: "Bach violin concerto",
        src: "/audio/violin/Bach violin concerto.mp3",
      },
      {
        id: 102,
        title: "Baroque violin melody",
        src: "/audio/violin/Baroque violin melody.mp3",
      },
      {
        id: 103,
        title: "Bittersweet melody",
        src: "/audio/violin/Bittersweet melody.mp3",
      },
      {
        id: 104,
        title: "Classical strings violin music",
        src: "/audio/violin/Classical strings violin music.mp3",
      },
      { id: 105, title: "Echo violin", src: "/audio/violin/Echo violin.mp3" },
      {
        id: 106,
        title: "Emotional inspiring violin",
        src: "/audio/violin/Emotional inspiring violin.mp3",
      },
      { id: 107, title: "Violin", src: "/audio/violin/Violin.mp3" },
      {
        id: 108,
        title: "Violins in the mist",
        src: "/audio/violin/Violins in the mist.mp3",
      },
    ],
  },
  {
    id: 3,
    title: "Релакс",
    tracks: [
      {
        id: 201,
        title: "Africa spirit",
        src: "/audio/relax/Africa spirit.mp3",
      },
      {
        id: 202,
        title: "Ambient chillhop",
        src: "/audio/relax/Ambient chillhop.mp3",
      },
      { id: 203, title: "Ambient", src: "/audio/relax/Ambient.mp3" },
      {
        id: 204,
        title: "As the season turns",
        src: "/audio/relax/As the season turns.mp3",
      },
      {
        id: 205,
        title: "Atmospheric deep",
        src: "/audio/relax/Atmospheric deep.mp3",
      },
      {
        id: 206,
        title: "Atmospheric lost in the cosmos",
        src: "/audio/relax/Atmospheric lost in the cosmos.mp3",
      },
      {
        id: 207,
        title: "Background music",
        src: "/audio/relax/Background music.mp3",
      },
      {
        id: 208,
        title: "Between dreams",
        src: "/audio/relax/Between dreams.mp3",
      },
      { id: 209, title: "Bird flight", src: "/audio/relax/Bird flight.mp3" },
      {
        id: 210,
        title: "Calm acoustic quiet",
        src: "/audio/relax/Calm acoustic quiet.mp3",
      },
      {
        id: 211,
        title: "Calm acoustic",
        src: "/audio/relax/Calm acoustic.mp3",
      },
      {
        id: 212,
        title: "Calm backround",
        src: "/audio/relax/Calm backround.mp3",
      },
      { id: 213, title: "Calm music", src: "/audio/relax/Calm music.mp3" },
      {
        id: 214,
        title: "Calm space music",
        src: "/audio/relax/Calm space music.mp3",
      },
      { id: 215, title: "Cello", src: "/audio/relax/Cello.mp3" },
      { id: 216, title: "Chill", src: "/audio/relax/Chill.mp3" },
      {
        id: 217,
        title: "Coniferous forest",
        src: "/audio/relax/Coniferous forest.mp3",
      },
      { id: 218, title: "Deep ambient", src: "/audio/relax/Deep ambient.mp3" },
      { id: 219, title: "Deepemotion", src: "/audio/relax/Deepemotion.mp3" },
      {
        id: 220,
        title: "Dreamland lullaby feelings music",
        src: "/audio/relax/Dreamland lullaby feelings music.mp3",
      },
      {
        id: 221,
        title: "Dreamland music 1",
        src: "/audio/relax/Dreamland music 1.mp3",
      },
      {
        id: 222,
        title: "Dreamland music 2",
        src: "/audio/relax/Dreamland music 2.mp3",
      },
      {
        id: 223,
        title: "Echoes of home",
        src: "/audio/relax/Echoes of home.mp3",
      },
      { id: 224, title: "Forest fog", src: "/audio/relax/Forest fog.mp3" },
      {
        id: 225,
        title: "Heaven in my hands",
        src: "/audio/relax/Heaven in my hands.mp3",
      },
      {
        id: 226,
        title: "Me and nature",
        src: "/audio/relax/Me and nature.mp3",
      },
      {
        id: 227,
        title: "Meditation relax background music",
        src: "/audio/relax/Meditation relax background music.mp3",
      },
      { id: 228, title: "Meditative", src: "/audio/relax/Meditative.mp3" },
      {
        id: 229,
        title: "Morning in forest",
        src: "/audio/relax/Morning in forest.mp3",
      },
      { id: 230, title: "Movie theme", src: "/audio/relax/Movie theme.mp3" },
      { id: 231, title: "Nature walk", src: "/audio/relax/Nature walk.mp3" },
      {
        id: 232,
        title: "Quiet piano moonlight",
        src: "/audio/relax/Quiet piano moonlight.mp3",
      },
      {
        id: 233,
        title: "Rainy romantic",
        src: "/audio/relax/Rainy romantic.mp3",
      },
      { id: 234, title: "Relaxation", src: "/audio/relax/Relaxation.mp3" },
      {
        id: 235,
        title: "Sad piano water",
        src: "/audio/relax/Sad piano water.mp3",
      },
      {
        id: 236,
        title: "Sad violin and piano",
        src: "/audio/relax/Sad violin and piano.mp3",
      },
      { id: 237, title: "Sea veiw", src: "/audio/relax/Sea veiw.mp3" },
      {
        id: 238,
        title: "Seasonal music",
        src: "/audio/relax/Seasonal music.mp3",
      },
      { id: 239, title: "Silent dream", src: "/audio/relax/Silent dream.mp3" },
      {
        id: 240,
        title: "Sleepy melody",
        src: "/audio/relax/Sleepy melody.mp3",
      },
      {
        id: 241,
        title: "Slow melody 1",
        src: "/audio/relax/Slow melody 1.mp3",
      },
      {
        id: 242,
        title: "Slow melody 2",
        src: "/audio/relax/Slow melody 2.mp3",
      },
      { id: 243, title: "Soulsong", src: "/audio/relax/Soulsong.mp3" },
      { id: 244, title: "Space", src: "/audio/relax/Space.mp3" },
      { id: 245, title: "Spring rain", src: "/audio/relax/Spring rain.mp3" },
      { id: 246, title: "Summer chill", src: "/audio/relax/Summer chill.mp3" },
      { id: 247, title: "The lofi", src: "/audio/relax/The lofi.mp3" },
      {
        id: 248,
        title: "Traditional chinese music",
        src: "/audio/relax/Traditional chinese music.mp3",
      },
      {
        id: 249,
        title: "Unison of souls",
        src: "/audio/relax/Unison of souls.mp3",
      },
      { id: 250, title: "Walk", src: "/audio/relax/Walk.mp3" },
      { id: 251, title: "Warm dreamy", src: "/audio/relax/Warm dreamy.mp3" },
      {
        id: 252,
        title: "Whispers of the soul slow relaxing violin",
        src: "/audio/relax/Whispers of the soul slow relaxing violin.mp3",
      },
      {
        id: 253,
        title: "Without any reason",
        src: "/audio/relax/Without any reason.mp3",
      },
    ],
  },
  {
    id: 4,
    title: "Мотивуючі мелодії",
    tracks: [
      {
        id: 301,
        title: "A new beginning",
        src: "/audio/motivation/A new beginning.mp3",
      },
      {
        id: 302,
        title: "Atmospheric in the air",
        src: "/audio/motivation/Atmospheric in the air.mp3",
      },
      {
        id: 303,
        title: "Atmospheric safe travels",
        src: "/audio/motivation/Atmospheric safe travels.mp3",
      },
      {
        id: 304,
        title: "Beautiful piano",
        src: "/audio/motivation/Beautiful piano.mp3",
      },
      {
        id: 305,
        title: "Beyond horizons",
        src: "/audio/motivation/Beyond horizons.mp3",
      },
      {
        id: 306,
        title: "Beyond the time",
        src: "/audio/motivation/Beyond the time.mp3",
      },
      {
        id: 307,
        title: "Cvilni violin",
        src: "/audio/motivation/Cvilni violin.mp3",
      },
      {
        id: 308,
        title: "Desolate lament",
        src: "/audio/motivation/Desolate lament.mp3",
      },
      { id: 309, title: "Dreams", src: "/audio/motivation/Dreams.mp3" },
      {
        id: 310,
        title: "Epic violin instrumental music",
        src: "/audio/motivation/Epic violin instrumental music.mp3",
      },
      {
        id: 311,
        title: "Magnificent music",
        src: "/audio/motivation/Magnificent music.mp3",
      },
      {
        id: 312,
        title: "Nature music",
        src: "/audio/motivation/Nature music.mp3",
      },
      {
        id: 313,
        title: "Piano arpeggios",
        src: "/audio/motivation/Piano arpeggios.mp3",
      },
      { id: 314, title: "Prelude", src: "/audio/motivation/Prelude.mp3" },
      {
        id: 315,
        title: "Romantic Inspiration",
        src: "/audio/motivation/Romantic Inspiration.mp3",
      },
      { id: 316, title: "Whale song", src: "/audio/motivation/Whale song.mp3" },
    ],
  },
  {
    id: 5,
    title: "Медитація",
    tracks: [
      {
        id: 401,
        title: "A walk with god",
        src: "/audio/meditation/A walk with god.mp3",
      },
      {
        id: 402,
        title: "Ambient background",
        src: "/audio/meditation/Ambient background.mp3",
      },
      {
        id: 403,
        title: "Beach sounds melody",
        src: "/audio/meditation/Beach sounds melody.mp3",
      },
      { id: 404, title: "Calm", src: "/audio/meditation/Calm.mp3" },
      { id: 405, title: "Dark music", src: "/audio/meditation/Dark music.mp3" },
      { id: 406, title: "Deep focus", src: "/audio/meditation/Deep focus.mp3" },
      {
        id: 407,
        title: "Dreamcloud meditation",
        src: "/audio/meditation/Dreamcloud meditation.mp3",
      },
      {
        id: 408,
        title: "Meditation and nature",
        src: "/audio/meditation/Meditation and nature.mp3",
      },
      {
        id: 409,
        title: "Meditation guitar",
        src: "/audio/meditation/Meditation guitar.mp3",
      },
      {
        id: 410,
        title: "Meditation peaceful",
        src: "/audio/meditation/Meditation peaceful.mp3",
      },
      {
        id: 411,
        title: "Meditation spiritual music",
        src: "/audio/meditation/Meditation spiritual music.mp3",
      },
      {
        id: 412,
        title: "Meditative (1)",
        src: "/audio/meditation/Meditative (1).mp3",
      },
      {
        id: 413,
        title: "Relaxing music with nature sounds",
        src: "/audio/meditation/Relaxing music with nature sounds.mp3",
      },
      {
        id: 414,
        title: "Water meditation",
        src: "/audio/meditation/Water meditation.mp3",
      },
      {
        id: 415,
        title: "Whispers of the ocean",
        src: "/audio/meditation/Whispers of the ocean.mp3",
      },
      {
        id: 416,
        title: "Wild atlantic spray meditation",
        src: "/audio/meditation/Wild atlantic spray meditation.mp3",
      },
      { id: 417, title: "Yoga", src: "/audio/meditation/Yoga.mp3" },
    ],
  },
  {
    id: 6,
    title: "Звук природи",
    tracks: [
      {
        id: 501,
        title: "Atmosphere with rain",
        src: "/audio/natureSounds/Atmosphere with rain.mp3",
      },
      {
        id: 502,
        title: "Birds forest",
        src: "/audio/natureSounds/Birds forest.mp3",
      },
      { id: 503, title: "Birds", src: "/audio/natureSounds/Birds.mp3" },
      {
        id: 504,
        title: "Blue like earth chillout",
        src: "/audio/natureSounds/Blue like earth chillout.mp3",
      },
      {
        id: 505,
        title: "Classical piano with rain",
        src: "/audio/natureSounds/Classical piano with rain.mp3",
      },
      {
        id: 506,
        title: "Cozy forest",
        src: "/audio/natureSounds/Cozy forest.mp3",
      },
      {
        id: 507,
        title: "Do birds dream",
        src: "/audio/natureSounds/Do birds dream.mp3",
      },
      {
        id: 508,
        title: "Easy cooldown at the waterfall",
        src: "/audio/natureSounds/Easy cooldown at the waterfall.mp3",
      },
      {
        id: 509,
        title: "Fall asleep like a baby relax music",
        src: "/audio/natureSounds/Fall asleep like a baby relax music.mp3",
      },
      {
        id: 510,
        title: "Fantasy theme with natural sounds",
        src: "/audio/natureSounds/Fantasy theme with natural sounds.mp3",
      },
      {
        id: 511,
        title: "Fluid cave",
        src: "/audio/natureSounds/Fluid cave.mp3",
      },
      {
        id: 512,
        title: "Forest rain and birds",
        src: "/audio/natureSounds/Forest rain and birds.mp3",
      },
      {
        id: 513,
        title: "Melodies of a sunrise music and piano",
        src: "/audio/natureSounds/Melodies of a sunrise music and piano.mp3",
      },
      { id: 514, title: "Ocean", src: "/audio/natureSounds/Ocean.mp3" },
      {
        id: 515,
        title: "Piano fantasy",
        src: "/audio/natureSounds/Piano fantasy.mp3",
      },
      {
        id: 516,
        title: "Piano in the forest",
        src: "/audio/natureSounds/Piano in the forest.mp3",
      },
      {
        id: 517,
        title: "Piano music with rain",
        src: "/audio/natureSounds/Piano music with rain.mp3",
      },
      {
        id: 518,
        title: "Piano y naturaleza",
        src: "/audio/natureSounds/Piano y naturaleza.mp3",
      },
      {
        id: 519,
        title: "Relaxing piano in nature",
        src: "/audio/natureSounds/Relaxing piano in nature.mp3",
      },
      {
        id: 520,
        title: "Sleepy rain",
        src: "/audio/natureSounds/Sleepy rain.mp3",
      },
      {
        id: 521,
        title: "Soft birds sound",
        src: "/audio/natureSounds/Soft birds sound.mp3",
      },
      {
        id: 522,
        title: "Sounds of the forest with piano",
        src: "/audio/natureSounds/Sounds of the forest with piano.mp3",
      },
      {
        id: 523,
        title: "Spring Forest",
        src: "/audio/natureSounds/Spring Forest.mp3",
      },
      {
        id: 524,
        title: "Summer breeze",
        src: "/audio/natureSounds/Summer breeze.mp3",
      },
      {
        id: 525,
        title: "Water fountain healing music",
        src: "/audio/natureSounds/Water fountain healing music.mp3",
      },
      {
        id: 526,
        title: "Water sound meditation",
        src: "/audio/natureSounds/Water sound meditation.mp3",
      },
      { id: 527, title: "Water", src: "/audio/natureSounds/Water.mp3" },
      {
        id: 528,
        title: "Watertoblood",
        src: "/audio/natureSounds/Watertoblood.mp3",
      },
      { id: 529, title: "Wave", src: "/audio/natureSounds/Wave.mp3" },
      {
        id: 530,
        title: "Wild atlantic spray meditation (1)",
        src: "/audio/natureSounds/Wild atlantic spray meditation (1).mp3",
      },
    ],
  },
  {
    id: 7,
    title: "Гітара",
    tracks: [
      {
        id: 601,
        title: "Acoustic guitar ballad",
        src: "/audio/guitar/Acoustic guitar ballad.mp3",
      },
      {
        id: 602,
        title: "Acoustic guitar melody",
        src: "/audio/guitar/Acoustic guitar melody.mp3",
      },
      {
        id: 603,
        title: "Acoustic guitar nature music",
        src: "/audio/guitar/Acoustic guitar nature music.mp3",
      },
      {
        id: 604,
        title: "Acoustic guitar solo",
        src: "/audio/guitar/Acoustic guitar solo.mp3",
      },
      {
        id: 605,
        title: "Acoustic guitar",
        src: "/audio/guitar/Acoustic guitar.mp3",
      },
      {
        id: 606,
        title: "Beyond the horizon",
        src: "/audio/guitar/Beyond the horizon.mp3",
      },
      {
        id: 607,
        title: "Calm acoustic adventures",
        src: "/audio/guitar/Calm acoustic adventures.mp3",
      },
      { id: 608, title: "Calm at sea", src: "/audio/guitar/Calm at sea.mp3" },
      { id: 609, title: "Guitar 1", src: "/audio/guitar/Guitar 1.mp3" },
      { id: 610, title: "Guitar 2", src: "/audio/guitar/Guitar 2.mp3" },
      { id: 611, title: "Guitar 3", src: "/audio/guitar/Guitar 3.mp3" },
      { id: 612, title: "Guitar 4", src: "/audio/guitar/Guitar 4.mp3" },
      { id: 613, title: "Guitar 5", src: "/audio/guitar/Guitar 5.mp3" },
      {
        id: 614,
        title: "Guitar slow emotion",
        src: "/audio/guitar/Guitar slow emotion.mp3",
      },
      { id: 615, title: "Guitare", src: "/audio/guitar/Guitare.mp3" },
      {
        id: 616,
        title: "Guitars on the beach",
        src: "/audio/guitar/Guitars on the beach.mp3",
      },
      { id: 617, title: "La Citadelle", src: "/audio/guitar/La Citadelle.mp3" },
      {
        id: 618,
        title: "Patience Party",
        src: "/audio/guitar/Patience Party.mp3",
      },
      { id: 619, title: "Relax guitar", src: "/audio/guitar/Relax guitar.mp3" },
      {
        id: 620,
        title: "Solo guitar 1",
        src: "/audio/guitar/Solo guitar 1.mp3",
      },
      {
        id: 621,
        title: "Solo guitar 2",
        src: "/audio/guitar/Solo guitar 2.mp3",
      },
      {
        id: 622,
        title: "Solo guitar voce",
        src: "/audio/guitar/Solo guitar voce.mp3",
      },
      {
        id: 623,
        title: "Wwrinkled walnut",
        src: "/audio/guitar/Wwrinkled walnut.mp3",
      },
    ],
  },
  {
    id: 8,
    title: "Більш енергійні мелодії",
    tracks: [
      {
        id: 701,
        title: "Ambient jungle",
        src: "/audio/moreEnergyMusic/Ambient jungle.mp3",
      },
      {
        id: 702,
        title: "Bach violin concerto (1)",
        src: "/audio/moreEnergyMusic/Bach violin concerto (1).mp3",
      },
      {
        id: 703,
        title: "Background music 1",
        src: "/audio/moreEnergyMusic/Background music 1.mp3",
      },
      {
        id: 704,
        title: "Background music 2",
        src: "/audio/moreEnergyMusic/Background music 2.mp3",
      },
      {
        id: 705,
        title: "Background music 3",
        src: "/audio/moreEnergyMusic/Background music 3.mp3",
      },
      {
        id: 706,
        title: "Background music 4",
        src: "/audio/moreEnergyMusic/Background music 4.mp3",
      },
      {
        id: 707,
        title: "Background music 5",
        src: "/audio/moreEnergyMusic/Background music 5.mp3",
      },
      {
        id: 708,
        title: "Background music 6",
        src: "/audio/moreEnergyMusic/Background music 6.mp3",
      },
      {
        id: 709,
        title: "Background music 7",
        src: "/audio/moreEnergyMusic/Background music 7.mp3",
      },
      {
        id: 710,
        title: "Background music 8",
        src: "/audio/moreEnergyMusic/Background music 8.mp3",
      },
      {
        id: 711,
        title: "Calmaria das aguas",
        src: "/audio/moreEnergyMusic/Calmaria das aguas.mp3",
      },
      {
        id: 712,
        title: "Chillstep serenity mist music",
        src: "/audio/moreEnergyMusic/Chillstep serenity mist music.mp3",
      },
      {
        id: 713,
        title: "Crescent moon",
        src: "/audio/moreEnergyMusic/Crescent moon.mp3",
      },
      {
        id: 714,
        title: "December rain",
        src: "/audio/moreEnergyMusic/December rain.mp3",
      },
      {
        id: 715,
        title: "Morning with birds",
        src: "/audio/moreEnergyMusic/Morning with birds.mp3",
      },
      {
        id: 716,
        title: "Vibing chill",
        src: "/audio/moreEnergyMusic/Vibing chill.mp3",
      },
      {
        id: 717,
        title: "Violin and piano harmony",
        src: "/audio/moreEnergyMusic/Violin and piano harmony.mp3",
      },
      { id: 718, title: "Waltz", src: "/audio/moreEnergyMusic/Waltz.mp3" },
      {
        id: 719,
        title: "Whispering waters provides a haven",
        src: "/audio/moreEnergyMusic/Whispering waters provides a haven.mp3",
      },
    ],
  },
];
