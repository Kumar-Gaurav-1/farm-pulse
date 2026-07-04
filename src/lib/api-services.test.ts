import { describe, it, expect } from 'vitest';
import { ApiServices } from './api-services';

describe('ApiServices', () => {
  describe('getFieldNDVI', () => {
    it('should return a valid NDVIStats object', async () => {
      const fieldId = 'field-123';
      const result = await ApiServices.getFieldNDVI(fieldId);

      // Verify the expected structure
      expect(result).toHaveProperty('mean');
      expect(result).toHaveProperty('min');
      expect(result).toHaveProperty('max');
      expect(result).toHaveProperty('status');

      // Verify the specific types
      expect(typeof result.mean).toBe('number');
      expect(typeof result.min).toBe('number');
      expect(typeof result.max).toBe('number');
      expect(['Vigorous', 'Optimal', 'Stressed', 'Critical']).toContain(result.status);
    });

    it('should return the mocked data expected before real API integration', async () => {
      const fieldId = 'field-123';
      const result = await ApiServices.getFieldNDVI(fieldId);

      // Verify the specific mock data
      // If this fails, the mock has been modified, which might indicate an accidental
      // regression or that the real API has been integrated and this test needs updating.
      expect(result).toEqual({
        mean: 0.82,
        min: 0.65,
        max: 0.89,
        status: 'Optimal'
      });
    });
  });
});
