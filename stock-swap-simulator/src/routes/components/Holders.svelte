<script>
  import { userBalances } from "../../stores/userBalances.ts";
  import { formatNumberToPriceString } from "../../utils/stringFormatter.ts";
</script>

<div
  class="flex flex-col gap-y-1 w-full px-4 py-2 rounded-lg shadow-lg bg-gray-100 border"
>
  <h2 class="text-xl border-b font-semibold">MDS Holders</h2>
  {#each $userBalances as holder}
    <p class="mt-1">
      {#if holder.id === "1"}
        <span class="font-light"> You (Holder #1)</span>
      {:else}
        <span class="font-light"> Holder #{holder.id}</span>
      {/if}
      :
      <span class="tracking-wider ml-2">
        {formatNumberToPriceString(
          holder.balances.find((x) => x.id === "MDS")?.value ?? 0
        )}
      </span>

      <span class="text-sm font-light"> RSD </span>
    </p>
  {/each}
</div>
