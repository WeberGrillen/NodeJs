<script>
    import Child from "../Child/Child.svelte";

    let { name, children,} = $props();

    import { fridgeMessages } from "../../stores/fridgeStore.js";

    function handelShowLove(name) {
        console.log(`${name} loves you`)
    }

    let cookieJar = $state(['🍪', '🍪', '🍪', '🍪'])

    let drinkPantry = $state(['🍹', '🍹', '🍹', '🍹'])


    function handleEatCookie(){
        cookieJar.pop();
    }

</script>

<button onclick={fridgeMessages.wipe}>Wipe Fridge</button>

<h1>My name is {name}.</h1>

{#each drinkPantry as drink}
    <span>{drink}</span>
{/each}

{#each cookieJar as cookie}
    <span>{cookie}</span>
{/each}
{#each children as child (child.name)}
    <Child {...child} onShowLove=(handelShowLove) onEatCookie={handleEatCookie} drinkPantry={drinkPantry}/>
{/each}