require('./bootstrap');

import { createApp } from 'vue'

import GameRow from './components/GameRow.vue';
import GameBoard from './Components/GameBoard';

const app = createApp({});

app.component('g-row', GameRow)
.component('game-board', GameBoard)

app.mount('#game')