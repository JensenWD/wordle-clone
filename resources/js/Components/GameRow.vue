<template>
    <div class="flex align-items-center justify-center">
        <game-tile v-for="(tile, key) in row" :tile="tile"></game-tile>
    </div>
</template>
<script>
import GameTile from "./GameTile.vue"
    export default {
       props: ['row'],
       components: {
           GameTile
       }
    }
</script>