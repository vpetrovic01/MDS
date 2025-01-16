// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface UserBalance {
    id: string;
    balances: Array<Balance>;
  }
  interface Balance {
    id: string;
    value: number;
  }

  interface Rates {
    id: string;
    rate: number;
  }
}

export {};
