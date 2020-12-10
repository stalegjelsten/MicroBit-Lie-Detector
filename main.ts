input.onButtonPressed(Button.A, function () {
    fuktighetsmåling = 0
    antall_målinger_løgndetektor = 5
    for (let index = 0; index < antall_målinger_løgndetektor; index++) {
        fuktighetsmåling += pins.analogReadPin(AnalogPin.P1)
        basic.pause(500)
    }
    løgndetektor_gjennomsnitt = Math.idiv(fuktighetsmåling, antall_målinger_løgndetektor)
    OLED.writeNumNewLine(løgndetektor_gjennomsnitt)
    if (løgndetektor_gjennomsnitt >= gjennomsnitt_oppstart + 3 * standardavvik) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        basic.showIcon(IconNames.Sad)
        basic.pause(1500)
        basic.clearScreen()
        OLED.clear()
    } else {
        pins.digitalWritePin(DigitalPin.P8, 0)
    }
})
let løgndetektor_gjennomsnitt = 0
let antall_målinger_løgndetektor = 0
let fuktighetsmåling = 0
let standardavvik = 0
let kvadratavvik = 0
let gjennomsnitt_oppstart = 0
let baseline_sum_av_alle_målinger = 0
OLED.init(128, 64)
OLED.writeStringNewLine("Plasser fingeren paa sensoren")
basic.pause(3000)
pins.digitalWritePin(DigitalPin.P8, 0)
let antall_målinger_baseline = 30
let list: number[] = []
for (let index = 0; index < antall_målinger_baseline; index++) {
    list.push(pins.analogReadPin(AnalogPin.P1))
    baseline_sum_av_alle_målinger += pins.analogReadPin(AnalogPin.P1)
    basic.pause(1500)
}
gjennomsnitt_oppstart = Math.idiv(baseline_sum_av_alle_målinger, antall_målinger_baseline)
OLED.writeStringNewLine("Gjennomsnittet er: ")
OLED.writeNumNewLine(gjennomsnitt_oppstart)
for (let verdi of list) {
    kvadratavvik += (verdi - gjennomsnitt_oppstart) * (verdi - gjennomsnitt_oppstart)
}
standardavvik = Math.sqrt(kvadratavvik / antall_målinger_baseline)
OLED.writeStringNewLine("Standardavviket er")
OLED.writeNumNewLine(standardavvik)
