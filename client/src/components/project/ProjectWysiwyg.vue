<script lang="ts" setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { useAuth0 } from '@auth0/auth0-vue';
    import WysiwygTool from '@/components/project/WysiwygTool.vue';

    const tools = [
        {
            name: 'bold',
            markup: '**',
        },
        {
            name: 'italic',
            markup: '*',
        },
        {
            name: 'underline',
            markup: '__',
        },
        {
            name: 'strikethrough',
            markup: '~~',
        },
        {
            name: 'quote-right',
            markup: '¨',
        },
        {
            name: 'code',
            markup: '`',
        },
        {
            name: 'image',
            markup: '![alt text](image url)',
        }
    ]

    const title = ref('');
    const content = ref('');

    const emits = defineEmits([ 'title', 'content' ]);

    /**
     * Emit title to parent component.
     *
     * @param title string
     */
    const emitTitle = (title: string) => {
        emits('title', title);
    }

    /**
     * Emit content to parent component.
     *
     * @param content string
     */
    const emitContent = (content: string) => {
        emits('content', content);
    }

    /**
     * Add markup to selected text.
     *
     * @param markup string
     */
    const addMarkup = (markup: string) => {
        // Get selected text
        const editor = document.querySelector('.project-wysiwyg__editor') as HTMLTextAreaElement;
        const selectedText = editor.value.substring(editor.selectionStart, editor.selectionEnd);

        let newText;

        if(markup === '![alt text](image url)') {
            // Add image markup to selected text
            newText = editor.value.substring(0, editor.selectionStart) + `![image url](${selectedText})` + editor.value.substring(editor.selectionEnd);
        } else {
            // Add markup to selected text
            newText = editor.value.substring(0, editor.selectionStart) + markup + selectedText + markup + editor.value.substring(editor.selectionEnd);
        }

        // Update editor
        editor.value = newText;

        // Update content
        content.value = editor.value;

        // Emit content
        emitContent(content.value);
    }
</script>

<template>
    <main class="project-wysiwyg">
        <section class="project-wysiwyg__toolbox">
            <!--<div class="project-wysiwyg__toolbox__text">
                <select>
                    <option value="paragraph">Vanlig text</option>
                    <option value="h1">Huvudrubrik</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="h5">Heading 5</option>
                    <option value="h6">Heading 6</option>
                </select>
            </div>-->

            <WysiwygTool
                v-for="(tool, i) in tools"
                :key="i"
                :type="tool.name"
                :markup="tool.markup"
                @click.prevent="addMarkup(tool.markup)"
            />
        </section>

        <input
            class="project-wysiwyg__title"
            type="text"
            placeholder="Projektnamn"
            v-model="title"
            @input="emitTitle(title)"
        />

        <textarea
            class="project-wysiwyg__editor"
            cols="30"
            rows="10"
            placeholder="Skriv om ditt projekt här..."
            v-model="content"
            @input="emitContent(content)"
        ></textarea>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/helpers.scss';
@import '../../assets/styles/variables.scss';

.project-wysiwyg {
    width: 50%;
    border-right: 1px solid lightgrey;
    padding-right: 2rem;

    &__toolbox {
        display: flex;
        gap: .4rem;
        margin-bottom: 1rem;

        &__text {
            padding-right: 1rem;
            border-right: 1px solid lightgrey;

            select {
                height: 100%;
                border: none;
                outline: none;

                &::after {
                    color: red;
                }
            }
        }
    }

    &__title {
        width: 100%;
        margin-bottom: 1rem;
        font-size: 2rem;
        outline: none;
        border: none;
    }

    &__editor {
        width: 100%;
        height: calc(100vh - rem(138));
        outline: none;
        border: none;
        resize: none;
        font-size: 1rem;
        white-space: pre-wrap;
    }
}
</style>