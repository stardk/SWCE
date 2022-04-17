import Vuex from 'vuex';
import Vue from 'vue';
import api from './api.js'
import { reject } from 'q';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    chosenCharacter: {},
    nextPage: ''
  },
  getters: {
    getCharacters: state => {
      return state.characters;
    },
    getChosenCharacter: state => {
      return state.chosenCharacter;
    }
  },
  mutations: {
    setCharacters: (state, characters) => {
      characters.forEach((item) => {
        state.characters.push(item);
      })
    },
    unsetCharacters: (state) => {
      state.characters = [];
    },
    setFoundCharacters: (state, characters) => {
      state.characters = characters;
    },
    setChosenCharacter: (state, character) => {
      state.chosenCharacter = character;
    }, 
    setNextPage: (state, nextPage) => {
      state.nextPage = nextPage;
    }
  },
  actions: {
    loadCharacters(context, payload = {url: api.url, unset: false}) {
      const getSpecies = async (character) => {
        if (!character.species[0]) return ''
        return new Promise((resolve, reject) => {
          fetch(character.species[0])
            .then(res => res.json())
            .then(spec => resolve(spec.name))
        })
      }

      const getCharacterData = async (char) => {
        let characterSpecies = await getSpecies(char);
        return {
          ...char,
          species: characterSpecies
        }
      }

      const getCharacters = async () => {
        let chars = await getCharactersList();
        return Promise.all(chars.map(char => getCharacterData(char)));
      }

      const getCharactersList = async () => {
        return new Promise((resolve, reject) => {
          if (payload.url == undefined) payload.url = api.url;
          fetch(payload.url) 
            .then(response => response.json())
            .then(res => {
              context.commit('setNextPage', res.next);
              resolve(res.results);
            })
        })
      }
      return new Promise((resolve, reject) => {
        getCharacters()
          .then(chars => {
            if (payload.unset) context.commit('unsetCharacters'); 
            context.commit('setCharacters', chars);
          })
          .then(() => resolve('done'))
      })
    },
    loadNextCharacters(context) {
      context.dispatch('loadCharacters', {
        url: context.state.nextPage
      })
    },
    searchCharacters(context, payload) {
      const getInfo = async (chars) => {
        return Promise.all(chars.map(char => getCharacterData(char)));
      }
      const getCharacterData = async (char) => {
        let characterSpecies = await getSpecies(char);
        return {
          ...char,
          species: characterSpecies
        }
      }
      const getSpecies = async (character) => {
        return new Promise((resolve, reject) => {
          fetch(character.species[0])
            .then(res => res.json())
            .then(spec => resolve(spec.name))
        })
      }

      return new Promise((resolve, reject) => {
        let url = api.url + '?search=' + payload.search;
        fetch(url)
          .then(response => response.json())
          .then(async (result) => {
            result.results = await getInfo(result.results);
            context.commit('unsetCharacters');
            context.commit('setCharacters', result.results);
            resolve('done');
          })
      })
    },
    async getChosenCharacter(context, payload) {
      const getOneFilm = async (filmUrl) => {
        return new Promise((resolve, reject) => {
          fetch(filmUrl)
            .then(response => response.json())
            .then(result => resolve(result.title))
        })
      }
      const getFilmList = async (filmsUrls) => {
        return Promise.all(filmsUrls.map(filmUrl => getOneFilm(filmUrl)));
      }
      const getAdditionalInfo = async (url) => {
        console.log(url)
        if (!url) return ''
        return new Promise((resolve, reject) => {
          fetch(url)
            .then(response => response.json())
            .then(result => resolve(result.name))
        })
      }
      return new Promise((resolve, reject) => {
        fetch(payload.url)
          .then(response => response.json())
          .then(async (result) => {
            result.homeworld = await getAdditionalInfo(result.homeworld);
            result.films = await getFilmList(result.films);
            result.species = await getAdditionalInfo(result.species[0]);
            return result;
          })
          .then(result => {
            context.commit('setChosenCharacter', result);
            resolve('done');
          })
      })
    }
  }
})