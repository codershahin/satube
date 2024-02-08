interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image: string | null;
  username: string | null;
  bio: string | null;
}
