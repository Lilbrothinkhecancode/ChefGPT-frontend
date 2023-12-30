<script>
  import "../app.css";
  import Header from '../components/Header.svelte';
  import Footer from "../components/Footer.svelte";
  import Main from "../components/Main.svelte";



</script>

<div class="flex flex-col h-screen">
  <Header />
  <Main />
  <slot />
  <Footer />
</div>
