interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface BookTable {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
}

interface UserTable {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  role: "USER" | "ADMIN" | null;
  createdAt: Date | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  lastActivityDate: string | null;
  borrowedBooks: number;
}

interface AccountTable {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  role: "USER" | "ADMIN" | null;
  createdAt: Date | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  lastActivityDate: string | null;
}

interface BorrowTable {
  id: string;
  bookId: string;
  createdAt: Date | null;
  status: "REQUESTED" | "BORROWED" | "RETURNED" | "OVERDUE" | null;
  bookTitle: string;
  bookCoverUrl: string;
  bookCoverColor: string;
  userFullName: string;
  userEmail: string;
  borrowDate: string | null;
  returnDate: string | null;
  dueDate: string | null;
}
