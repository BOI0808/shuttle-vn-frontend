export const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
