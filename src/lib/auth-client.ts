import { createAuthClient } from "better-auth/react";
import { BACKEND_BASE_URL, USER_ROLES } from "../constants";

const normalizedBackendBaseUrl = BACKEND_BASE_URL.endsWith("/")
  ? BACKEND_BASE_URL
  : `${BACKEND_BASE_URL}/`;

export const authClient = createAuthClient({
  baseURL: new URL("auth", normalizedBackendBaseUrl).toString(),
  user: {
    additionalFields: {
      role: {
        type: USER_ROLES,
        required: true,
        defaultValue: "student",
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});
