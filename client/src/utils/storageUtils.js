export const setQRDataWithExpiry = (key, value, expiryDuration) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryDuration,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getQRDataWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
