// This file is no longer used as MySQL integration has been removed.
// It can be safely deleted.

// Minimal User interface if needed by other parts of the app, though likely not.
export interface User {
  id: string | number; // Generic ID
  username: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}
