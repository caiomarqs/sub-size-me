export class TargetFile {
    sizeNumber: number = 0
    sizeUnit: string | undefined = "MB"

    constructor(sizeNumber?: number, sizeUnit?: string) {
        this.sizeNumber = sizeNumber ?? 0,
        this.sizeUnit = sizeUnit
    }

    getSizeKBit() {
        if (this.sizeUnit === "MB") {
            return this.sizeNumber * 1024 * 8
        }
        if (this.sizeUnit === "GB") {
            return this.sizeNumber * 1024 * 1024 * 8
        }
        else{
            return 0
        }
    }

    getInstance() {
        return this
    }
}