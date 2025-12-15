interface CalDavAuthProvider {
  isLoggedIn(): boolean;
  getAuth(): string | null;
  startLogin(): void;
}
