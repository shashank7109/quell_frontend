// Relative — Next.js rewrites /api/* → BACKEND_URL/api/* (next.config.js).
// Set BACKEND_URL=http://localhost:8000 in .env.local for local dev.
const BASE_URL = "";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("quell_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail ?? "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  name: string;
  plan: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const auth = {
  register: (email: string, password: string, name: string) =>
    request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<User>("/api/auth/me"),

  googleCallback: (code: string, redirectUri: string) =>
    request<AuthResponse>("/api/auth/google-callback", {
      method: "POST",
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    }),
};

// ── API Keys ──────────────────────────────────────────────────────────────────

export interface APIKey {
  id: number;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

export interface APIKeyCreated extends APIKey {
  full_key: string;
}

export const keys = {
  list: () => request<APIKey[]>("/api/keys"),
  create: (name: string) =>
    request<APIKeyCreated>("/api/keys", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
  revoke: (id: number) =>
    request<void>(`/api/keys/${id}`, { method: "DELETE" }),
};

// ── Usage ─────────────────────────────────────────────────────────────────────

export interface UsageSummary {
  this_month: number;
  monthly_limit: number;
  total_all_time: number;
  daily: { date: string; count: number }[];
}

export interface UsageRecord {
  id: number;
  action: string;
  mutant_id: string | null;
  api_key_prefix: string | null;
  timestamp: string;
}

export const usage = {
  summary: () => request<UsageSummary>("/api/usage/summary"),
  history: (page = 1) =>
    request<UsageRecord[]>(`/api/usage/history?page=${page}&limit=20`),
};

// ── Billing ───────────────────────────────────────────────────────────────────

export interface PlanDetails {
  name: string;
  price: number;
  fixes_per_month: number;
  api_keys: number;
  ai_generation: boolean;
  team_seats: number;
  support: string;
  features: string[];
}

export interface BillingInfo {
  current_plan: string;
  details: PlanDetails;
}

export interface RazorpayOrder {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
}

export const billing = {
  current: () => request<BillingInfo>("/api/billing/plan"),
  plans: () => request<Record<string, PlanDetails>>("/api/billing/plans"),

  createOrder: (plan: string) =>
    request<RazorpayOrder>("/api/billing/create-order", {
      method: "POST",
      body: JSON.stringify({ plan }),
    }),

  verifyPayment: (payload: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    plan: string;
  }) =>
    request<{ message: string; plan: string }>("/api/billing/verify-payment", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // Used for downgrades / dev mode (no payment)
  upgrade: (plan: string) =>
    request<{ message: string; plan: string }>("/api/billing/upgrade", {
      method: "POST",
      body: JSON.stringify({ plan }),
    }),
};
