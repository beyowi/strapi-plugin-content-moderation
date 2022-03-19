import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import addColumnToTableHook from "./contentManagerHooks/addColumnToTableHook";
import mutateCTBContentTypeSchema from "./utils/mutateCTBContentTypeSchema";
import CheckboxConfirmation from "./components/CheckboxConfirmation";
import { getTrad } from "./utils";
import * as yup from "yup";

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
          /* webpackChunkName: "[request]" */ "./pages/App"
        );

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    // Hook that adds a column into the CM's LV table
    app.registerHook(
      "Admin/CM/pages/ListView/inject-column-in-table",
      addColumnToTableHook
    );

    const ctbPlugin = app.getPlugin("content-type-builder");

    if (ctbPlugin) {
      const ctbFormsAPI = ctbPlugin.apis.forms;
      ctbFormsAPI.addContentTypeSchemaMutation(mutateCTBContentTypeSchema);
      ctbFormsAPI.components.add({
        id: "checkboxConfirmation",
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
                name: "pluginOptions.moderation.moderated",
                description: {
                  id: getTrad(
                    "plugin.schema.moderation.moderated.description-content-type"
                  ),
                  defaultMessage: "Allow you to keep moderate content",
                },
                type: "checkboxConfirmation",
                intlLabel: {
                  id: getTrad(
                    "plugin.schema.moderation.moderated.label-content-type"
                  ),
                  defaultMessage: "Enable moderation for this Content-Type",
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
