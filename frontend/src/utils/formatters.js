export function truncateAddress(address, start = 6, end = 4) {
  if (!address) return '';
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function truncateHash(hash, start = 8, end = 6) {
  if (!hash) return '';
  if (hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}

export function formatOdometer(value, unit = 'km') {
  if (value === undefined || value === null) return '0 km';
  return `${Number(value).toLocaleString()} ${unit}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function isValidBikeChainId(id) {
  if (!id) return false;
  // Format: BC-YYYY-XX-NNNN
  const regex = /^BC-\d{4}-[A-Z]{2,4}-\d{4}$/i;
  return regex.test(id.trim());
}
