"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { MarketUser } from "@/data/marketplace";

export type CartEntry = {
  id: string;
  name: string;
  quantity: number;
  image: string;
  price: number | null;
  seller: string;
};
export type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  price_cents: number;
  stock: number;
  image_path?: string;
  image_url: string;
  status: string;
  seller_id?: string;
  created_at: string;
  marketplace_sellers?: { name: string };
};

export async function marketRequest(
  path: string,
  body?: unknown,
  method = "POST",
) {
  const response = await fetch(`/api/marketplace/${path}`, {
    method: body === undefined ? "GET" : method,
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response
    .json()
    .catch(() => ({ error: "Não foi possível conectar ao serviço." }));
  if (!response.ok)
    throw new Error(
      data.error || "Não foi possível concluir. Tente novamente.",
    );
  return data;
}

const Context = createContext<{
  user: MarketUser | null;
  loading: boolean;
  authError: string;
  refreshUser: () => Promise<void>;
  setUser: (user: MarketUser | null) => void;
  cart: CartEntry[];
  ready: boolean;
  add: (item: Omit<CartEntry, "quantity">) => void;
  quantity: (id: string, value: number) => void;
  clear: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  notice: string;
  logout: () => Promise<void>;
} | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MarketUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const refreshUser = useCallback(async () => {
    try {
      const data = await marketRequest("auth");
      setUser(data.user);
      setAuthError("");
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Não foi possível verificar a sessão.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("ct-market-cart") || "[]",
      );
      if (Array.isArray(saved))
        setCart(
          saved
            .filter(
              (row) =>
                row &&
                typeof row.id === "string" &&
                typeof row.name === "string" &&
                typeof row.image === "string" &&
                typeof row.seller === "string" &&
                Number.isInteger(row.quantity) &&
                row.quantity > 0 &&
                row.quantity <= 999 &&
                (row.price === null ||
                  (Number.isInteger(row.price) && row.price >= 0)),
            )
            .slice(0, 50),
        );
      const liked: unknown = JSON.parse(
        localStorage.getItem("ct-market-favorites") || "[]",
      );
      if (Array.isArray(liked))
        setFavorites(
          liked.filter((id) => typeof id === "string").slice(0, 100),
        );
    } catch {
      /* Storage is optional. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("ct-market-cart", JSON.stringify(cart));
      localStorage.setItem("ct-market-favorites", JSON.stringify(favorites));
    } catch {
      /* Keep using memory. */
    }
  }, [cart, favorites, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  const add = (item: Omit<CartEntry, "quantity">) => {
    setCart((current) =>
      current.some((row) => row.id === item.id)
        ? current.map((row) =>
            row.id === item.id
              ? { ...row, quantity: Math.min(999, row.quantity + 1) }
              : row,
          )
        : current.length < 50
          ? [...current, { ...item, quantity: 1 }]
          : current,
    );
    setNotice(`${item.name} adicionado ao carrinho.`);
  };
  const logout = async () => {
    await marketRequest("auth", { action: "logout" });
    setUser(null);
  };
  return (
    <Context.Provider
      value={{
        user,
        loading,
        authError,
        refreshUser,
        setUser,
        cart,
        ready,
        add,
        quantity: (id, value) =>
          setCart((current) =>
            current
              .map((row) =>
                row.id === id
                  ? { ...row, quantity: Math.max(0, Math.min(999, value)) }
                  : row,
              )
              .filter((row) => row.quantity > 0),
          ),
        clear: () => setCart([]),
        favorites,
        toggleFavorite: (id) =>
          setFavorites((current) =>
            current.includes(id)
              ? current.filter((item) => item !== id)
              : [...current, id],
          ),
        notice,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useMarket() {
  const context = useContext(Context);
  if (!context) throw new Error("MarketProvider is required");
  return context;
}

export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
