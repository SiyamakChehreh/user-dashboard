export interface User {
  id: number;
  name: string;
  email: string;
  company?: string | Company;
  local?: boolean;
}

export interface Company {
  name: string;
}
