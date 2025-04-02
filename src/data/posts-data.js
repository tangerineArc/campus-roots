const posts = [
  {
    id: 1,
    name: "Jon Snow",
    headline: "Lord Commander of the Night's Watch",
    profilePic:
      "https://img2.wikia.nocookie.net/__cb20150512181258/gameofthrones/images/9/95/Jon_Snow_(S05E05).jpg",
    createdBefore: "3h",
    postBody:
      "Winter is coming, and so is my resignation letter. Leading a group of men who barely listen, fighting creatures that shouldn't exist, and constantly freezing—definitely not the dream job I signed up for. But leadership is about making the hard choices, even when no one else will. I never wanted power, but sometimes responsibility finds you whether you're ready or not. If you find yourself in a position of responsibility, remember: honor and duty come first, even when the world turns against you. Never let fear dictate your decisions. Stand firm, stay true. #Leadership #HardChoices",
    likesCount: 254,
    commentsCount: 39,
    imageUrls: [""],
  },
  {
    id: 2,
    name: "Daenerys Targaryen",
    headline: "Mother of Dragons | Breaker of Chains",
    profilePic:
      "https://i.pinimg.com/originals/f1/14/49/f11449534ece2bc8cf3309c40f44fe27.jpg",
    createdBefore: "1d",
    postBody:
      "Just landed in Westeros, ready to shake things up. The world has been ruled by the same old systems for far too long, and it's time for real change. Disrupting the industry isn't easy—people fear what they don't understand. But when you have vision, resilience, and the right team (plus three dragons), anything is possible. Leadership isn't about taking power; it's about inspiring others to believe in a better future. It requires difficult decisions, sacrifices, and the courage to stand alone if necessary. Change isn't always welcomed, but the future belongs to those who create it. Who's ready to innovate with me? #DisruptTheThrone #Leadership",
    likesCount: 1345,
    commentsCount: 215,
    imageUrls: [""],
  },
  {
    id: 3,
    name: "Tyrion Lannister",
    headline: "Hand of the Queen | Wine Connoisseur",
    profilePic: "https://wallpapercave.com/wp/wp4903381.jpg",
    createdBefore: "5h",
    postBody:
      "One of the most underrated skills in leadership? Knowing when to shut up and listen. You'd be surprised how much you can learn when you let others do the talking. Over the years, I've advised kings, queens, and warlords, and one thing remains the same—power is only as strong as the wisdom behind it.A lot of people think leadership is about being the loudest in the room, but the truth is, the best leaders are the best listeners. They know when to step back, observe, and strike at the right moment. And if all else fails, always have a good drink in hand and a sharp wit. #LeadershipLessons #DrinkingAndKnowingThings",
    likesCount: 987,
    commentsCount: 174,
    imageUrls: [""],
  },
  {
    id: 4,
    name: "Arya Stark",
    headline: "No One | Faceless Freelancer",
    profilePic:
      "https://comicvine.gamespot.com/a/uploads/scale_medium/13/132327/6035013-wisnu-tan-arya.jpg",
    createdBefore: "8h",
    postBody:
      "A lot of people talk about hustle, but how many are truly committed? When you have a goal, you don't just dream about it—you train, you learn, and you execute. I've spent years perfecting my craft, pushing past limits, and now I'm exactly where I want to be. Success isn't about being seen, it's about doing the work even when no one is watching. Discipline, persistence, and adaptability—these are the keys. No excuses, no shortcuts, just results. Who else is crossing names off their to-do list today? #Hustle #NightKingWasEasy",
    likesCount: 768,
    commentsCount: 102,
    imageUrls: [""],
  },
  {
    id: 5,
    name: "Cersei Lannister",
    headline: "CEO of Westeros | Red Keep Executive",
    profilePic:
      "https://i.pinimg.com/originals/22/5e/76/225e7683d2c341ce8cbe15dfc283af46.jpg",
    createdBefore: "2d",
    postBody:
      "Running a kingdom is harder than it looks. Everyone wants power, but few understand the responsibility that comes with it. Leadership is not about being liked — it's about making the tough calls, securing your position, and ensuring survival. Success requires strategic thinking, adaptability, and knowing when to eliminate threats before they become problems. Sometimes, you must break the rules to stay ahead. The game isn't fair, so why should I be? #Leadership #QueenVibes",
    likesCount: 421,
    commentsCount: 67,
    imageUrls: [""],
  },
  {
    id: 6,
    name: "Bran Stark",
    headline: "Three-Eyed Raven | CEO of Westeros (Unexpectedly)",
    profilePic:
      "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/11/14/bran-stark.jpg",
    createdBefore: "12h",
    postBody:
      "I don't mean to flex, but I saw this promotion coming before you did. Sometimes leadership isn't about ambition—it's about being the right person in the right place at the right time. Vision is everything. If you don't understand the past and see the future, how can you make the right decisions in the present? Leadership is about perspective, wisdom, and knowing when to let things unfold. Also, being carried everywhere is pretty great. #Visionary #Leadership",
    likesCount: 852,
    commentsCount: 193,
    imageUrls: [""],
  },
  {
    id: 7,
    name: "Jaime Lannister",
    headline: "Kingslayer | Former Commander of the Kingsguard",
    profilePic:
      "https://miro.medium.com/v2/resize:fit:1400/0*9orHI1f-ohJ1XBC3.jpg",
    createdBefore: "4h",
    postBody:
      "Sometimes, taking bold action means making tough decisions. Leadership isn't about being liked; it's about getting the job done. I've been called a villain, a hero, and everything in between—but at the end of the day, my choices define me, not the opinions of others. Your reputation is built on the actions you take, not the titles you hold. If you believe in something, stand by it. And if you're ever in doubt—ask yourself, 'Would I still do this if no one was watching?' #LessonsFromExperience",
    likesCount: 649,
    commentsCount: 88,
    imageUrls: [""],
  },
  {
    id: 8,
    name: "Sandor Clegane",
    headline: "The Hound | Problem Solver",
    profilePic:
      "https://i.pinimg.com/originals/e3/32/f2/e332f2dd05c8bd9b03745efc6823f672.png",
    createdBefore: "6h",
    postBody:
      "Quit my job, took a long walk, fought my brother, and now I'm reconsidering everything. Sometimes a career change is just what you need. Life is too short to spend it in the wrong place, serving the wrong people. If you're unhappy, do something about it. Don't stay where you don't belong. And most importantly — don't be afraid to burn bridges if they lead to the wrong destination. #LifeReflections",
    likesCount: 789,
    commentsCount: 112,
    imageUrls: [""],
  },
  {
    id: 9,
    name: "Samwell Tarly",
    headline: "Grand Maester | Knowledge Enthusiast",
    profilePic: "",
    createdBefore: "1d",
    postBody:
      "Just finished writing a book on recent history. It's funny how the people who actually shape history rarely get the credit, while others take all the glory. But that's why it's important to document, research, and never stop asking questions. Knowledge is the greatest weapon we have. I went from being the least likely warrior at Castle Black to uncovering secrets that changed the course of history. Never let anyone tell you that you're not capable—curiosity, persistence, and a little bit of bravery can take you further than you ever imagined. If you're passionate about learning, let's connect. Maybe we can swap notes on White Walkers and leadership failures. #LifelongLearner #KnowledgeIsPower",
    likesCount: 524,
    commentsCount: 67,
    imageUrls: [""],
  },
  {
    id: 11,
    name: "Petyr Baelish",
    headline: "Founder & CEO | Master of Strategy",
    profilePic: "https://data.voz.vn/avatars/h/1556/1556989.jpg?1647576316",
    createdBefore: "2h",
    postBody:
      "Success isn't about luck—it's about strategy. You don't rise from nothing to power by waiting for opportunities; you create them. Every conversation, every alliance, every minor detail—it all matters. The key to winning isn't brute force; it's influence. It's knowing what people desire and how to position yourself as the one who can provide it. Chaos? Chaos isn't a pit — it's a ladder. Most fail to climb it, some refuse to, but the few who see the opportunity will rise above the rest. So ask yourself: are you playing the game, or are you being played? #Strategy #Influence #ClimbTheLadder",
    likesCount: 678,
    commentsCount: 145,
    imageUrls: [""],
  },
];

export default posts;
