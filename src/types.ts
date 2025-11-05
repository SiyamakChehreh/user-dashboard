export interface User {
  id: number;
  name: string;
  email: string;
  company?: string;
  local?: boolean;
}

export interface Company {
  name: string;
}
