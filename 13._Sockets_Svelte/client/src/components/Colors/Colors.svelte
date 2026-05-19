<script>
    import { onMount } from 'svelte';
    import { BASE_URL } from '../../stores/generalStore.js';
    import { colorsList } from '../../stores/colorsList.js';
    import io from 'socket.io-client';

    let socket;

    let colorInput = "#0000ff";

    onMount(() => {
        socket = io($BASE_URL, {
            withCredentials: true
            // Husk at fix i server også
        });

        socket.on("server-sends-color", (data => {
            // Don't do this. This is DOM manipulation. Do it the Svelte way.
            document.body.style.backgroundColor = data.data;
            
            colorsList.update((colorsList) => {
                colorsList.push({
                    nickname: data.nickname,
                    color: data.data
                });
                return colorsList;
            })
        }));        

    });


    function submitColor() {
        socket.emit("client-sends-color", { data: colorInput });
    }
</script>

<!-- <svelte:body style:background-color={"#ff0000"}/> -->
<input type="color" bind:value={colorInput}>
<button onclick={submitColor}>Submit Color</button>

{#each $colorsList as colorsListItem}
    <div>{colorsListItem.nickname}: {colorsListItem.color}</div>
{/each}
