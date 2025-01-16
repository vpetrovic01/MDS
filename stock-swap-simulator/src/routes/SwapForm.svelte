<script lang="ts">
  import {
    userBalances,
    decreaseBalance,
    multiplyBalance,
    updateHoldersMDS,
    calculateRate,
  } from "../stores/userBalances.js";

  let currentBalances: Array<UserBalance>;
  let fromCurrency = "AAPL";
  let toCurrency = "TSLA";
  let amount = 0;
  let isDisabled = false;

  $: userBalances.subscribe((x) => {
    currentBalances = x;
  });

  function handleSwap() {
    // poziv samo jedne funkcije sa svim vrednostsima

    decreaseBalance(fromCurrency, amount);
    // calc rate
    let rate = calculateRate(fromCurrency, toCurrency);
    multiplyBalance(toCurrency, amount, rate);
    updateHoldersMDS(fromCurrency, amount, rate);
  }
</script>

<div>
  <h2>Perform a Swap</h2>

  <label>
    From (Symbol):
    <select bind:value={fromCurrency}>
      <option value="AAPL">AAPL</option>
      <option value="TSLA">TSLA</option>
      <option value="AMZN">AMZN</option>
      <option value="MDS">MDS</option>
    </select>
  </label>
  <label>
    To (Symbol):
    <select bind:value={toCurrency}>
      <option value="AAPL">AAPL</option>
      <option value="TSLA">TSLA</option>
      <option value="AMZN">AMZN</option>
      <option value="MDS">MDS</option>
    </select>
  </label>

  <label>
    Amount to Swap (units of 'From' symbol):
    <input type="number" bind:value={amount} />
  </label>
  <button
    disabled={isDisabled}
    on:click={handleSwap}
    class="px-4 py-2 bg-blue-400 rounded text-white font-semibold shadow-md hover:shadow-xl hover:bg-blue-600"
    >Swap</button
  >
</div>
