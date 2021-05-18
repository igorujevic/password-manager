export function convertISOToDateAndTime(isoDate) {
  if (isoDate) {
    const dateParts = isoDate.split('T')[0].split('-');
    const time = isoDate.split('T')[1].split('.')[0];
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]} ${time}`;
  }
  return null;
}

export function convertISOToDateOnly(isoDate) {
  if (isoDate) {
    const dateParts = isoDate.split('T')[0].split('-');
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  }
  return null;
}
