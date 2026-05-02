export const FONTS = Array.from(new Set([
  // Sans Serif
  "Inter", "Roboto", "Open Sans", "Montserrat", "Lato", "Poppins", "Raleway", "Ubuntu", "Nunito", "Manrope", 
  "Heebo", "Kanit", "Outfit", "Plus Jakarta Sans", "Figtree", "Onest", "Hanken Grotesk", "Barlow", 
  "Catamaran", "Cabin", "Quicksand", "Asap", "Hind", "Assistant", "Arimo", "Work Sans", "DM Sans", "Dosis",
  "Titillium Web", "Maven Pro", "Exo 2", "Orbitron", "Muli", "Overpass", "Karla", "Public Sans", "Inter Tight",
  "Sora", "Syne", "Urbanist", "Lexend", "Readex Pro", "Work Sans", "Space Grotesk", "Golos Text", "Albert Sans",
  "Red Hat Display", "Commissioner", "Be Vietnam Pro", "Epilogue", "Space Grotesk", "Sen", "Rubik", "Prompt",
  "Aix", "Sora", "Outfit", "Plus Jakarta Sans", "Figtree", "Onest", "Hanken Grotesk", "Barlow",
  "Outfit", "Lexend", "Readex Pro", "Space Grotesk", "Golos Text", "Albert Sans",

  // Serif
  "Playfair Display", "Lora", "Merriweather", "PT Serif", "Noto Serif", "Libre Baskerville", "Crimson Text",
  "EB Garamond", "Cormorant Garamond", "Arvo", "Cardo", "Vollkorn", "Old Standard TT", "Domine", "Bitter",
  "Abril Fatface", "Cinzel", "Prata", "Spectral", "Zilla Slab", "Josefin Slab", "Rokkitt", "Neuton", "Alice",
  "Castoro", "Caudex", "Playfair Display SC", "Cinzel Decorative", "Bree Serif", "Patua One", "Yeseva One",
  "Fraunces", "Young Serif", "Instrument Serif", "DM Serif Display", "Schibsted Grotesk", "Bodoni Moda", 
  "Faustina", "Gelasio", "Inria Serif", "Nanum Myeongjo", "Source Serif 4", "Playfair",

  // Monospace
  "Fira Code", "Source Code Pro", "JetBrains Mono", "Inconsolata", "Anonymous Pro", "IBM Plex Mono", 
  "Roboto Mono", "Ubuntu Mono", "Space Mono", "Cousine", "Oxygen Mono", "PT Mono", "Share Tech Mono", 
  "Overpass Mono", "Nanum Gothic Coding", "Major Mono Display", "Nova Mono", "Geist Mono",
  "Martian Mono", "Fragment Mono", "Azeret Mono", "Victor Mono", "Comic Mono", "Inconsolata LGC",

  // Handwriting / Script
  "Dancing Script", "Pacifico", "Indie Flower", "Caveat", "Shadows Into Light", "Satisfy", "Kaushan Script",
  "Handlee", "Patrick Hand", "Gloria Hallelujah", "Architects Daughter", "Yellowtail", "Great Vibes",
  "Cookie", "Lobster", "Allura", "Sacramento", "Grand Hotel", "Rochester", "Alex Brush", "Parisienne",
  "Marck Script", "Tangerine", "Arizonia", "Bad Script", "Courgette", "Damion", "Kalam", "Mr Dafoe",
  "Nothing You Could Do", "Reenie Beanie", "Rock Salt", "Homemade Apple", "Calligraffitti",
  "Pinyon Script", "Petit Formal Script", "Mrs Saint Delafield", "Monsieur La Doulaise", "League Script",
  "Homemade Apple", "Covered By Your Grace", "Amatic SC", "Shadows Into Light Two", "Coming Soon",

  // Display / Fun
  // Display / Fun
  "Bangers", "Luckiest Guy", "Press Start 2P", "VT323", "Silkscreen", "Monoton", "Faster One", "Wallpoet",
  "Creepster", "Nosifer", "Metal Mania", "Bungee", "Bungee Shade", "Bungee Inline", "Bungee Outline", 
  "Bungee Hairline", "Bungee Spice", "Alfa Slab One", "Titan One", "Passion One", "Fugaz One", "Russo One",
  "Bowlby One SC", "Carter One", "Special Elite", "Fredoka One", "Righteous", "Permanent Marker", "Stardos Stencil",
  "Codystar", "Vampiro One", "Eater", "Butcherman", "Frijole", "Jolly Lodger", "Snowburst One", "Megrim",
  "Slackey", "Shojumaru", "Akronim", "Aladin", "Alatsi", "Amita", "Asset", "Bigelow Rules", "Boogaloo",
  "Chango", "Freckle Face", "Ewert", "UnifrakturMaguntia", "Almendra Display", "MedievalSharp", "Pirata One",
  "Kelly Slab", "Piedra", "Fascinate Inline", "Graduate", "Spicy Rice", "Honk", "Nabla", "Rubik Burned",
  "Rubik Glitch", "Rubik Scribble", "Rubik Doodle Shadow", "Rubik Maze", "Rubik Microbe", "Rubik Puddles",
  "Rubik Wet Paint", "Lacquer", "Moirai One", "Platypi", "Jersey 10", "Jersey 25", "Micro 5", "Tiny 5",
  "Protest Revolution", "Protest Riot", "Protest Strike", "Jacquarda Bastarda 9", "Madimi One", "Ojuju", "Tac One",
  "Bebas Neue", "Satoshi", "General Sans", "Clash Display", "Cabinet Grotesk", "Bricolage Grotesque",
  "Michroma", "Audiowide", "Syncopate", "Quantico", "Squada One", "Allerta Stencil", "Righteous", "Fredoka",
  "Abril Fatface", "Alfa Slab One", "Amita", "Anton", "Archivo Black", "Bungee", "Comfortaa", "Concert One",
  "Cookie", "Courgette", "Creepster", "Damion", "Didact Gothic", "Eczar", "Fira Sans", "Handlee",
  "Indie Flower", "Kaushan Script", "Lobster", "Luckiest Guy", "Marck Script", "Pacifico", "Patua One",
  "Permanent Marker", "Satisfy", "Shadows Into Light", "Special Elite", "Titan One", "Varela Round", "Yellowtail",
  "Advent Pro", "Alegreya Sans", "Alexandria", "Alumni Sans", "Amaranth", "Antic Didone", "Antic Slab",
  "Antonio", "Arapey", "Arsenal", "Atma", "Average", "Balsamiq Sans", "Belanosima", "Belleza",
  "BenchNine", "BioRhyme", "Biryani", "Bokor", "Calistoga", "Castoro Titling", "Chakra Petch", "Chivo",
  "Comic Neue", "Cormorant", "Courier Prime", "Crete Round", "Darker Grotesque", "Domine", "Economica",
  "El Messiri", "Exo", "Fahkwang", "Faustina", "Frank Ruhl Libre", "Gantari", "Gelasio", "Georama",
  "Gilda Display", "Glegoo", "Gothic A1", "Goudy Bookletter 1911", "Gowun Batang", "Gowun Dodum",
  "Grandstander", "Grenze", "Hahmlet", "Hind Madurai", "Hind Siliguri", "Hind Vadodara", "IBM Plex Sans",
  "Inria Sans", "Inspiration", "Instrument Sans", "Jost", "Jura", "Klee One", "Kumbh Sans", "League Spartan",
  "Libre Franklin", "Literata", "Livvic", "M PLUS 1p", "M PLUS Rounded 1c", "Mada", "Maitree", "Mako",
  "Marcellus", "Meera Inimai", "Mina", "Modern Antiqua", "Molengo", "Monda", "Niramit", "Nixie One",
  "Noticia Text", "Noto Sans", "Noto Sans Display", "Noto Serif Display", "Nunito Sans", "Old Standard TT",
  "Overlock", "Oxygen", "Palanquin", "Pavanam", "Philosopher", "Playfair", "Podkova", "Poly", "Port Lligat Sans",
  "Pridi", "Questrial", "Quivira", "Rambla", "Rationale", "Red Hat Mono", "Red Hat Text", "Reem Kufi",
  "Rethink Sans", "Rhodium Libre", "Rosario", "Rozha One", "Ruda", "Rufina", "Rura", "Sail", "Saira",
  "Saira Condensed", "Saira Semi Condensed", "Sakkal Majalla", "Sarabun", "Scada", "Scope One",
  "Secular One", "Sedgwick Ave", "Sedgwick Ave Display", "Sentient", "Shippori Mincho", "Sigmar",
  "Sigmar One", "Signika", "Signika Negative", "Sintony", "Skranji", "Slabo 13px", "Slabo 27px",
  "Sniglet", "Snippet", "Sofia", "Sofia Sans", "Sofia Sans Condensed", "Sofia Sans Extra Condensed",
  "Sofia Sans Semi Condensed", "Solway", "Song Myung", "Sora", "Source Code Pro", "Source Sans 3",
  "Source Sans Pro", "Source Serif 4", "Source Serif Pro", "Space Mono", "Spectral", "Spline Sans",
  "Spline Sans Mono", "Squada One", "Sree Kruthibany", "Stalemate", "Stalinist One", "Stardos Stencil",
  "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Style Script", "Stylish", "Sue Ellen Francisco",
  "Suez One", "Sulphur Point", "Sumana", "Sunshiney", "Supermercado One", "Sura", "Suranna", "Suravaram",
  "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Syne", "Syne Tactile", "Tai Heritage Pro", "Tajawal",
  "Tangerine", "Taprom", "Tauri", "Taviraj", "Teko", "Telex", "Tenali Ramakrishna", "Tenor Sans", "Text Me One",
  "Texturina", "Thasadith", "The Girl Next Door", "Tienne", "Tillana", "Timmana", "Tinos", "Tiro Bangla",
  "Tiro Devanagari Hindi", "Tiro Devanagari Marathi", "Tiro Devanagari Sanskrit", "Tiro Gurmukhi", "Tiro Kannada",
  "Tiro Tamil", "Tiro Telugu", "Titan One", "Titillium Web", "Tomorrow", "Tourney", "Trade Winds", "Trirong",
  "Trispace", "Trocchi", "Trochut", "Trykker", "Tulpen One", "Turret Road", "Twinkle Star", "Ubuntu",
  "Ubuntu Condensed", "Ubuntu Mono", "Uchen", "Ultra", "Unbounded", "Uncial Antiqua", "Underlock",
  "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt", "Unlock", "Unna", "Updock", "Urbanist",
  "VT323", "Vampiro One", "Varela", "Varela Round", "Varta", "Vast Shadow", "Vesper Libre", "Viaoda Libre",
  "Vibes", "Vibur", "Vidaloka", "Viga", "Villa", "Vina Sans", "Voces", "Volkhov", "Vollkorn", "Vollkorn SC",
  "Voltaire", "Vuruka", "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes", "Water Brush",
  "Waterfall", "Wavefont", "Wellfleet", "Wendy One", "Whisper", "WindSong", "Wire One", "Work Sans",
  "Xanh Mono", "Yaldevi", "Yanone Kaffeesatz", "Yantramanav", "Yatra One", "Yellowtail", "Yeon Sung",
  "Yeseva One", "Yesteryear", "Yivur", "Yomogi", "Young Serif", "Yusei Magic", "Zeyada", "Zhi Mang Xing",
  "Zilla Slab", "Zilla Slab Highlight"


]));


const loadedFonts = new Set<string>();

export function loadGoogleFont(font: string) {
  if (loadedFonts.has(font)) return;
  const id = `gfont-${font.replace(/\s+/g, "-").toLowerCase()}`;
  if (typeof document !== 'undefined') {
    if (document.getElementById(id)) {
      loadedFonts.add(font);
      return;
    }
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, "+")}:wght@400;700&display=swap`;
    document.head.appendChild(link);
    loadedFonts.add(font);
  }
}

export function loadAllFonts() {
  FONTS.forEach(loadGoogleFont);
}
