<template lang="pug">
  .app-container
    transition(name="fade")
      .popup(v-if="showPopup")
        CharacterPopup(:character="chosenCharacter" @close-popup="closePopup")
        .popup__overlay(@click="showPopup = false")
    .content(v-infinite-scroll="loadNextCharacters" infinite-scroll-disabled="loading" infinite-scroll-distance="10")
      header
        .logo
          .logo__star-wrapper
            img(:src="require(`@/images/logo-star.png`)").logo__star
          .logo__title Character Encyclopedia
          .logo__wars-wrapper
            img(:src="require(`@/images/logo-wars.png`)").logo__wars
      main
        transition(name="fade")
          .falcon(v-if="loading" key="fetching")
            svg(width="60" height="65" viewBox="0 0 60 65" fill="none" xmlns="http://www.w3.org/2000/svg")
              path(d="M28.5504 5.26836L28.5504 24.8192L27.7833 24.8192L28.922 29.376L27.608 29.7036L26.387 24.8192L24.0894 24.8192L27.1373 29.8994L25.9756 30.5957L22.5101 24.8192L21.1693 24.8192L21.1693 23.465L27.1962 23.465L27.1962 21.9461L25.0002 21.9461L25.0002 20.5919L27.1962 20.5919L27.1962 19.0729L25.0002 19.0729L25.0002 17.7187L27.1962 17.7187L27.1962 16.1998L25.0002 16.1998L25.0002 14.8455L27.1962 14.8455L27.1962 13.3266L25.0002 13.3266L25.0002 11.9724L27.1962 11.9724L27.1962 10.4534L25.0002 10.4534L25.0002 9.09923L27.1962 9.09923L27.1962 6.62257L25.48 6.62257L19.363 24.0329L19.2539 24.1421L20.2116 25.0998L19.2539 26.0576L18.2961 25.0998L16.5153 26.8807L24.7497 31.8216L24.0535 32.9833L15.7481 28.0003L14.4619 31.1052L23.8576 33.454L23.5301 34.768L14.2124 32.4388L14.2124 34.9576L15.5676 34.9576L15.5676 36.3118L14.2124 36.3118L14.2124 38.8306L23.5301 36.5015L23.8576 37.8155L14.4619 40.1643L15.7481 43.2692L24.0535 38.2862L24.7497 39.4479L16.5153 44.3888L18.2961 46.1696L19.2539 45.2119L20.2116 46.1696L19.2539 47.1274L21.0347 48.9082L25.9756 40.6738L27.1373 41.37L22.1543 49.6754L25.2592 50.9616L27.608 41.5659L28.922 41.8934L26.5929 51.2111L29.1117 51.2111L29.1117 49.8559L30.4659 49.8559L30.4659 51.2111L32.9847 51.2111L30.6555 41.8934L31.9695 41.5659L34.3183 50.9616L37.4232 49.6754L32.4402 41.37L33.6019 40.6738L38.5428 48.9082L40.3237 47.1274L39.366 46.1696L40.3237 45.2119L41.2814 46.1696L43.0623 44.3888L34.8278 39.4479L35.5241 38.2862L43.8294 43.2692L45.1156 40.1643L35.7199 37.8155L36.0475 36.5015L45.3651 38.8306L45.3651 36.3118L44.0099 36.3118L44.0099 34.9576L45.3651 34.9576L45.3651 32.4388L36.0475 34.768L35.7199 33.454L45.1156 31.1052L43.8294 28.0003L35.5241 32.9833L34.8278 31.8216L43.0623 26.8807L41.2814 25.0998L40.3237 26.0575L39.3659 25.0998L40.3237 24.1421L40.2145 24.0329L34.0975 6.62257L32.3813 6.62257L32.3813 9.09923L34.5774 9.09923L34.5774 10.4534L32.3813 10.4534L32.3813 11.9724L34.5774 11.9724L34.5774 13.3266L32.3813 13.3266L32.3813 14.8455L34.5774 14.8455L34.5774 16.1998L32.3813 16.1998L32.3813 17.7187L34.5774 17.7187L34.5774 19.0729L32.3813 19.0729L32.3813 20.5919L34.5774 20.5919L34.5774 21.9461L32.3813 21.9461L32.3813 23.465L38.4082 23.465L38.4082 24.8192L37.0674 24.8192L33.6019 30.5957L32.4402 29.8994L35.4881 24.8192L33.1906 24.8192L31.9695 29.7036L30.6555 29.376L31.7942 24.8192L31.0271 24.8192L31.0271 5.26836L35.0572 5.26836L41.3906 23.2936L44.7287 26.6317L46.7188 31.4366L46.7188 39.8329L44.7287 44.6378L38.7918 50.5747L33.9869 52.5648L25.5906 52.5648L20.7857 50.5747L14.8488 44.6378L12.8587 39.8329L12.8587 31.4366L14.8488 26.6317L18.187 23.2936L24.5204 5.26836L28.5504 5.26836Z" fill="white")
              path(d="M33.1408 32.2827C34.9892 34.1311 34.9892 37.1383 33.1408 38.9867C31.2924 40.8351 28.2852 40.8351 26.4368 38.9867C24.5884 37.1383 24.5884 34.1311 26.4368 32.2827C28.2852 30.4343 31.2924 30.4343 33.1408 32.2827ZM27.3945 38.029C28.7147 39.3492 30.8629 39.3492 32.1831 38.029C33.5033 36.7088 33.5033 34.5606 32.1831 33.2404C30.8629 31.9202 28.7147 31.9202 27.3945 33.2404C26.0743 34.5606 26.0743 36.7088 27.3945 38.029Z" fill="white")
              path(d="M30.4663 19.2089L30.4663 20.311L29.1119 20.311L29.1119 19.2089L30.4663 19.2089Z" fill="white")
              rect(width="13.6257" height="2" transform="matrix(-1 3.17865e-08 3.17865e-08 1 36.605 55.1332)" fill="#6EF6FF")
              rect(opacity="0.4" width="11.1925" height="2" transform="matrix(-1 3.17865e-08 3.17865e-08 1 35.6316 59.0262)" fill="#6EF6FF")
              rect(opacity="0.1" width="8.75936" height="2" transform="matrix(-1 3.17865e-08 3.17865e-08 1 34.1719 62.9193)" fill="#6EF6FF")
          .main-content(v-else key="fetched")
            .search
              .search__input 
                input(type="text" v-model="currentSearch" required="required" @input="debounceInput")
                span Search by name
              .search__icon
                svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
                  path(d="M16.6667 14.6667H15.6133L15.24 14.3067C16.5467 12.7867 17.3333 10.8133 17.3333 8.66667C17.3333 3.88 13.4533 0 8.66667 0C3.88 0 0 3.88 0 8.66667C0 13.4533 3.88 17.3333 8.66667 17.3333C10.8133 17.3333 12.7867 16.5467 14.3067 15.24L14.6667 15.6133V16.6667L21.3333 23.32L23.32 21.3333L16.6667 14.6667ZM8.66667 14.6667C5.34667 14.6667 2.66667 11.9867 2.66667 8.66667C2.66667 5.34667 5.34667 2.66667 8.66667 2.66667C11.9867 2.66667 14.6667 5.34667 14.6667 8.66667C14.6667 11.9867 11.9867 14.6667 8.66667 14.6667Z" fill="currentColor")
            CharacterCard.card-list-item(
              v-for="(character, index) in characters"
              :key="index"  
              :character="character"
              @click.native="onCardClick(character.url)"
            )
      footer STAR WARS CHARACTER Encyclopedia, 2019
