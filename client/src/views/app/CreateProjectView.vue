<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useAuth0 } from '@auth0/auth0-vue';
    import ProjectWysiwyg from '@/components/project/ProjectWysiwyg.vue';
    import ProjectRendering from '@/components/project/ProjectRendering.vue';

    const title = ref('');
    const content = ref('');

    const handleTitle = (input: string) => {
        title.value = input;
    }

    const handleContent = (input: string) => {
        content.value = input;
    }
</script>

<template>
    <main class="upload">
        <ProjectWysiwyg
            @title="(title) => handleTitle(title)"
            @content="(content) => handleContent(content)"
        />

        <ProjectRendering
            :title="title"
            :content="content"
        />

        <a
            href="#"
            class="button button--solid button--prominent"
        >
            <img src="../../assets/icons/floppy-disk-solid.svg" alt="">
            Spara projekt
        </a>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/helpers.scss';
@import '../../assets/styles/variables.scss';

.upload {
    display: flex;
    margin: 0 1rem;
    position: relative;
    height: 100%;

    .button {
        position: absolute;
        bottom: 1rem;
        right: 0;
    }
}
</style>