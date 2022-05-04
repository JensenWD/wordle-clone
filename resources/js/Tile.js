export default class Tile {
    letter = "";
    status = "";
  
    empty() {
      this.letter = "";
    }

    updateStatus(guess, answer){
        this.status = answer.includes(this.letter) ? "present" : "absent";

        // if (this.currentGuess()[index] == this.answer[index]) {
        //   this.status = "correct";
        // }
    }
    
}