</template>

<script>
import CharacterCard from './components/CharacterCard.vue'
import CharacterPopup from '@/components/CharacterPopup.vue';

export default {
  name: 'app',
  components: {
    CharacterCard,
    CharacterPopup
  },
  data() {
    return {
      characters: [],
      loading: null,
      debounce: null,
      searchValue: '',
      currentSearch: '',
      chosenCharacter: {},
      showPopup: false
    }
  },
  mounted () {
    this.fetchCharacters();
  },
  methods: {
    async fetchCharacters(payload = { unset: false }) {
      this.loading = true;
      this.$store.dispatch('loadCharacters', payload)
        .then(() => {
          this.characters = this.$store.getters.getCharacters;
          this.loading = false;
        })
    },
    debounceInput(event) {
      this.searchValue = null;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.searchValue = event.target.value;
        if (this.searchValue != '') {
          this.loading = true;
          this.search();
        }
        else {
          this.fetchCharacters({ unset: true });
        }
      }, 1000);
    },
    async search() {
      this.$store.dispatch('searchCharacters', { search: this.searchValue })
        .then(() => {
          this.characters = this.$store.getters.getCharacters;
          this.loading = false;
        })
    },
    async onCardClick(url) {
      this.loading = true;
      this.$store.dispatch('getChosenCharacter', { url: url })
        .then(() => {
          this.chosenCharacter = this.$store.getters.getChosenCharacter;
          this.loading = false;
          document.querySelector('.content').classList.add('underPopup');
          this.showPopup = true;
        })
    },
    loadNextCharacters() {
      if (this.searchValue == '') {
        this.$store.dispatch('loadNextCharacters');
      }
    },
    closePopup() {
      this.showPopup = false;
      document.querySelector('.content').classList.remove('underPopup');
    }
  }
}
</script>

