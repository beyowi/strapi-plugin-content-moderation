import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import mutateCTBContentTypeSchema from './utils/mutateCTBContentTypeSchema';
import CheckboxConfirmation from './components/CheckboxConfirmation';
import ContentViewInfos from './components/ContentViewInfos';
import { getMessage } from './utils';
import * as yup from 'yup';
import reducers from './reducers';
import pluginPermissions from './permissions';

const name = pluginPkg.strapi.displayName;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ './pages/App'
        );

        return component;
      },
      permissions: pluginPermissions.moderate,
    });
    app.addReducers(reducers);
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    // Add moderation information and actions in the editView
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'Moderation',
      Component: ContentViewInfos,
    });

    // Add form to activate plugin in content-builder
    const ctbPlugin = app.getPlugin('content-type-builder');

    if (ctbPlugin) {
      const ctbFormsAPI = ctbPlugin.apis.forms;
      ctbFormsAPI.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
      ctbFormsAPI.components.add({
        id: 'checkboxConfirmation',
        component: CheckboxConfirmation,
      });

      ctbFormsAPI.extendContentType({
        validator: () => ({
          moderation: yup.object().shape({
            moderated: yup.bool(),
          }),
        }),
        form: {
          advanced() {
            return [
              {
                name: 'pluginOptions.moderation.moderated',
                description: {
                  id: 'plugin.schema.moderation.moderated.description-content-type',
                  defaultMessage: getMessage(
                    'plugin.schema.moderation.moderated.description-content-type'
                  ),
                },
                type: 'checkboxConfirmation',
                intlLabel: {
                  id: 'plugin.schema.moderation.moderated.label-content-type',
                  defaultMessage: getMessage(
                    'plugin.schema.moderation.moderated.label-content-type'
                  ),
                },
              },
            ];
          },
        },
      });
    }
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
