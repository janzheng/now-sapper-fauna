
<script>
	import Nav from '../components/Nav.svelte';
	import { goto, stores } from '@sapper/app';

	const { session } = stores();
	export let segment, user;

	$: user = $session.user

</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>


Layout user: { user }


<Nav segment={segment} user={user} />

<main>
	<slot user={user}></slot>
</main>