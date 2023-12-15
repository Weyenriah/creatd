<script lang="ts" setup>
    import { onMounted, ref, computed } from 'vue';
    import { useAuth0 } from '@auth0/auth0-vue';

    const { isAuthenticated, isLoading, loginWithRedirect, user, logout } = useAuth0();

    const emits = defineEmits(['toggleDrawer']);

    const isNavigationDrawerOpen = ref<boolean>(false);
    const isUserMenuOpen = ref<boolean>(false);

    /**
     * Toggles the navigation drawer, emits an event to the parent component.
     *
     * @returns {void}
     */
    const toggleNavigationDrawer = (): void => {
        emits('toggleDrawer')
        isNavigationDrawerOpen.value = !isNavigationDrawerOpen.value
    };

    /**
     * Logs the user in.
     *
     * @returns {Promise<void>}
     */
    const login = async (): Promise<void> => {
        await loginWithRedirect()
    }

    /**
     * Logs the user out.
     *
     * @returns {Promise<void>}
     */
    const logoutUser = async (): Promise<void> => {
        await logout({ logoutParams: { returnTo: window.location.origin } });
    }

    /**
     * Returns the first letter of the string.
     *
     * @param {string} string - The string to get the first letter from.
     */
    const onlyFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase()
    }

    /**
     * Closes the user menu if the user clicks outside of it.
     *
     * @param event - The event.
     */
    const ifClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest('.to-profile')) {
            isUserMenuOpen.value = false
        }
    }

    /**
     * Checks if the user has scrolled.
     *
     * @returns {void}
     */
    const scrolled = computed(() => window.scrollY > 0)

    onMounted(() => {
        document.addEventListener('click', (e) => ifClickOutside(e))
    })
</script>

<template>
    <nav class="navigation" :class="{ 'navigation--scrolled': scrolled }">
        <div class="navigation__app">
            <div
                class="navigation__hamburger"
                aria-label="Öppna hamburgemenyn"
                @click.prevent="toggleNavigationDrawer"
                :class="{
                    'navigation__hamburger--open': isNavigationDrawerOpen
                }"
            >
                <div id="top-bun"></div>
                <div id="burger"></div>
                <div id="buttom-bun"></div>
            </div>

            <div class="navigation__desktop-nav navigation__link-group">
                <router-link to="/app" class="link">
                    Alla projekt
                </router-link>

                <router-link
                    v-if="isAuthenticated"
                    to="/my-projects"
                    class="link"
                >
                    Mina projekt
                </router-link>
            </div>
        </div>

        <div v-if="isAuthenticated" class="navigation__user">
            <router-link to="/upload" class="button button--solid navigation__add-project">
                <img src="@/assets/icons/plus-solid.svg" alt=" " />
                <span>
                    Ladda upp <span>projekt</span>
                </span>
            </router-link>

            <div class="to-profile">
                <a
                    href="#"
                    class="to-profile__link"
                    aria-label="Navigera till din profil"
                    @click.prevent="isUserMenuOpen = !isUserMenuOpen"
                >
                    <img v-if="user?.picture" :src="user?.picture" />
                    <span v-else>
                        {{ onlyFirstLetter(user?.name as string) }}
                    </span>
                </a>

                <nav v-if="isUserMenuOpen" class="to-profile__navigation">
                    <router-link
                        to="/profile"
                        class="link"
                        @click.prevent="isUserMenuOpen = false"
                    >
                        Profil
                    </router-link>

                    <a
                        href="/"
                        class="button button--outline"
                        @click.prevent="logoutUser"
                    >
                        Logga ut
                    </a>
                </nav>
            </div>
        </div>

        <div v-else>
            <a
                href="#"
                class="button button--solid"
                @click.prevent="login"
            >
                Logga in
            </a>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/helpers.scss";
.navigation {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;

    &__app {
        display: flex;
        align-items: center;
        gap: 3rem;
    }

    &__user {
        display: flex;
        gap: .5rem;

        @include medium-up {
            gap: 1rem;
        }
    }

    &__hamburger {
        position: relative;
        z-index: 101;
        display: flex;
        flex-direction: column;
        gap: rem(5);

        #top-bun, #burger, #buttom-bun {
            height: rem(3);
            background-color: $secondary;
            transition: $transition;
        }

        #top-bun {
            width: 1.7rem;
        }

        #burger {
            width: 1.4rem;
        }

        #buttom-bun {
            width: 2rem;
        }

        &:hover {
            cursor: pointer;

            #top-bun, #burger, #buttom-bun {
                width: 2rem;
            }
        }

        &--open {
            #top-bun, #burger, #buttom-bun {
                width: 2rem;
            }

            #top-bun {
                transform: translateY(.5rem) rotate(45deg);
            }

            #burger {
                opacity: 0;
            }

            #buttom-bun {
                transform: translateY(-.5rem) rotate(-45deg);
            }
        }
    }

    &__link-group {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    &__desktop-nav {
        display: none;

        @include medium-up {
            display: flex;
        }
    }

    &__add-project {
        span {
            display: flex;
            gap: .2rem;

            span {
                display: none;
            }
        }

        @include medium-up {
            span span {
                display: block;
            }
        }
    }
}

.to-profile {
    position: relative;

    &__link {
        height: rem(34);
        width: rem(34);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: $secondary;
        color: $white;
        text-decoration: none;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    &::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: rem(44);
        width: rem(44);
        border-radius: 50%;
        background-color: $primary;
        transition: $transition;
        opacity: 0;
    }

    &:hover {
        &::after {
            opacity: 1;
        }
    }

    &__navigation {
        position: absolute;
        z-index: 100;
        top: calc(100% + .5rem);
        right: 0;
        min-width: rem(200);
        display: flex;
        flex-direction: column;
        gap: .5rem;
        background-color: $white;
        border-radius: $border-radius-10;
        box-shadow: $box-shadow;
        padding: 1.2rem;
    }

    .button {
        white-space: nowrap;
        width: 100% !important;
        margin-top: 1rem;
    }
}
</style>