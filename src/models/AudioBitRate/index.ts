export class AudioBitRate {
    b320 = 320
    b192 = 192
    b128 = 128
    b96 = 96
    b32 = 32
    b16 = 16

    allBitRate = [
        this.b16,
        this.b32,
        this.b96,
        this.b128,
        this.b192,
        this.b320
    ]

    getNearBitRate(audioBitRate: number) {
        return this.allBitRate.reduce((prev, acc) => {
            const bitRatePound = audioBitRate * .2
            return (Math.abs(acc - bitRatePound) < Math.abs(prev - bitRatePound)) ? acc : prev
        })
    }
}