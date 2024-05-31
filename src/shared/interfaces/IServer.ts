export interface Server {
    run(callback: () => void): Promise<void>;
}
