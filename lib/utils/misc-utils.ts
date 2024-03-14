const SERVICE_NAME = process.env.SERVICE_NAME || 'edcsqcuared';
const STAGE = process.env.STAGE || 'develop';

export const formatServiceName = (name: string) =>
  `${SERVICE_NAME}-${name}-${STAGE}`;
