import {
  APPROVED_STATUS,
  PENDING_STATUS,
  REJECTED_STATUS,
} from '../../utils/constants';
const filtersSchema = [
  {
    name: 'moderation_status',
    metadatas: { label: 'status' },
    fieldSchema: {
      type: 'enumeration',
      options: [APPROVED_STATUS, PENDING_STATUS, REJECTED_STATUS],
    },
  },
];

export default filtersSchema;
