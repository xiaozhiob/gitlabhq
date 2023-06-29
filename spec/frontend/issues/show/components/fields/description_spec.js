import { shallowMount } from '@vue/test-utils';
import DescriptionField from '~/issues/show/components/fields/description.vue';
import eventHub from '~/issues/show/event_hub';
import MarkdownField from '~/vue_shared/components/markdown/field.vue';
import MarkdownEditor from '~/vue_shared/components/markdown/markdown_editor.vue';

describe('Description field component', () => {
  let wrapper;

  const findMarkdownEditor = () => wrapper.findComponent(MarkdownEditor);
  const mountComponent = ({ description = 'test', contentEditorOnIssues = false } = {}) => {
    wrapper = shallowMount(DescriptionField, {
      attachTo: document.body,
      propsData: {
        markdownPreviewPath: '/',
        markdownDocsPath: '/',
        value: description,
      },
      provide: {
        glFeatures: {
          contentEditorOnIssues,
        },
      },
      stubs: {
        MarkdownField,
      },
    });
  };

  beforeEach(() => {
    jest.spyOn(eventHub, '$emit');

    mountComponent({ contentEditorOnIssues: true });
  });

  it('passes feature flag to the MarkdownEditorComponent', () => {
    expect(findMarkdownEditor().props('enableContentEditor')).toBe(true);

    mountComponent({ contentEditorOnIssues: false });

    expect(findMarkdownEditor().props('enableContentEditor')).toBe(false);
  });

  it('uses the MarkdownEditor component to edit markdown', () => {
    expect(findMarkdownEditor().props()).toMatchObject({
      value: 'test',
      renderMarkdownPath: '/',
      autofocus: true,
      supportsQuickActions: true,
      markdownDocsPath: '/',
      enableAutocomplete: true,
    });
  });

  it('triggers update with meta+enter', () => {
    findMarkdownEditor().vm.$emit('keydown', {
      type: 'keydown',
      keyCode: 13,
      metaKey: true,
    });

    expect(eventHub.$emit).toHaveBeenCalledWith('update.issuable');
  });

  it('triggers update with ctrl+enter', () => {
    findMarkdownEditor().vm.$emit('keydown', {
      type: 'keydown',
      keyCode: 13,
      ctrlKey: true,
    });

    expect(eventHub.$emit).toHaveBeenCalledWith('update.issuable');
  });

  it('emits input event when MarkdownEditor emits input event', () => {
    const markdown = 'markdown';

    findMarkdownEditor().vm.$emit('input', markdown);

    expect(wrapper.emitted('input')).toEqual([[markdown]]);
  });
});
