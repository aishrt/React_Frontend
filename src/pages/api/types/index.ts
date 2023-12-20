export type AuthUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  role: "ADMIN" | "USER";
  isEmailVerified: boolean;
};

export type Token = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type UserResponse = {
  tokens: Tokens;
  user: AuthUser;
};
