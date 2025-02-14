import { parseTrackingPlanName } from '../../../src/cli/api/trackingplans'; // Adjust the path as necessary

describe('TrackingPlan operations', () => {
  describe('delta', () => {
    it('should compute no diff on same tackingplans', () => {});
    it('should compute diff on different tackingplans', () => {});
  });

  describe('parseTrackingPlanName', () => {
    it('should raise Error if name is not formatted correctly', () => {});
    it('should parse the name correctly', () => {
      parseTrackingPlanName('workspaces/123/tracking-plans/456', 1);
    });
  });

  it('should be able to get trackingplan name correctly based on creationtype', () => {});
  it('should be able to generate trackingplan URL from trackingplan correctly', () => {});
});
