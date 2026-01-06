import Oauth2AuthProvider from "./oauth2";

class NextcloudAuth extends Oauth2AuthProvider {
  constructor(base_url: string, client_id: string, client_secret?: string) {
    const auth_url = new URL(
      "/index.php/apps/oauth2/authorize",
      base_url
    ).toString();
    const token_url = new URL(
      "/index.php/apps/oauth2/api/v1/token",
      base_url
    ).toString();
    super(auth_url, token_url, client_id, client_secret);
  }
}

export default NextcloudAuth;
