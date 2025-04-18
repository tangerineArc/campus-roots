export async function checkAuthStatus() {
  const res = await fetch(
    `${import.meta.env.VITE_API_SERVER_URL}/auth/status`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}
