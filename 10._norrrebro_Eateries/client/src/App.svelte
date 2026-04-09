<script>
    import { Router, Link, Route } from 'svelte-routing';
    import Visitors from './pages/Visitors/Visitors.svelte';
    import Restaurants from './pages/Restaurants/Restaurants.svelte';

</script>

<Router>
    <nav>
        <Link to='/restaurants'>Restaurants</Link>
        <Link to='/visitors'>Visitors</Link>
        <Link to='/about'>About</Link>
    </nav>

    <div>
        <Route path='/restaurants'><Restaurants /></Route>
        <Route path='/visitors'><Visitors /></Route>
        <Route path='/about'>
            <h1>About</h1>
            <h3>We made this because we are hungry!</h3>
        </Route>
    </div>
</Router>
