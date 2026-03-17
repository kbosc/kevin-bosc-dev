export const STAR_COUNT = 600;
export const ROTATION_SPEED = 0.00015;
export const STAR_SIZE = 0.12;
const SPHERE_RADIUS = 50;

// Generate random positions distributed inside a sphere
export const generatePositions = () => {
    const positionArray = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
        const index = i * 3;
        let x, y, z;
        do {
            x = (Math.random() - 0.5) * 2;
            y = (Math.random() - 0.5) * 2;
            z = (Math.random() - 0.5) * 2;
        } while (x * x + y * y + z * z > 1);
        positionArray[index] = x * SPHERE_RADIUS;
        positionArray[index + 1] = y * SPHERE_RADIUS;
        positionArray[index + 2] = z * SPHERE_RADIUS;
    }
    return positionArray;
};