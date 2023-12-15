<script lang="ts" setup>
    const props = defineProps<{
        type: string,
    }>();

    const signImageUrl = (name: string) => {
        return new URL(`../../assets/icons/${name}.svg`, import.meta.url).href
    }
</script>

<template>
    <a
        class="tool"
        :id="'tool-' + props.type"
        href="#"
    >
        <img :src="signImageUrl(props.type + '-solid')">
    </a>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/helpers.scss';
@import '../../assets/styles/variables.scss';
.tool {
    display: block;
    height: rem(30);
    width: rem(30);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: $transition;

    img {
        height: 1rem;
    }

    &:hover {
        background-color: $primary;
    }
}
</style>