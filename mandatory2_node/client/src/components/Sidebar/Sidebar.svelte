<script>
    import homeIcon from '../../assets/home.svg?raw';
    import DiscoverIcon from '../../assets/compass.svg?raw';
    import savedIcon from '../../assets/bookmark.svg?raw';
    import profileIcon from '../../assets/user.svg?raw';
    import plusIcon from '../../assets/plus.svg?raw';

    import { Router, Link, navigate, link } from "svelte-routing";
    import { toast } from "svelte-sonner";
    import { fetchPost } from "../../util/fetchUtil";
    import { user } from "../../stores/userStore";


    async function logout() {

        try {
            const result = await fetchPost('/api/auth/logout');
            user.set(null);
            toast.success(result.data.successMessage);
            navigate('/');

        } catch (error) {
            toast.error(error.data.errorMessage);
        }
    };
</script>

<Router>
    <nav class="sidebar">
    <Link to="/" class="sidebar-brand">Foodie</Link>
    {#if $user}
        
        <button class="sidebar-btn" on:click={logout}>Logout</button>
    {:else}
        <button class="sidebar-btn" on:click={home}>
            {@html homeIcon}
            Home
        </button>

        <button class="sidebar-btn" on:click={discover}>
            {@html DiscoverIcon}
            Discover
        </button>

        <button class="sidebar-btn" on:click={saved}>
            {@html savedIcon}
            Saved
        </button>

        <button class="sidebar-btn" on:click={Profile}>
            {@html profileIcon}
            Profile
        </button>

        <button class="sidebar-create-btn">
            {@html plusIcon}
            New Recipe
        </button>
        <!-- <Link to="/login" class="btn">Login</Link>
        <Link to="/register" class="btn btn-filled">Register</Link> -->
    {/if}
</nav>
</Router> 