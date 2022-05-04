<template>
  <div
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
      'px-2',
      'py-2'
    ]"
  >
    {{ tile.letter }}
  </div>
</template>
<script>
export default {
  props: {
    tile: { type: String },
    currentRow: { type: Function },
  },
  methods: {
    emptyCurrentTile() {
      if (tile.letter !== "") {
        tile.letter = "";
      }
    },
  },
};
</script>