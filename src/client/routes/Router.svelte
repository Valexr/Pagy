<script>
    import { Route, router, meta } from "tinro";
    import { routes, Lazy, Transition, cpath, cmeta, chistory } from "@routes";
</script>

<Transition>
    <Route>
        {#each routes.filter((route) => route.menu) as route}
            <Route path={route.match} let:meta>
                <Lazy component={route.component} />
            </Route>
        {/each}
        <Route fallback let:meta>
            <Lazy component={routes[routes.length - 1].component} />
        </Route>
    </Route>
</Transition>

<style lang="scss"></style>
