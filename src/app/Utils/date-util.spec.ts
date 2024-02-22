import { formatDate, formatDateString, calculateRevisionDate } from './date-util';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format a date correctly', () => {
      const date = new Date('2024-02-20');
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe('2024-02-19');
    });
  });

  describe('formatDateString', () => {
    it('should format a date string correctly', () => {
      const dateString = '2024-02-20T00:00:00.000Z';
      const formattedDateString = formatDateString(dateString);
      expect(formattedDateString).toBe('2024-02-20');
    });
  });

  describe('calculateRevisionDate', () => {
    it('should calculate the revision date correctly', () => {
      const date = new Date('2024-02-20');
      const revisionDate = calculateRevisionDate(date);
      expect(revisionDate.getFullYear()).toBe(2025);
      expect(revisionDate.getMonth()).toBe(1);
      expect(revisionDate.getDate()).toBe(20);
    });
  });
});