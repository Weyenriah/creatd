<script lang="ts" setup>
    import { useAuth0 } from '@auth0/auth0-vue';

    const { isAuthenticated, isLoading } = useAuth0();
</script>

<template>
    <article class="navigation-drawer">
        <nav class="navigation-drawer__nav">
            <div class="navigation-drawer__link-group">
                <router-link to="/app" class="link link--bigger">
                    Alla projekt
                </router-link>

                <router-link
                    v-if="isAuthenticated"
                    to="/my-projects"
                    class="link link--bigger"
                >
                    Mina projekt
                </router-link>
            </div>

            <div>
                <router-link
                    v-if="isAuthenticated"
                    to="/upload"
                    class="button button--bigger button--solid navigation__add-project"
                >
                    <img src="@/assets/icons/plus-solid.svg" alt=" " />
                    <span>
                        Ladda upp <span>projekt</span>
                    </span>
                </router-link>
            </div>
        </nav>

        <article class="navigation-drawer__tools">
            <h2>Verktyg</h2>

            <section class="navigation-drawer__tools-container">
            </section>
        </article>

        <div class="navigation-drawer__ads">
        </div>
    </article>
</template>

<style lang="scss" scoped>
    @import "@/assets/styles/variables.scss";
    @import "@/assets/styles/helpers.scss";
    .navigation-drawer {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: $white;
        display: grid;
        grid-template-rows: auto auto auto;
        grid-template-columns: 100%;
        gap: 3%;
        padding: 4rem 2rem 2rem 2rem;

        &__nav {
            grid-column: 1;
            grid-row: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: .5rem;
        }

        &__tools {
            grid-column: 1;
            grid-row: 2;

            h2 {
                margin: 0 0 .5rem 0;
                font-size: rem(16);
                text-transform: uppercase;
            }

            &-container {
                display: flex;
                flex-direction: column;
                gap: .5rem;
                height: calc(100% - 26.5px);
                width: 100%;
            }
        }

        &__ads {
            grid-column: 1;
            grid-row: 3;
            background-color: blue;
        }

        &__link-group {
            display: flex;
            flex-direction: column;
            gap: .5rem;
        }

        @include medium-up {
            grid-template-rows: 60% 40%;
            grid-template-columns: 40% 60%;
            padding: 4rem 5rem 4rem 4rem;

            &__nav {
                grid-column: 1;
                grid-row: 1 / span 2;
            }

            &__tools {
                grid-column: 2;
                grid-row: 1;
            }

            &__ads {
                grid-column: 2;
                grid-row: 2;
            }
        }
    }
</style>