/**
 * Builds the Google OAuth 2.0 authorization URL.
 *
 * NEXT_PUBLIC_GOOGLE_CLIENT_ID is baked into the bundle at build time by
 * Next.js. If you add it to Vercel after deploying, you must redeploy for
 * it to take effect.
 *
 * @throws {Error} if NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set at build time
 */
export function buildGoogleOAuthURL(state?: string): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "Google sign-in is not configured. " +
        "Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment and redeploy."
    );
  }

  const redirectUri = `${window.location.origin}/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  if (state) {
    params.set("state", state);
  }

  return `https://accounts.google.com/o/oauth2/auth?${params}`;
}
