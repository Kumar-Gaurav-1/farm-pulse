import { describe, it, expect } from 'vitest';
import { ApiServices, NDVIStats } from './api-services';

describe('ApiServices', () => {
  describe('getFieldNDVI', () => {
    it('should return mock NDVI stats with the correct structure and types', async () => {
      const dummyFieldId = 'field-123';
      const result = await ApiServices.getFieldNDVI(dummyFieldId);

      // Verify the object structure and values
      expect(result).toBeDefined();
      expect(result.mean).toBe(0.82);
      expect(result.min).toBe(0.65);
      expect(result.max).toBe(0.89);
      expect(result.status).toBe('Optimal');

      // Verify types to ensure the returned structure matches the expected interface
      expect(typeof result.mean).toBe('number');
      expect(typeof result.min).toBe('number');
      expect(typeof result.max).toBe('number');
      expect(['Vigorous', 'Optimal', 'Stressed', 'Critical']).toContain(result.status);
    });
  });
});
