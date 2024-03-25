import Vue from 'vue';

import { convertObjectPropsToCamelCase } from '~/lib/utils/common_utils';
import App from './components/app.vue';

export const initOrganizationsProjectsEdit = () => {
  const el = document.getElementById('js-organizations-projects-edit');

  if (!el) return false;

  const {
    dataset: { appData },
  } = el;
  const { project } = convertObjectPropsToCamelCase(JSON.parse(appData), { deep: true });

  return new Vue({
    el,
    name: 'OrganizationProjectsEditRoot',
    provide: {
      project,
    },
    render(createElement) {
      return createElement(App);
    },
  });
};
