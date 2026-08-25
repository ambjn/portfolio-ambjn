export type ProjectLinks = {
  github?: string;
  appStore?: string;
  testflight?: string;
  website?: string;
  npm?: string;
};

export type Project = {
  title: string;
  description: string;
  links?: ProjectLinks;
  images?: string[];
};

export const personalInfo = {
  name: "Amber J",
  tagline: "engineering things that (mostly) work",
  bio: "25 y/o dev with 3+ years across AI, Web3 & Robotics.\nshipping mobile apps, A/V SDKs & AI-powered products.",
  email: "jainanuamber@gmail.com",
} as const;

export const projects: Project[] = [
  {
    title: "ALYA",
    description: "learn Spanish the way you actually talk.\nchat & speak with an AI companion that corrects you in context.",
    links: {
      appStore: "https://apps.apple.com/in/app/alya-learn-spanish-with-ai/id6758835552",
      website: "https://www.alyacompanion.xyz/",
    },
    images: [
      "/projects/alya/1.png",
      "/projects/alya/2.png",
      "/projects/alya/3.png",
      "/projects/alya/4.png",
      "/projects/alya/5.png",
      "/projects/alya/6.png",
      "/projects/alya/7.png",
    ],
  },
  {
    title: "Journexa",
    description: "the AI journal app that talks back.\nwrite freely, speak it, or get guided — track moods & ask your journal anything.",
    links: {
      appStore: "https://apps.apple.com/us/app/journexa-ai-journal-voice/id6762561616",
      website: "https://www.journexa.xyz/",
    },
    images: [
      "/projects/journexa/1.png",
      "/projects/journexa/2.png",
      "/projects/journexa/3.png",
      "/projects/journexa/4.png",
      "/projects/journexa/5.png",
    ],
  },
  {
    title: "Grovi Builds",
    description: "Describe your app. Ship it in seconds.\nCreate mini apps with AI, publish them, and remix creations from other users.",
    links: {
      testflight: "https://testflight.apple.com/join/d7ZHMurt",
    },
    images: [
      "/projects/grovi/1.PNG",
      "/projects/grovi/2.PNG",
      "/projects/grovi/3.PNG",
    ],
  },
  {
    title: "Jackfruit",
    description: "describe an app and get a standalone Flutter project with a live web preview.\ndownload production-ready source for Android, iOS, and web.",
    links: {
      website: "https://jackfruit.diy/",
      github: "https://github.com/ambjn/novi",
    },
  },
  {
    title: "Sprout",
    description: "privacy-first analytics for React Native Expo apps, powered entirely by your own Convex deployment.\nan Expo SDK, Convex component, CLI, and local dashboard — with no analytics infra to host.",
    links: {
      github: "https://github.com/ambjn/sprout",
      npm: "https://www.npmjs.com/package/@sprout-convex/analytics",
    },
  },
  {
    title: "ScreenShotKit",
    description: "beautiful app screenshots, instantly.\ncreate stunning App Store & Play Store screenshots in seconds.",
    links: {
      website: "https://www.screenshotkit.xyz/",
    },
    images: ["/projects/screenshotkit/1.png"],
  },
  {
    title: "Elio Wallet",
    description: "Your Solana stablecoins avenue.\nSpend. Trade. Predict.\nAll-in-one. All on Solana.",
    links: {
      github: "https://github.com/ambjn/elio-wallet",
      website: "https://eliowallet.vercel.app/",
    },
    images: [
      "/projects/elio-wallet/1.PNG",
      "/projects/elio-wallet/2.PNG",
      "/projects/elio-wallet/3.PNG",
    ],
  },
  {
    title: "SolSettl",
    description: "split bills. settle instantly.\npowered by solana & stablecoins\nyour crypto-native onchain expense splitting",
    images: [
      "/projects/solsettl/1.jpg",
      "/projects/solsettl/2.jpg",
      "/projects/solsettl/3.jpg",
      "/projects/solsettl/4.jpg",
      "/projects/solsettl/5.jpg",
      "/projects/solsettl/6.jpg",
    ],
  },
  {
    title: "Pillow",
    description: "browse crypto markets & trade Hyperliquid perpetuals from mobile.\nbuilt with Expo, Convex, embedded wallets & Hyperliquid.",
    links: {
      github: "https://github.com/ambjn/pillow",
    },
    images: ["/projects/pillow/1.png"],
  },
  {
    title: "Mediasoup: Kotlin Client",
    description: "Native Android SDK for real-time A/V built on WebRTC with MediaSoup SFU.\nCurrently powers a Web3 startup with 20K+ MAU.",
    links: {
      github: "https://github.com/Huddle01/Kotlin-Client",
    },
  },
  {
    title: "What's Next?",
    description: "Currently exploring AI agents & on-chain infra.\nAlways building. Always shipping.",
  },
];

export const workExperience = [
  {
    company: "PillsTrade",
    role: "Dev",
    period: "Aug 2025",
    description: "Shipped a Telegram bot for 24/7 RWA perpetual (powered by Ostium Protocol) trading on Arbitrum & Solana.",
  },
  {
    company: "Huddle01",
    role: "Mobile Engineer",
    period: "Jul 2023 - Jul 2025",
    description: "Led React Native mobile app dev (50K+ downloads)\nBuilt & shipped multi-platform A/V SDKs (Kotlin, Flutter, Unity)\nAuthored custom MediaSoup WebRTC sdk clients for Android & Flutter (mediasoup-engine).",
  },
  {
    company: "Nosh Robotics",
    role: "SDE Intern",
    period: "Oct 2022 - Apr 2023",
    description: "Owned end-to-end development of Android robotics applications.\nLed Jetpack Compose migration for enhanced UX.\nDrove performance optimizations informed by user feedback.",
  },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/ambjn" },
  { label: "Twitter", href: "https://twitter.com/ambjnnn" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ambjn" },
] as const;
