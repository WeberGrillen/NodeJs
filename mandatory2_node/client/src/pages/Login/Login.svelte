<script>
    import { navigate } from 'svelte-routing';
    import { checkAuth } from '../../stores/userStore.js';
    import { fetchPost } from '../../util/fetchUtil.js';
    import { toast } from 'svelte-sonner';


    let email = '';
    let password = '';

    let emailTouched = false;
    let emailValid = false;

    function validateEmail() {
        emailTouched = true;
        emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    async function handleLogin() {

        try {
        const result = await fetchPost("/api/auth/login", {
            email,
            password
        });
        await checkAuth();
        toast.success(result.data.successMessage);
        navigate('/home');
        } catch (error) {
            toast.error(error.data.errorMessage);
        }   
    }

</script>

<main class="page">
    <section class="card">
        <h1>Log in</h1>
        <form on:submit|preventDefault={handleLogin}>
            <div class="input-floating">
                <input type="email" id="email" bind:value={email} on:blur={validateEmail} class:invalid={emailTouched && !emailValid} />
                <label for="email">Email</label>
                {#if emailTouched && !emailValid}
                    <p class="error-text">Please enter a valid email</p>
                {/if}
            </div>

            <div class="input-floating">
                <input type="Password" id="password" bind:value={password} />
                <label for="password">Password</label>
            </div>

            <div class="forgot-password">
                <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" class="submit">Log in</button>
        </form>

        <p class="login-link">Don't have an account? <a href="/register">Sign up</a></p>
    </section>
</main>
