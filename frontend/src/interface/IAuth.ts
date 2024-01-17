// src/types/auth.type.ts
export interface AuthState {
  user: string;
  token: string | null;
  successLoginParticipant: boolean;
  verifyParticipant: boolean;
}

export interface ILogin {
  username: string;
  password:string
}

export interface authLogin {
  token: string;
 user :string
}

export interface Login {
  auth: authLogin[];
}