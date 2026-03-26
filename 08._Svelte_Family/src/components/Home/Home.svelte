<script>
    import { fridgeMessages } from '../../stores/fridgeStore.js'

</script>

{#each $fridgeMessages as fridgeMessage}
    <p>{fridgeMessage.name || "Household"}: {fridgeMessage}</p>
{/each}

<slot></slot>

<div id="welcome-mat">
    <p>Go Away!</p>
</div>

<style>
    #welcome-mat {
        font-weight: bold;
        color: azure;
        background-color: brown;
        padding: 2em;
        margin: 0 20em 0 20em;
        border-radius: 0 0 2em 2em;
    }
</style>