"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablePrinter = void 0;
const ascii_table3_1 = require("ascii-table3");
class TablePrinter {
    static printSummary(mortyName, summary) {
        const table = new ascii_table3_1.AsciiTable3("Game Statistics");
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
exports.TablePrinter = TablePrinter;
