export interface LoginRequest {
  readonly userName: string;
  readonly password: string;
}

export interface RegistrationRequest {
  readonly userName: string;
  readonly password: string;
  readonly name: string;
  readonly lastName: string;
}

export interface AuthResponse {
  readonly id: number;
  readonly userName: string;
  readonly name: string;
  readonly lastName: string;
  readonly jwt: string;
}
