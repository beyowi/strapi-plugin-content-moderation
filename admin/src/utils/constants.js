export const MODERATION_STATUS = {
  APPROVED: 'approved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

export const DEFAULT_ROUTE_FILTER_PENDING =
  '?filters[$and][0][moderationStatus][$eq]=pending';
