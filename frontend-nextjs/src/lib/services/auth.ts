/**
 * services/auth.ts — Storefront customer auth, client-side.
 *
 * Talks to the browser-facing CI4 endpoints (/api/v1/auth/*), stores the
 * returned bearer token + customer in localStorage, and notifies the rest of
 * the app via a `rc-auth-changed` window event so the navbar/pages react.
 *
 * The token is replayed as `Authorization: Bearer <token>` on protected calls
 * (orders, checkout verify).
 */

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AuthState {
  token: string;
  customer: Customer;
}

const KEY = "rc_auth_v1";
export const AUTH_EVENT = "rc-auth-changed";

function read(): AuthState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
}

function write(state: AuthState | null): void {
  if (typeof window === "undefined") return;
  if (state) {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } else {
    window.localStorage.removeItem(KEY);
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getToken(): string | null {
  return read()?.token ?? null;
}

export function getCustomer(): Customer | null {
  return read()?.customer ?? null;
}

export function isAuthenticated(): boolean {
  return !!read()?.token;
}

export function logout(): void {
  write(null);
}

/** Bearer header helper for protected fetches (empty object if signed out). */
export function authHeader(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.message || json?.error || `Request failed (${res.status})`);
  }
  return json.data as T;
}

export async function login(phone: string, password: string): Promise<Customer> {
  const data = await post<AuthState>("/auth/login", { phone, password });
  write(data);
  return data.customer;
}

export async function register(input: {
  name: string;
  phone: string;
  email: string;
  password: string;
}): Promise<Customer> {
  const data = await post<AuthState>("/auth/register", input);
  write(data);
  return data.customer;
}

/** Exchange a Google ID token (credential) for a session. */
export async function googleLogin(credential: string): Promise<Customer> {
  const data = await post<AuthState>("/auth/google", { credential });
  write(data);
  return data.customer;
}
