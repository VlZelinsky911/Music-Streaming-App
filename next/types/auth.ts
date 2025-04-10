export interface GoogleAuthResponse {
  url?: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt: string;
  updatedAt: string;
}