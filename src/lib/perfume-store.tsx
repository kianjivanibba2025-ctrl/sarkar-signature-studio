import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EMPTY_CREATION, type Creation, type NoteLayer } from "./perfume-data";

const STORAGE_KEY = "sarkar:creation:v1";
const CART_KEY = "sarkar:cart:v1";
const SAVED_KEY = "sarkar:saved:v1";

interface StoreValue {
  creation: Creation;
  hydrated: boolean;
  step: number;
  setStep: (s: number) => void;
  update: (patch: Partial<Creation>) => void;
  toggleNote: (layer: NoteLayer, note: string) => void;
  reset: () => void;
  cart: number;
  addToCart: () => void;
  saved: Creation[];
  saveCreation: () => void;
}

const PerfumeContext = createContext<StoreValue | null>(null);

export function PerfumeProvider({ children }: { children: ReactNode }) {
  const [creation, setCreation] = useState<Creation>(EMPTY_CREATION);
  const [saved, setSaved] = useState<Creation[]>([]);
  const [cart, setCart] = useState(0);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCreation({ ...EMPTY_CREATION, ...JSON.parse(raw) });
      const cartRaw = localStorage.getItem(CART_KEY);
      if (cartRaw) setCart(Number(cartRaw) || 0);
      const savedRaw = localStorage.getItem(SAVED_KEY);
      if (savedRaw) setSaved(JSON.parse(savedRaw));
    } catch {
      /* storage unavailable — start fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(creation));
    } catch {
      /* ignore */
    }
  }, [creation, hydrated]);

  const update = useCallback((patch: Partial<Creation>) => {
    setCreation((c) => ({ ...c, ...patch }));
  }, []);

  const toggleNote = useCallback((layer: NoteLayer, note: string) => {
    setCreation((c) => {
      const list = c[layer];
      return {
        ...c,
        [layer]: list.includes(note) ? list.filter((n) => n !== note) : [...list, note],
      };
    });
  }, []);

  const reset = useCallback(() => {
    setCreation(EMPTY_CREATION);
    setStep(0);
  }, []);

  const addToCart = useCallback(() => {
    setCart((n) => {
      const next = n + 1;
      try {
        localStorage.setItem(CART_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const saveCreation = useCallback(() => {
    setSaved((list) => {
      const next = [creation, ...list].slice(0, 12);
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [creation]);

  const value = useMemo(
    () => ({
      creation,
      hydrated,
      step,
      setStep,
      update,
      toggleNote,
      reset,
      cart,
      addToCart,
      saved,
      saveCreation,
    }),
    [creation, hydrated, step, update, toggleNote, reset, cart, addToCart, saved, saveCreation],
  );

  return <PerfumeContext.Provider value={value}>{children}</PerfumeContext.Provider>;
}

export function usePerfume() {
  const ctx = useContext(PerfumeContext);
  if (!ctx) throw new Error("usePerfume must be used inside PerfumeProvider");
  return ctx;
}
