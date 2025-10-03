"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
class Stats {
    constructor() {
        this.roundsSwitch = 0;
        this.winsSwitch = 0;
        this.roundsStay = 0;
        this.winsStay = 0;
    }
    recordRound(switched, won) {
        if (switched) {
            this.roundsSwitch++;
            if (won)
                this.winsSwitch++;
        }
        else {
            this.roundsStay++;
            if (won)
                this.winsStay++;
        }
    }
    getSummary(theoreticalSwitch, theoreticalStay) {
        const pSwitchExp = this.roundsSwitch === 0
            ? "?"
            : (this.winsSwitch / this.roundsSwitch).toFixed(3);
        const pStayExp = this.roundsStay === 0
            ? "?"
            : (this.winsStay / this.roundsStay).toFixed(3);
        return {
            switch: {
                rounds: this.roundsSwitch,
                wins: this.winsSwitch,
                estimateP: pSwitchExp,
                exactP: theoreticalSwitch.toFixed(3),
            },
            stay: {
                rounds: this.roundsStay,
                wins: this.winsStay,
                estimateP: pStayExp,
                exactP: theoreticalStay.toFixed(3),
            },
        };
    }
}
exports.Stats = Stats;
