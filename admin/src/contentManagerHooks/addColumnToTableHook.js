import get from 'lodash/get';

const addColumnToTableHook = ({ displayedHeaders, layout }) => {
  const moderationActivated = get(
    layout,
    'contentType.pluginOptions.moderation.moderated',
    false
  );

  if (!moderationActivated) {
    return { displayedHeaders, layout };
  }

  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        key: '__moderationStatus_key__',
        fieldSchema: { type: 'string' },
        metadatas: {
          label: 'Moderation status',
          searchable: true,
          sortable: true,
        },
        name: 'moderationStatus',
        cellFormatter: (props) => props.moderationStatus,
      },
    ],
    layout,
  };
};

export default addColumnToTableHook;
