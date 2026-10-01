const API_BASE = "/api";

type ApiError = {
  ok: false;
  error: string;
};

async function request<T extends object> (
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const data = (await response.json()) as T | ApiError;

  if (!response.ok) {
    const error =
      "error" in data ? data.error : "api_request_failed";
    throw new Error(error);
  }

  return data as T;
}

export type ApiUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  ok: true;
  user: ApiUser;
};

export type MeResponse = {
  ok: true;
  authenticated: boolean;
  user: ApiUser | null;
};

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register.php", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login.php", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function logout(): Promise<{ ok: true }> {
  return request<{ ok: true }>("/auth/logout.php", {
    method: "POST",
  });
}

export async function getMe(): Promise<MeResponse> {
  return request<MeResponse>("/auth/me.php");
}
