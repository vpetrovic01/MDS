<script lang="ts">
  import Balances from "./components/Balances.svelte";
  import Holders from "./components/Holders.svelte";
  import SwapForm from "./components/SwapForm.svelte";
</script>

<div
  class="w-full max-w-5xl mx-auto px-4 lg:px-12 py-8 border-4 shadow-lg bg-white rounded-lg text-base sm:text-sm md:text-base lg:text-lg"
>
  <h1 class="text-3xl font-bold">
    Stock Swap Simulator with MDS Fee Distribution
  </h1>
  <SwapForm />
  <div class="w-full flex flex-col gap-y-4 gap-x-4 lg:flex-row">
    <Balances />
    <Holders />
  </div>
</div>
