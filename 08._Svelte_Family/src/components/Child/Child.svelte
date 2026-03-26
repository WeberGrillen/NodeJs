<script>
    let { name, familySheep, isGirl, onEatCookie, drinkPantry = $bindable() } = $props();

    import { fridgeMessages } from "../../stores/fridgeStore.js";

    let fridgeMessageInput = $state("");

    function handleSubmitFridgeMessage() {
        const fridgeMessageToCreate = {
            name,
            message: fridgeMessageInput
        };
        $fridgeMessages.push(fridgeMessageToCreate);
        fridgeMessages.set($fridgeMessages);
        fridgeMessageInput = "";
    }

</script>

<input value={fridgeMessageInput} placeholder="type your fridge message...">
<button onclick={handleSubmitFridgeMessage}>Write your fridge message</button>

<div
    class={familySheep || "not-a-sheep"}
    class:is-girl={isGirl}
    class:is-boy={!isGirl}
>
    <h3>I'm just a child known as {name}</h3>

    
</div>


<button onclick={onEatCookie}>Grab a cookie from the cookieJar</button>

<button onclick={() => drinkPantry.pop()}>Grab a drink from the drinkPantry</button>


<style>
    div {
        color: white;
    }
    
    .black-sheep {
        background-color: rebeccapurple;
    }

    .grey-sheep {
        background-color: yellowgreen;
    }

    .not-a-sheep {
        background-color: plum;
    }

    .is-girl {
        border: 4px dashed palegoldenrod;
    }

    .is-boy {
        border: 4px solid slateblue;
    }
</style>