import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { DEMO_EVENT, DEMO_MODE, DEMO_STORAGE_KEY } from "@/lib/demo";

function readDemoSession(): boolean {
  if (!DEMO_MODE || typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_STORAGE_KEY) === "1";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [demo, setDemo] = useState(false);

  // Firebase session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Demo session (only when the flag is on)
  useEffect(() => {
    if (!DEMO_MODE) return;
    setDemo(readDemoSession());
    const sync = () => setDemo(readDemoSession());
    window.addEventListener(DEMO_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(DEMO_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const startDemo = useCallback(() => {
    if (!DEMO_MODE) return;
    window.localStorage.setItem(DEMO_STORAGE_KEY, "1");
    window.dispatchEvent(new Event(DEMO_EVENT));
  }, []);

  const exitDemo = useCallback(() => {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
    window.dispatchEvent(new Event(DEMO_EVENT));
  }, []);

  return {
    user,
    demo,
    demoMode: DEMO_MODE,
    startDemo,
    exitDemo,
    // `session` stays truthy so components that gate on !!session keep working.
    session: user ? { user } : demo ? { user: null, demo: true as const } : null,
    ready,
  };
}
