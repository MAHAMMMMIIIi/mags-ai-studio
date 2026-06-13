export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    roles: string[];
    permissions: string[];
    emailVerified: boolean;
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
  };
}
