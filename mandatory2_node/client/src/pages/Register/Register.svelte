<script>
    import { navigate } from 'svelte-routing';
    import { fetchPost } from '../../util/fetchUtil.js';
    import { toast } from 'svelte-sonner';

    let name = '';
    let email = '';
    let password = '';

    let confirmPassword = '';
    let showPassword = false;

    let emailTouched = false;
    let emailValid = false;

    function validateEmail() {
        emailTouched = true;
        emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    async function handleRegister() {

        try {
        const result = await fetchPost('/api/auth/register', {
            name,
            email,
            password,
            confirmPassword
        });

        toast.success(result.data.successMessage);
        navigate('/login');

        } catch (error) {
            toast.error(error.data.errorMessage);
        }
    }
</script>

<main class="page">
    <section class="card">
        <h1>Sign Up</h1>
        <form on:submit|preventDefault={handleRegister}>
            <div class="input-floating">
                <input type="text" id="name" bind:value={name} />
                <label for="name">Name</label>
            </div>

            <div class="input-floating">
                <input type="email" id="email" bind:value={email} on:blur={validateEmail} class:invalid={emailTouched && !emailValid} />
                <label for="email">Email</label>
                {#if emailTouched && !emailValid}
                    <p class="error-text">Please enter a valid email</p>
                {/if}
            </div>

            <div class="input-floating">
                <input type={showPassword ? 'text' : 'password'} id="password" bind:value={password} />
                <label for="password">Password</label>
            </div>

            <div class="input-floating">
                <input type={showPassword ? 'text' : 'password'} id="confirmPassword" bind:value={confirmPassword} />
                <label for="confirmPassword">Confirm password</label>
            </div>

            <button type="submit" class="submit">Sign up</button>
        </form>

        <p class="login-link">Already have an account? <a href="/login">Log in</a></p>
    </section>
</main>