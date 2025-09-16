export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/borrow-records",
    text: "Borrow Records",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullname: "text",
  email: "email",
  universityId: "number",
  password: "password",
};

export const sampleBooks = [
  {
    id: 1,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Philosophy / Fiction",
    rating: 4.6,
    totalCopies: 20,
    availableCopies: 10,
    description:
      "A decadent descent into eternal youth and corruption, where a haunting portrait bears the scars of a soul lost to temptation and vanity.",
    coverColor: "#C9B992",
    coverUrl: "https://m.media-amazon.com/images/I/71sxO5ihG6L._SL1499_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A decadent descent into eternal youth and corruption, where a haunting portrait bears the scars of a soul lost to temptation and vanity.",
  },
  {
    id: 2,
    title: "Microbiology: An Introduction",
    author: "Matt Haig",
    genre: "Science / Biology",
    rating: 4.6,
    totalCopies: 20,
    availableCopies: 10,
    description:
      "Cutting edge microbiology research for today's learners. For pre-nursing and allied health students (including mixed-majors courses).",
    coverColor: "#BE2D6B",
    coverUrl: "https://m.media-amazon.com/images/I/51aUuugYnkL.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Cutting edge microbiology research for today's learners. For pre-nursing and allied health students (including mixed-majors courses).",
  },
  {
    id: 3,
    title: "Crime & Punishment",
    author: "Fyodor Dostoevesky",
    genre: "Psychology / Fiction",
    rating: 4.9,
    totalCopies: 99,
    availableCopies: 50,
    description:
      "A gripping psychological exploration of guilt, morality, and redemption through the mind of a desperate man wrestling with his darkest deed.",
    coverColor: "#D2252B",
    coverUrl: "https://m.media-amazon.com/images/I/612KmKeEYEL._SL1500_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A gripping psychological exploration of guilt, morality, and redemption through the mind of a desperate man wrestling with his darkest deed.",
  },
  {
    id: 4,
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    genre: "Programming / JS",
    rating: 4.7,
    totalCopies: 9,
    availableCopies: 5,
    description:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
    coverColor: "#f8e036",
    coverUrl:
      "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
  },
  {
    id: 5,
    title: "Hamlet",
    author: "William Shakespeare",
    genre: "Tragedy",
    rating: 4.5,
    totalCopies: 78,
    availableCopies: 50,
    description:
      "A tempest of revenge, madness, and existential torment unfolds in Elsinore's shadowed halls as the Prince of Denmark wrestles with fate and fury.",
    coverColor: "#B12329",
    coverUrl: "https://m.media-amazon.com/images/I/71uz9igbHrL._SL1500_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A tempest of revenge, madness, and existential torment unfolds in Elsinore’s shadowed halls as the Prince of Denmark wrestles with fate and fury.",
  },
  {
    id: 6,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic / Fiction",
    rating: 4.7,
    totalCopies: 23,
    availableCopies: 23,
    description:
      "An intoxicating glimpse into the Jazz Age's glittering excess, where the elusive Gatsby chases a dream as fragile and fleeting as a green light across the bay.",
    coverColor: "#0F223A",
    coverUrl: "https://m.media-amazon.com/images/I/81tn3IljAUL._SL1500_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An intoxicating glimpse into the Jazz Age’s glittering excess, where the elusive Gatsby chases a dream as fragile and fleeting as a green light across the bay.",
  },

  {
    id: 7,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "CS / Programming",
    rating: 4.8,
    totalCopies: 25,
    availableCopies: 3,
    description:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
    coverColor: "#24232A",
    coverUrl:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
  },
  {
    id: 8,
    title: "Electronics for Inventors",
    author: "Paul Scherz",
    genre: "Engineering",
    rating: 4.8,
    totalCopies: 10,
    availableCopies: 5,
    description:
      "Advance your electronics knowledge and gain the skills necessary to develop and construct your own functioning gadgets.",
    coverColor: "#CD602E",
    coverUrl:
      "https://m.media-amazon.com/images/I/61JtUKEfXQL._SL1000_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Advance your electronics knowledge and gain the skills necessary to develop and construct your own functioning gadgets.",
  },
  {
    id: 9,
    title: "Pride & Prejudice",
    author: "Jane Austen",
    genre: "Literature",
    rating: 4.6,
    totalCopies: 20,
    availableCopies: 10,
    description:
      "A sparkling dance of wit and romance, where fiery Elizabeth Bennet challenges societal norms and the enigmatic Mr. Darcy in a timeless battle of pride and passion.",
    coverColor: "#3C5486",
    coverUrl: "https://m.media-amazon.com/images/I/91MfFBRDceL._SL1500_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A sparkling dance of wit and romance, where fiery Elizabeth Bennet challenges societal norms and the enigmatic Mr. Darcy in a timeless battle of pride and passion.",
  },
  {
    id: 10,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "CS / Programming",
    rating: 4.8,
    totalCopies: 56,
    availableCopies: 56,
    description:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
    coverColor: "#080c0d",
    coverUrl:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
  },
];

export const sorts = [
  {
    value: "oldest",
    label: "Oldest",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "available",
    label: "Available",
  },
  {
    value: "highestRated",
    label: "Highest Rated",
  },
];

export const userRoles = [
  {
    value: "USER",
    label: "User",
    bgColor: "bg-[#FDF2FA]",
    textColor: "text-[#C11574]",
  },
  {
    value: "ADMIN",
    label: "Admin",
    bgColor: "bg-[#ECFDF3]",
    textColor: "text-[#027A48]",
  },
];

export const borrowStatuses = [
  {
    value: "overdue",
    label: "Overdue",
    bgColor: "bg-[#FFF1F3]",
    textColor: "text-[#C01048]",
  },
  {
    value: "borrowed",
    label: "Borrowed",
    bgColor: "bg-[#F9F5FF]",
    textColor: "text-[#6941C6]",
  },
  {
    value: "returned",
    label: "Returned",
    bgColor: "bg-[#F0F9FF]",
    textColor: "text-[#026AA2]",
  },
];

export const pastelColors = [
   "#FEF3C7", // soft amber (between amber-100 and amber-200)
  "#DBEAFE", // soft blue
  "#E0E7FF", // soft indigo
  "#FCE7F3", // soft pink
  "#D1FAE5", // soft emerald
  "#FECACA", // soft red
  "#FED7AA", // soft orange
  "#EDE9FE", // soft violet
  "#F3E8FF", // soft purple
  "#CCFBF1", // soft teal
];