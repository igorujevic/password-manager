export function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function convertISOToDate(isoDate) {
  if (isoDate) {
    const dateParts = isoDate.split('T')[0].split('-');
    const time = isoDate.split('T')[1].split('.')[0];
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]} ${time}`;
  }
  return null;
}
