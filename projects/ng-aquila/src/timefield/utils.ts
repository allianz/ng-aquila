/**
 * Generate time array from start time to end time with a specified interval (in minutes)
 *
 * Example: Generate time array from 08:00 to 17:30 with a 30-minute difference
 * const timeArray = generateTimeArray("08:00", "17:30", 30);
 */
export function getTimeArray(
  startTime: string,
  endTime: string,
  interval: number,
  twelveHourFormat = false,
): { value: string; label: string }[] {
  const isoTimeRegex = /^\d{2}:\d{2}$/;
  if (!isoTimeRegex.test(startTime) || !isoTimeRegex.test(endTime)) {
    throw new Error('Invalid ISO time format. Use HH:mm format.');
  }

  // Convert start and end time to Date objects
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);

  if (startDate >= endDate) {
    throw new Error('startTime must be less than endTime.');
  }

  const result: { value: string; label: string }[] = [];

  // Loop through the time range with the specified minute span
  while (startDate < endDate) {
    // Get hours and minutes
    let hours = startDate.getHours();
    const minutes = startDate.getMinutes().toString().padStart(2, '0');
    const value = `${hours.toString().padStart(2, '0')}:${minutes}`;
    let label = value;

    // Convert to 12-hour format if specified
    if (twelveHourFormat) {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert 0 to 12
      label = `${hours}:${minutes} ${period}`;
    }

    result.push({ value, label });

    // Increment the time by the specified minute span
    startDate.setMinutes(startDate.getMinutes() + interval);
  }

  return result;
}

/**
 * Find closest time in the array to the target time
 *
 * // Example usage:
 * const timeArray = ["08:00", "12:30", "15:45", "18:00"];
 * const targetTime = "13:15";
 *
 * const closestTime = findClosestTime(timeArray, targetTime);
 *
 * console.log(`The closest time to ${targetTime} is ${closestTime}`);
 */
export function getClosestTime(timeArray: string[], targetTime: string): string {
  if (!timeArray?.length) {
    return '';
  }
  // Convert target time to Date object
  const targetDate = new Date(`2000-01-01T${targetTime}`);

  // Convert all times in the array to Date objects
  const dateArray: Date[] = timeArray.map((time) => new Date(`2000-01-01T${time}`));
  // Find the closest date in the array to the target date
  const closestDate = dateArray.reduce((closest: Date, current: Date) => {
    const closestDiff = Math.abs(targetDate.getTime() - closest?.getTime());
    const currentDiff = Math.abs(targetDate.getTime() - current?.getTime());
    return currentDiff < closestDiff ? current : closest;
  });

  // Convert the closest date back to "hh:mm" format
  const closestTime = `${closestDate.getHours().toString().padStart(2, '0')}:${closestDate.getMinutes().toString().padStart(2, '0')}`;

  return closestTime;
}
