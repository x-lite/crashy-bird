class Logger {

    debugOn: boolean;
    infoOn: boolean;
    dataOn: boolean;

    constructor(debugOn: boolean, infoOn: boolean, dataOn: boolean) {
        this.debugOn  = debugOn;
        this.infoOn = infoOn;
        this.dataOn = dataOn;
    }

    public debug(msg: string) {
        if(this.debugOn) serial.writeLine(msg);
    }

    public info(msg: string) {
        if(this.infoOn) serial.writeLine(msg);
    }

    public data(msg: number) {
        if(this.dataOn) serial.writeLine("" + msg);
    }


}
