class Timer {

    private ms_to_timeout: number;
    private timeout: NodeJS.Timeout | null = null;

    private callback: () => void;

    constructor(callback: () => void, ms_to_timeout: number) {
        this.ms_to_timeout = ms_to_timeout;
        this.callback = callback;
    }

    resetAndStart(): void {
        this.reset();
        this.timeout = setTimeout(this.callback, this.ms_to_timeout);
    }

    private reset(): void {
        if (this.timeout)
            clearTimeout(this.timeout);
    }

}
