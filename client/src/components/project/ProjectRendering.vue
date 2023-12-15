<script lang="ts" setup>
    const props = defineProps<{
        title: string,
        content: string,
    }>();

    const markupToCode = (text: string) => {
        if(text) {
            const newText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/__(.*?)__/g, '<u>$1</u>')
                .replace(/~~(.*?)~~/g, '<s>$1</s>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/^(?!$)(.*)/gm, '<p>$1</p>')
                .replace(/¨(.*?)¨/g, '<blockquote>$1</blockquote>')
                .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$1" alt="$2">')

            return newText;
        } else {
            return '<p class="is-empty">Projektbeskrivning...</p>';
        }
    }
</script>

<template>
    <section class="project-rendering">
        <h1
            class="project-rendering__title"
            :class="{ 'is-empty': !props.title }"
        >
            {{ props.title ? props.title : 'Projektnamn' }}
        </h1>
        <div
            class="project-rendering__content"
            :innerHTML="markupToCode(props.content)"
        ></div>
    </section>
</template>

<style lang="scss" scoped>
.project-rendering {
    width: 50%;
    padding-left: 2rem;

    &__title {
        margin-bottom: 1rem;
    }

    &__content {
        white-space: pre-wrap;
    }
}
</style>