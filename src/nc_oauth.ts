const NC_BASE_URL = "...";  
const CLIENT_ID = ...";  
const REDIRECT_URI = window.location.origin + window.location.pathname;
const SESSION_STORE = "nc_oauth";

function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return crypto.subtle.digest("SHA-256", data);
}

function base64url(bytes) {
    return btoa(String.fromCharCode(...new Uint8Array(bytes)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function generatePKCE() {
    const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
    return sha256(verifier).then(challenge =>
        ({
            verifier: verifier,
            challenge: base64url(challenge)
        })
    );
}

function saveSession(data) {
    sessionStorage.setItem(SESSION_STORE, JSON.stringify(data));
}

function loadSession() {
    const raw = sessionStorage.getItem(SESSION_STORE);
    return raw ? JSON.parse(raw) : null;
}

function clearSession() {
    sessionStorage.removeItem(SESSION_STORE);
}

function startLogin() {
    generatePKCE().then({ verifier, challenge } => {
        const state = crypto.randomUUID();
    
        saveSession({ verifier, state });

        const authUrl = new URL("/index.php/apps/oauth2/authorize", NC_BASE_URL);
        authUrl.search = new URLSearchParams({
            response_type: "code",
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code_challenge_method: "S256",
            code_challenge: challenge,
            state: state
        }).toString();

        window.location = authUrl.toString();
    });
}

function handleOAuthCallback() {
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

    fetch(`${NC_BASE_URL}/index.php/apps/oauth2/api/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code_verifier: session.verifier,
            code: code
        })
    })
    .then(reponse => reponse.json())
    .then(tokens => {
        saveSession({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        });
        window.history.replaceState({}, "", REDIRECT_URI);
    });
}

addEventListener("load", () => handleOAuthCallback());
