<script lang="ts">
  import Balances from "./Balances.svelte";
  import Holders from "./Holders.svelte";
  import SwapForm from "./SwapForm.svelte";
</script>

<div class="w-full flex flex-col px-4 lg:px-12">
  <!-- TODO -->
  <!-- Title -->
  <!-- Description -->

  <SwapForm />
  <div class="w-full flex flex-col gap-y-4 gap-x-4 lg:flex-row">
    <Balances />
    <Holders />
  </div>
</div>
