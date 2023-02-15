const RecordToArray = <T>(record: Record<string, T>): { key: string; value: T }[] => {
  const _: { key: string; value: T }[] = [];
  for (const key in record) {
    _.push({ key: key, value: record[key] });
  }
  return _;
};
const buildJsonReqInit = (body: unknown, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET') => {
  return {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export { RecordToArray, buildJsonReqInit };
