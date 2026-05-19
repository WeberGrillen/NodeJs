<script>
  import { onMount } from "svelte";
  import { nickname } from "./stores/nicknameStore.js";

  import Register from "./components/Register/Register.svelte";
  import Colors from "./components/Colors/Colors.svelte";

  // onMount(() => {
  //   const localStorageNickname = localStorage.getItem('nickname')
  //   if (localStorageNickname) {
  //     nickname.set(localStorageNickname)
  //   }
  // });
</script>

{#if !$nickname}
  <Register />
{:else}
  <Colors />
{/if}
