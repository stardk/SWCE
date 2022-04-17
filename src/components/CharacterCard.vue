<template lang="pug">
  .card
    .card__avatar(:style="{ color: bgColor }")
      span {{ character.name.charAt(0) }}
    .card__name {{ character.name }}
    .card__species {{ character.species }}
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  computed: {
    bgColor() {
      let color = Math.floor(Math.random() * 16777216).toString(16);
      return '#000000'.slice(0, -color.length) + color;
    }
  }
}
</script>

<style scoped lang="scss">
$white: #ffffff;
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #1A1A1A;
  border-radius: 8px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  @media (min-width: 768px) {
    padding: 93px 0 92px 0;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    padding: 33px 0 36px 0;
  }
  &:hover {
    box-shadow: 0px 10px 40px rgba(37, 136, 167, 0.38);
  }
  .card__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: currentColor;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-weight: 500;
      font-size: 48px;
      color: $white;
    }
  }
  .card__name {
    margin: 10px 0 9px 0;
    font-weight: bold;
    font-size: 18px;
    color: $white;
  }
  .card__species {
    font-weight: normal;
    font-size: 13px;
    color: #808080;
  }
}
</style>
