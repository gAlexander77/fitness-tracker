export const log = {
    ok: (message: string) => console.log(`+ ok: ${message}`),
    error: (error: Error) => console.log(`- error: ${error.message}`)
};