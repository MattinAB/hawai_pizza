import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/src/app/lib/Subabase";
import { Session } from "@supabase/supabase-js";

type AuthContextType = {
  sessions: Session | null;
  profile: null;
  loading: boolean;
  isAdmin: boolean;
  setProfile: (profile: any) => void;
  fetchSession: () => void;
};

const AuthContext = createContext<AuthContextType>({
  sessions: null,
  profile: null,
  loading: true,
  isAdmin: false,
  setProfile: () => {},
  fetchSession: async () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [sessions, setSessions] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("profile", profile);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSessions(session);

    if (session) {
      // fetch profile

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (data.group === "ADMIN") {
        setIsAdmin(true);
        setProfile(data);
      } else {
        setIsAdmin(false);
        setProfile(data);
      }
    }

    setLoading(false);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSessions(session);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        fetchSession,
        isAdmin,
        sessions,
        loading,
        profile,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
