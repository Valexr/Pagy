<script>
    import { Route, router } from "tinro";
    import { Lazy, Transition } from "@routes";
    import { routes } from "@routes";
    $: path =
        routes.find((route) => route.match.includes($router.path)) ||
        routes[routes.length - 1];
    $: console.log($router.path, path.match, path);
</script>

<main class="container">
    <Transition>
        <Route>
            <Route path={path.match}>
                <Lazy component={path.component} />
            </Route>
            <Route fallback>
                <Lazy component={path.component} />
            </Route>
        </Route>
    </Transition>
</main>
