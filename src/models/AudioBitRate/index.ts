export class AudioBitRate {

    static allBitRates = [16, 32, 48, 64, 80, 96, 112, 160, 192, 224, 320]

    static getNearBitRate(bitRate: number) {
        let pound = .225

        if (bitRate > 530) {
            pound = .195
        }
        if (bitRate > 1065){
            pound = .17
        }

        console.log("Pound: ", pound)

        return this.allBitRates.reduce((prev, acc) => {
            const bitRatePound = bitRate * pound
            return (Math.abs(acc - bitRatePound) < Math.abs(prev - bitRatePound)) ? acc : prev
        })
    }
}