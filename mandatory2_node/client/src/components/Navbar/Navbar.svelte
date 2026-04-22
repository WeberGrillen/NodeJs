<script>
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
    <nav class="navbar">
    <Link to="/" class="navbar-brand">MyApp</Link>
    {#if $user}
        <button on:click={logout}>Logout</button>
    {:else}
        <Link to="/login" class="btn">Login</Link>
        <Link to="/register" class="btn btn-filled">Register</Link>
    {/if}
</nav>
</Router> 