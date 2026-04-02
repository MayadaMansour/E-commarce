import { Address } from "./Address ";

export interface AddressResponse {
  status: string;
  message: string;
  data: Address[];
}