const API = import.meta.env.VITE_API_URL as string;

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, options);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? "Request failed");

  return data as T;
}