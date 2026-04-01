import type { AuthProvider } from "@refinedev/core";
import { User, SignUpPayload, UserRole } from "@/types";
import { authClient } from "@/lib/auth-client";

const USER_STORAGE_KEY = "user";

const getStoredUser = (): User | null => {
  const rawUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

const getSessionUser = async (): Promise<User | null> => {
  try {
    const { data, error } = await authClient.getSession();
    if (error || !data?.user) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }

    const storedUser = getStoredUser();
    const sessionUser = data.user as {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      imageCldPubId?: string | null;
      role?: User["role"];
    };

    const resolvedUser: User = {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      image: sessionUser.image ?? undefined,
      imageCldPubId: sessionUser.imageCldPubId ?? undefined,
      role: sessionUser.role ?? storedUser?.role ?? UserRole.STUDENT,
      createdAt: storedUser?.createdAt ?? "",
      updatedAt: storedUser?.updatedAt ?? "",
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(resolvedUser));
    return resolvedUser;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const authProvider: AuthProvider = {
  register: async ({
    email,
    password,
    name,
    role,
    image,
    imageCldPubId,
  }: SignUpPayload) => {
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        role,
        imageCldPubId,
      } as SignUpPayload);

      if (error) {
        return {
          success: false,
          error: {
            name: "Registration failed",
            message:
              error?.message || "Unable to create account. Please try again.",
          },
        };
      }

      // Store user data
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

      return {
        success: true,
        redirectTo: "/app",
      };
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        error: {
          name: "Registration failed",
          message: "Unable to create account. Please try again.",
        },
      };
    }
  },
  login: async ({ email, password }) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Login error from auth client:", error);
        return {
          success: false,
          error: {
            name: "Login failed",
            message: error?.message || "Please try again later.",
          },
        };
      }

      // Store user data
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

      return {
        success: true,
        redirectTo: "/app",
      };
    } catch (error) {
      console.error("Login exception:", error);
      return {
        success: false,
        error: {
          name: "Login failed",
          message: "Please try again later.",
        },
      };
    }
  },
  logout: async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: {
          name: "Logout failed",
          message: "Unable to log out. Please try again.",
        },
      };
    }

    localStorage.removeItem(USER_STORAGE_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const user = await getSessionUser();

    if (user) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        name: "Unauthorized",
        message: "Check failed",
      },
    };
  },
  getPermissions: async () => {
    const parsedUser = (await getSessionUser()) ?? getStoredUser();
    if (!parsedUser) return null;

    return {
      role: parsedUser.role,
    };
  },
  getIdentity: async () => {
    const parsedUser = (await getSessionUser()) ?? getStoredUser();
    if (!parsedUser) return null;

    return {
      id: parsedUser.id,
      name: parsedUser.name,
      email: parsedUser.email,
      image: parsedUser.image,
      role: parsedUser.role,
      imageCldPubId: parsedUser.imageCldPubId,
    };
  },
};
