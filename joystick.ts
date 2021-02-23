// Add your code here
class Joystick {

    xPin: AnalogPin;
    yPin: AnalogPin;
    logger: Logger;

    constructor(xPin: AnalogPin, yPin: AnalogPin, logger: Logger) {
        this.xPin = xPin;
        this.yPin = yPin;
        this.logger = logger;
    }

    public getX(): Number {
        return pins.map(pins.analogReadPin(this.xPin),8,1016,0,4)
    }
    public getY(): Number {
        return pins.map(pins.analogReadPin(this.yPin),8,1018,0,4)
    }
}
