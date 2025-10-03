import { AsciiTable3 } from "ascii-table3";

export class TablePrinter {
  static printSummary(mortyName: string, summary: any) {
    const table = new AsciiTable3("Game Statistics");
    table
      .setHeading("Game results", "Rick switched", "Rick stayed")
      .addRow("Rounds", summary.switch.rounds, summary.stay.rounds)
      .addRow("Wins", summary.switch.wins, summary.stay.wins)
      .addRow("P (estimate)", summary.switch.estimateP, summary.stay.estimateP)
      .addRow("P (exact)", summary.switch.exactP, summary.stay.exactP);

    console.log("");
    console.log(table.toString());
  }
}
