import { MODERATION_STATUS } from '../../utils/constants';
const filtersSchema = [
  {
    name: 'moderationStatus',
    metadatas: { label: 'status' },
    fieldSchema: {
      type: 'enumeration',
      options: [
        MODERATION_STATUS.APPROVED,
        MODERATION_STATUS.PENDING,
        MODERATION_STATUS.REJECTED,
      ],
    },
  },
];

export default filtersSchema;
