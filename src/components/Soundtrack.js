const musics = [
  "The Ink Spots - It's All Over But The Crying",
  'Billie Holiday - Easy Living',
  'Andrews Sisters & Danny Kaye - Civilization',
  "The Ink Spots - I Don't Want To Set The World On Fire",
  'Connie Allen - Rocket 69',
];
const publicFolder = process.env.PUBLIC_URL;

class Soundtrack {
  constructor(updateMusicName) {
    this.updateMusicName = updateMusicName;
    this.musicName = musics[0];
    this.music = new Audio(`${publicFolder}/assets/soundtrack/${this.musicName}.mp3`);
    this.music.addEventListener('ended', () => this.handleNext());
    this.index = 0;
  }

  play = () => {
    const { music, musicName, updateMusicName } = this;
    music.play();
    updateMusicName(musicName);
  }

  pause = () => {
    this.music.pause();
  }

  isPlaying = () => !this.music.paused

  handleNext = () => {
    let newIndex = this.index + 1;
    if(newIndex === musics.length - 1) newIndex = 0;
    this.index = newIndex;

    this.musicName = musics[newIndex];
    this.updateMusicName(this.musicName);

    this.music.src = `${publicFolder}/assets/soundtrack/${musics[newIndex]}.mp3`;
    this.music.play();
  }

  changeMusic = (musicName) => {
    this.musicName = musicName;
    this.music.src = `${publicFolder}/assets/soundtrack/${musicName}.mp3`;
  }
}

export default Soundtrack;