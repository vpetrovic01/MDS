import { get, writable, type Writable } from "svelte/store";
import { USERBALANCESINIT } from "../constants/userBalancesInit.ts";
import { RATES } from "../constants/rates.ts";

export const userBalances: Writable<Array<UserBalance>> =
  writable(USERBALANCESINIT);

const decreaseBalance = (currency: string, amount: number): void => {
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

const multiplyBalance = (
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

export const getProvision = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
) => {
  let rate = calculateRate(fromCurrency, toCurrency);
  let mds = amount * rate;
  let provision = mds * 0.0001;
  return Math.ceil(provision * 100) / 100;
};

const updateHoldersMDS = (amount: number, rate: number): void => {
  let mds = amount * rate;
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

export const performSwap = (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): void => {
  decreaseBalance(fromCurrency, amount);
  let rate = calculateRate(fromCurrency, toCurrency);
  multiplyBalance(toCurrency, amount, rate);
  updateHoldersMDS(amount, rate);
};

export const getCurrencyAmount = (fromCurrency: string): number => {
  const currentUserBalances = get(userBalances);
  return (
    currentUserBalances[0]?.balances.find(
      (balance) => balance.id === fromCurrency
    )?.value || 0
  );
};
