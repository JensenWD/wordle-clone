<template>
  <div class="h-full flex flex-col align-items-center justify-center relative">
    <div
      v-for="(row, key) in board"
      class="flex align-items-center justify-center"
    >
      <!-- <game-tile v-for="(tile, key) in row" :tile="tile"></game-tile> -->
      <div
        v-for="(tile, key) in row"
        :class="[
          tile.status,
          'tile',
          'outline-1',
          'outline-white',
          'outline',
          'flex',
          'items-center',
          'justify-center',
          'w-24',
          'h-24',
          'text-white',
          'capitalize',
          'font-extrabold',
          'text-2xl',
          'm-1',
          'rounded-sm',
        ]"
      >
        {{ tile.letter }}
      </div>
    </div>

    <div
      v-show="message !== ''"
      class="
        text-white text-center
        font-semibold
        text-2xl
        my-4
        absolute
        bottom-10
        inset-x-0
      "
    >
      <span class="border-2 rounded-2xl px-5 py-1">{{ message }}</span>
    </div>
  </div>
</template>
<script>
import Tile from "../Tile";

export default {
  data() {
    return {
      attemptsAllowed: 3,
      board: [],
      answer: "cat",
      currentRowIndex: 0,
      currentTileIndex: 0,
      state: "active",
      message: "",
    };
  },
  created() {
    let self = this;
    this.board = Array.from({ length: this.attemptsAllowed }, () => {
      return Array.from({ length: this.answer.length }, () => new Tile());
    });

    window.addEventListener("keydown", (e) => {
      self.onKeyPress(e.key);
    });
  },
  mounted() {},
  methods: {
    onKeyPress(key) {
      this.message = "";
      if (/^[A-z]$/.test(key)) {
        this.fillTile(key);
      } else if (key == "Enter") {
        this.submitGuess();
      } else if (key == "Backspace") {
        this.emptyCurrentTile();
      }
    },

    fillTile(key) {
      for (let tile of this.currentRow()) {
        if (tile.letter == "") {
          tile.letter = key;
          break;
        }
      }
    },

    currentRow() {
      return this.board[this.currentRowIndex];
    },

    currentGuess() {
      return this.currentRow()
        .map((tile) => tile.letter)
        .join("");
    },

    submitGuess() {
      if (this.currentGuess().length < this.answer.length) {
        return;
      }

      for (let tile of this.currentRow()) {
        tile.updateStatus(this.currentGuess, this.answer);
      }

      this.currentRow().forEach((tile, index) => {
        if (!this.answer.includes(tile.letter)) {
          tile.status = "absent";
        } else {
          tile.status = "present";
        }

        if (this.currentGuess()[index] == this.answer[index]) {
          tile.status = "correct";
        }
      });

      if (this.currentGuess() == this.answer) {
        this.state = "complete";

        return (this.message = "You Win!");
      }

      if (this.remainingGuesses === 0) {
        this.state = "done";

        return (this.message = "Game over!");
      } 

        this.currentRowIndex++;
      
        this.message = "Wrong!";
      
    },

    remainingGuesses() {
      return this.attemptsAllowed - this.currentRow - 1;
    },

    emptyCurrentTile() {
      let reverse = this.currentRow().map(this.currentRow().pop, [
        ...this.currentRow(),
      ]);

      for (let tile of reverse) {
        if (tile.letter !== "") {
          tile.empty();
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.absent {
  background: grey;
}

.present {
  background: rgba(255, 255, 0, 0.769);
}

.correct {
  background: green;
}
</style>