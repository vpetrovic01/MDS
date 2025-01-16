import { writable, type Writable } from "svelte/store";
import { userBalancesInit } from "../constants/userBalancesInit.ts";
import { RATES } from "../constants/rates.ts";

export const userBalances: Writable<Array<UserBalance>> =
  writable(userBalancesInit);

export const decreaseBalance = (currency: string, amount: number): void => {
  userBalances.update((currentUsersBalances) => {
    const balanceToUpdate = currentUsersBalances[0].balances.find(
      (balance) => balance.id === currency
    );
    if (balanceToUpdate) {
      balanceToUpdate.value -= amount;
    }

    return [...currentUsersBalances];
  });
};

export const calculateRate = (
  fromCurrency: string,
  toCurrency: string
): number => {
  let fromRate = RATES.find((rate) => rate.id === fromCurrency)?.rate;
  let toRate = RATES.find((rate) => rate.id === toCurrency)?.rate;
  if (!fromRate || !toRate) {
    throw new Error("Invalid currency provided");
  }
  return fromRate! / toRate!;
};

export const multiplyBalance = (
  currency: string,
  amount: number,
  rate: number
): void => {
  userBalances.update((currentUsersBalances) => {
    const balanceToUpdate = currentUsersBalances[0].balances.find(
      (balance) => balance.id === currency
    );
    if (balanceToUpdate) {
      balanceToUpdate.value += rate * amount;
    }
    return [...currentUsersBalances];
  });
};

export const updateHoldersMDS = (
  currency: string,
  amount: number,
  rateToMDS: number
): void => {
  let mds = amount * rateToMDS;
  let provision = mds * 0.0001;
  let distributionMDS = provision * 100;
  // mds * 0.01 (0.0001/*100)
  let distributionMDSPerHolder = distributionMDS / 5;
  userBalances.update((holders) => {
    holders.forEach((holder) => {
      let mdsCurrency;
      if (
        (mdsCurrency = holder.balances.find(
          (currency) => currency.id === "MDS"
        ))
      ) {
        mdsCurrency.value += distributionMDSPerHolder;
      }
    });
    return [...holders];
  });
};
