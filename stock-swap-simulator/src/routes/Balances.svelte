<script lang="ts">
  import { userBalances } from "../stores/userBalances.ts";
  import { formatNumberToPriceString } from "../utils/stringFormatter.ts";
</script>

<div
  class="flex flex-col gap-y-1 w-full px-4 py-2 rounded-lg shadow-lg bg-gray-100 border"
>
  <h2 class="text-xl border-b font-semibold">Your balances</h2>

  {#each $userBalances[0].balances as balance}
    <p class="mt-1">
      {balance.id}: {formatNumberToPriceString(balance.value) ?? 0}
    </p>
  {/each}
</div>
