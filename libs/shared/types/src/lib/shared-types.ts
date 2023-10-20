export interface ClientInterface {
  id: number | string;
  name: string;
  phone: string;
  email: string;
}

export interface ProjectInterface {
  id: number | string;
  clientId?: number | string;
  name: string;
  description: string;
  status: string;
  client?: ClientInterface;
}
