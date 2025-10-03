export type StatRow = {
  rounds: number;
  wins: number;
  estimateP: string;
  exactP: string;
};

export class Stats {
  roundsSwitch = 0;
  winsSwitch = 0;
  roundsStay = 0;
  winsStay = 0;

  recordRound(switched: boolean, won: boolean) {
    if (switched) {
      this.roundsSwitch++;
      if (won) this.winsSwitch++;
    } else {
      this.roundsStay++;
      if (won) this.winsStay++;
    }
  }

  getSummary(theoreticalSwitch: number, theoreticalStay: number) {
    const pSwitchExp =
      this.roundsSwitch === 0
        ? "?"
        : (this.winsSwitch / this.roundsSwitch).toFixed(3);
    const pStayExp =
      this.roundsStay === 0
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
