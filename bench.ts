import { ApiServices } from './src/lib/api-services';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Let's monkey patch ApiServices to add a realistic network delay (e.g., 200ms)
const originalGetCarbonMetrics = ApiServices.getCarbonMetrics;
const originalGetComplianceStandards = ApiServices.getComplianceStandards;

ApiServices.getCarbonMetrics = async (farmId: string) => {
    await delay(200);
    return originalGetCarbonMetrics(farmId);
};

ApiServices.getComplianceStandards = async (category: string) => {
    await delay(200);
    return originalGetComplianceStandards(category);
};

async function runSimulatedMounts() {
    console.log('--- Uncached (Current Behavior) ---');
    let start = performance.now();
    for (let i = 0; i < 5; i++) { // Simulate 5 component mounts
        await Promise.all([
            ApiServices.getCarbonMetrics('VVE-2024'),
            ApiServices.getComplianceStandards('certified-grains')
        ]);
    }
    let end = performance.now();
    console.log(`5 mounts took: ${(end - start).toFixed(2)}ms`);

    console.log('\n--- Cached (Proposed Behavior) ---');
    let cache: any = null;
    start = performance.now();
    for (let i = 0; i < 5; i++) {
        if (!cache) {
            const [m, c] = await Promise.all([
                ApiServices.getCarbonMetrics('VVE-2024'),
                ApiServices.getComplianceStandards('certified-grains')
            ]);
            cache = { m, c };
        }
        // Use cache
    }
    end = performance.now();
    console.log(`5 mounts took: ${(end - start).toFixed(2)}ms`);
}

runSimulatedMounts();
