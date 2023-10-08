export interface ClientInterface {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface ProjectInterface {
  id: number;
  clientId: number;
  name: string;
  description: string;
  status: string;
  client: ClientInterface;
}
