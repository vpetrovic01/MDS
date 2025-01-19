<script lang="ts">
  import { RATES } from "../../constants/rates.ts";
  import {
    userBalances,
    performSwap,
    calculateRate,
    getProvision,
  } from "../../stores/userBalances.js";
  import { formatNumberToPriceString } from "../../utils/stringFormatter.ts";

  let currentBalances: Array<UserBalance>;
  let fromCurrency = "AAPL";
  let toCurrency = "TSLA";
  let amount = 0;
  let isDisabled = false;

  $: userBalances.subscribe((x) => {
    currentBalances = x;
  });

  $: isDisabled = amount == 0;

  function handleSwap(event: Event) {
    event.preventDefault();
    performSwap(fromCurrency, toCurrency, amount);
  }

  function restrictedInput(event: Event) {
    const target = event.target as HTMLInputElement;
    target.value = target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  }
</script>

<div>
  <p class="pt-1 pb-3 text-lg">
    Swap between AAPL, TSLA, AMZN and MDS. A 0.001% fee is charged on each swap
    (in&nbsp;USD), then converted to MDS (1&nbsp;MDS&nbsp;=&nbsp;$0.01) and
    distributed evenly among 5 total holders (including&nbsp;you).
  </p>
  <h2 class="text-2xl font-bold">Perform a Swap</h2>

  <form on:submit={handleSwap}>
    <label class="flex flex-col">
      From (Symbol):
      <select
        class="w-full border-2 border-gray-300 rounded-lg px-1 h-10"
        bind:value={fromCurrency}
      >
        {#each RATES as rate}
          {#if rate.id != toCurrency}
            <option value={rate.id}>{rate.id}</option>
          {/if}
        {/each}
      </select>
    </label>

    <label class="flex flex-col">
      To (Symbol):
      <select
        class="w-full border-2 border-gray-300 rounded-lg px-1 h-10"
        bind:value={toCurrency}
      >
        {#each RATES as rate}
          {#if rate.id != fromCurrency}
            <option value={rate.id}>{rate.id}</option>
          {/if}
        {/each}
      </select>
    </label>

    <label class="flex flex-col">
      Amount to Swap (units of 'From' symbol):
      <input
        class="w-full border-2 border-gray-300 rounded-lg px-2 h-10"
        type="text"
        inputmode="decimal"
        on:input={restrictedInput}
        bind:value={amount}
        min="0"
        step="any"
      />
    </label>

    <button
      type="submit"
      disabled={isDisabled}
      class="px-6 py-3 rounded-2xl text-white font-semibold shadow-md hover:shadow-xl mt-4 mb-2 h-12 w-24
        {isDisabled
        ? 'bg-red-600 opacity-90 cursor-not-allowed'
        : 'bg-green-500 hover:bg-green-600'} 
        transition-colors duration-300 ease-in-out"
      tabindex="0"
    >
      Swap
    </button>
  </form>

  <p class="text-green-600 font-semibold pt-1 pb-3">
    Swapped {amount}
    {fromCurrency} for {formatNumberToPriceString(
      calculateRate(fromCurrency, toCurrency) * amount
    )}
    {toCurrency}. Fee of ${getProvision(amount, fromCurrency, toCurrency)} converted
    to MDS and distributed.
  </p>
</div>