<style lang="scss">
// Constants
$header-height: calc(100vh / 3);
$main-height: calc(200vh / 3);
$grey: #808080;
$min-width-value: 320px;
$max-width-value: 767px;

//Animations
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}
.fade-enter-active {
  transition-delay: 0.5s;
}
.fade-enter {
  opacity: 0;
  transform: translateY(100px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.fade-leave {
  opacity: 1;
  transform: translateY(0px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

body {
  font-family: Roboto, sans-serif;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  .app-container {
    .popup {
      width: 100vw;
      height: 100vh;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .popup__overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        backdrop-filter: blur(30px);
        z-index: 999;
        @media (min-width: $min-width-value) and (max-width: $max-width-value) {
          display: none;
        }
      }
      *:not(.popup__overlay) {
        z-index: 1000;
      }
    }
    .underPopup {
      @media (min-width: 768px) {
        position: fixed;
        overflow: hidden;
      }
      @media (min-width: $min-width-value) and (max-width: $max-width-value) {
        display: none;
      }
    }
    .content {
      width: 100%;
      height: 100%;
      header {
        height: $header-height;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("images/header.png") no-repeat;
        background-size: cover;
        background-position: 0 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        .logo {
          max-width: 25%;
          width: auto;
          height: auto;
          @media (min-width: $min-width-value) and (max-width: $max-width-value) {
            max-width: 35%;
            padding: 0;
          }
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          .logo__star-wrapper {
            flex-basis: 0;
            align-self: end;
            display: flex;
            max-height: 40%;
            max-width: 100%;
            .logo__star {
              position: relative;
              bottom: 0;
              width: 100%;
            }
          }
          .logo__title {
            margin: 9px 0;
            font-weight: bold;
            font-size: 18px;
            letter-spacing: 0.11em;
            text-transform: uppercase;
            color: #ffffff;
            white-space: nowrap;
            @media (min-width: $min-width-value) and (max-width: $max-width-value) {
              font-size: 14px;
            }
          }
          .logo__wars-wrapper {
            max-width: 100%;
            flex-basis: 0;
            display: flex;
            .logo__wars {
              width: 100%;
            }
          }
        }
      }
      main {
        min-height: $main-height;
        background-color: #333333;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        padding-bottom: 150px;
        @keyframes falcon {
          from { 	transform: rotate(0deg) translateX(75px); }
          to   {  transform: rotate(360deg) translateX(75px); }
        }
        @keyframes falcon-fire {
          0% { 	opacity: 0; }
          50% { opacity: 0.5; }
          100%   {  opacity: 1; }
        }
        .falcon {
          animation: falcon 3s linear infinite;
          svg {
            transform: rotate(180deg);
            rect:nth-child(4) {
              animation: 0.5s linear infinite falcon-fire alternate;
            }
            rect:nth-child(5) {
              animation: 0.5s linear 0.25s infinite falcon-fire alternate;
            }
            rect:last-child {
              animation: 0.5s linear 0.5s infinite falcon-fire alternate;
            }
          }
        }
        .main-content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-content: center;
          padding:0 112px;
          width: 100%;
          @media (min-width: $min-width-value) and (max-width: $max-width-value) {
              padding: 0 24px;
          }
          .card-list-item {
            margin: 16px;
            flex: 1 0 35%;
            @media (min-width: $min-width-value) and (max-width: $max-width-value) {
              flex: 1 0 70%;
              margin: 12px 0;
            }
          }
          .search {
            width: 100%;
            margin: calc(100vh / 12) 208px 64px 208px;
            border-bottom: 1px solid $grey;
            display: flex;
            color: $grey;
            @media (min-width: $min-width-value) and (max-width: $max-width-value) {
              margin: 45px 0;
            }
            .search__input {
              position: relative;
              flex: 1 0 50%;
              input {
                width: 100%;
                border: none;
                font-weight: 500;
                font-size: 18px;
                background-color: transparent;
                outline: none;
                color: $grey;
                z-index: 99;
              }
              span {
                pointer-events: none;
                position: absolute;
                left: 0;
                bottom: 0;
                font-weight: 500;
                font-size: 18px;
              }
              input:valid + span {
                transform: translateY(-30px);
                font-size: 13px;
              }
              input:focus + span {
                transform: translateY(-30px);
                font-size: 13px;
              }
            }
            .search__icon {
              flex: 0 0;
            }
          }
        }
      }
      footer {
        text-transform: uppercase;
        height: 120px;
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1A1A1A;
        color: #ffffff;
        font-weight: bold;
        font-size: 18px;
        @media (min-width: $min-width-value) and (max-width: $max-width-value) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
