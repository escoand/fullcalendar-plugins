const SESSION_STORE = "_oauth2_session";

type Oauth2Session = {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  state?: string;
  verifier?: string;
};

function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
}

function base64url(bytes: ArrayBuffer | Uint8Array) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generatePKCE() {
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
  return sha256(verifier).then((challenge) => ({
    verifier: verifier,
    challenge: base64url(challenge),
  }));
}

function saveSession(data: Oauth2Session) {
  sessionStorage.setItem(SESSION_STORE, JSON.stringify(data));
}

function loadSession(): Oauth2Session | null {
  const raw = sessionStorage.getItem(SESSION_STORE);
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  sessionStorage.removeItem(SESSION_STORE);
}

class Oauth2AuthProvider implements CalDavAuthProvider {
  private _auth_url: URL | string;
  private _token_url: URL | string;
  private _client_id: string;
  private _client_secret?: string;
  private _redirect_url = window.location.origin + window.location.pathname;

  constructor(
    auth_url: URL | string,
    token_url: URL | string,
    client_id: string,
    client_secret?: string
  ) {
    this._auth_url = auth_url;
    this._token_url = token_url;
    this._client_id = client_id;
    this._client_secret = client_secret;

    addEventListener("load", this._callback.bind(this));
  }

  isLoggedIn(): boolean {
    const session = loadSession();
    return Boolean(session?.access_token);
  }

  getAuth(): string | undefined {
    const session = loadSession();
    if (!session?.access_token) return undefined;
    return session.token_type + " " + session.access_token;
  }

  startLogin(): void {
    generatePKCE().then(({ verifier, challenge }) => {
      const state = crypto.randomUUID();

      saveSession({ verifier, state });

      const authUrl = new URL(this._auth_url);
      authUrl.search = new URLSearchParams({
        response_type: "code",
        client_id: this._client_id,
        redirect_uri: this._redirect_url,
        code_challenge_method: "S256",
        code_challenge: challenge,
        state: state,
      }).toString();

      window.location.assign(authUrl.toString());
    });
  }

  private _callback(): void {
    const url = new URL(window.location.href);

    if (!url.searchParams.has("code")) return;

    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state");
    const session = loadSession();

    if (!session || session.state !== returnedState) {
      console.error("OAuth state mismatch");
      clearSession();
      return;
    }

    fetch(this._token_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this._client_id,
        client_secret: this._client_secret || "",
        redirect_uri: this._redirect_url,
        code_verifier: session.verifier || "",
        code: code || "",
      }),
    })
      .then((response) => response.json())
      .then((tokens) => {
        saveSession({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_type: tokens.token_type,
        });
        window.history.replaceState({}, "", this._redirect_url);
      })
      .catch((err) => {
        clearSession();
        throw err;
      });
  }
}

export default Oauth2AuthProvider;
