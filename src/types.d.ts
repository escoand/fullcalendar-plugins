interface CalDavAuthProvider {
  isLoggedIn(): boolean;
  getAuth(): string | undefined;
  startLogin(): void;
}
