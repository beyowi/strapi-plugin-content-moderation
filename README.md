# Strapi - Plugin - Content moderation

### A Strapi plugin for moderation your content types.

This plugin enables your team to moderate other users' new content entries for any of your content types and also users.

## ✨ Features

- **Any Content types and Users:** Can be activated in the administration for all content types and builtin users.
- **Moderation Panel:** Sort by moderation status all your content entries together.
- **Permissions:** Add administrators and control which role can set content pending for moderation

## ⚙️ Versions

- **Strapi v4** - (current)

## 🧑‍💻 Install

```
npm i @beyowi/strapi-plugin-content-moderation
yarn add @beyowi/strapi-plugin-content-moderation
```

After successful installation, run:

```bash
npm/yarn build
npm/yarn develop
```

The **Moderation** plugin should appear in the **Plugins** section of Strapi sidebar after you run app again.

## 🔧 Configuration

1. **Moderation** must be **enabled in settings of Content Type**. _Same as localization plugin._
2. To setup plugin configuration you have to put following snippet as part of `config/plugins.js` or `config/<env>/plugins.js` file. If the file does not exist yet, you have to create it manually. If you've got already configurations for other plugins stores by this way, use just the `content-moderation` part within exising `plugins` item.

```
module.exports = ({ env }) => ({
	"content-moderation": {
		enabled:  true,
        config: {
            sendNotificationEmail: true,
            contentLabel: {
                "*": ["Title", "title", "Name", "name", "Subject", "subject"],
            },
            contentListFields: {
                "*": [
                "Title",
                "title",
                "Name",
                "name",
                "username",
                "Subject",
                "subject",
                "createdAt",
                "updatedAt",
                ],
            },
        },
	},
});
```

3. To activate moderation of built-in Users (`users-permissions` plugin), create the extensions: `src/extensions/users-permissions/content-types/user/schema.json`, copy the original content from the plugin's file and add:

```
  "pluginOptions": {
    "moderation": {
      "moderated": true
    }
  },
```

### Properties

- `sendNotificationEmail` - Enabled sending an email notification when content entries are approved or rejected to the author/user. Default value: `false`.
- `contentLabel` - List of fields that will be used to label your content in notification emails. The first field defined in your content will be used. `*` is defined for all content types. You can define label fields per content types. For example: `"Post": ["Title", "customField"]`
- `contentListFields` - List of fields that will be displayed in the content list visible in the moderation panel. `*` is defined for all content types. You can define label fields per content types. For example: `"Post": ["Title", "customField", "createdAt"]`

## 👤 RBAC

Plugin provides granular permissions based on Strapi RBAC functionality.

### Mandatory permissions

For any role different than **Super Admin**, to access the **Moderation panel** you must set following permission:

- _Plugins_ -> _Content-Moderation_ -> _Moderation: Moderate_ - gives you the basic read access to **Moderation Panel**

### Optional permissions

Feature / Capability focused permissions:

- _Plugins_ -> _Content-Moderation_ -> _Moderation: Set Pending_ - allows you to set a content pending moderation

## 📝 License

[MIT License](LICENSE.md) Copyright (c) [Beyowi](https://beyowi.com/)

## Keywords

- [strapi](https://www.npmjs.com/search?q=keywords:strapi)
- [plugin](https://www.npmjs.com/search?q=keywords:plugin)
- [moderation](https://www.npmjs.com/search?q=keywords:moderation)
