import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./css/style.css";
import useSound from "use-sound";
import mySound from "./media/music.mp3";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import CoinTable from "../../components/CoinTable/CoinTable";
import instance from "../../axios";

export default function Game() {
  const [playSound] = useSound(mySound);
  const userData = useSelector((state) => state.auth.data);
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    if (userData && total != 0) {
      const setCoins = async () => {
        try {
          const data = await instance.post(
            `/user/coins/${userData.recordId}/${total}`
          );
        } catch (err) {
          console.log(err);
        }
      };
      setCoins();
    }
  }, [total]);

  const handlerStartClick = (e) => {
    e.preventDefault();
    playSound();
  };

  var isHolding = {
    s: false,
    d: false,
    f: false,
    " ": false,
    j: false,
    k: false,
    l: false,
  };

  var hits = { perfect: 0, good: 0, bad: 0, miss: 0 };
  var multiplier = {
    perfect: 1,
    good: 0.8,
    bad: 0.5,
    miss: 0,
    combo40: 1.05,
    combo80: 1.1,
  };
  var isPlaying = false;
  var speed = 0;
  var combo = 0;
  var maxCombo = 0;
  var score = 0;
  var animation = "moveDown";
  var startTime;
  var trackContainer;
  var tracks;
  var keypress;
  var comboText;

  var s = {
    color: "rgba(28, 121, 228, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 28.1 },
      { duration: 3, delay: 35.5 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 },
    ],
  };

  var d = {
    color: "rgba(254, 45, 87, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 2.2 },
      { duration: 3, delay: 6.2 },
      { duration: 3, delay: 10.2 },
      { duration: 3, delay: 18.5 },
      { duration: 3, delay: 22.4 },
      { duration: 3, delay: 26.2 },
      { duration: 3, delay: 29.9 },
      { duration: 3, delay: 33.6 },
      { duration: 3, delay: 37.3 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 41.3 },
      { duration: 3, delay: 47.4 },
    ],
  };

  var f = {
    color: "rgba(28, 121, 228, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 0.2 },
      { duration: 3, delay: 8.2 },
      { duration: 3, delay: 14.1 },
      { duration: 3, delay: 16.4 },
      { duration: 3, delay: 24.4 },
      { duration: 3, delay: 31.8 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 41.3 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 },
    ],
  };

  var space = {
    color: "rgba(240, 128, 60, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 3.9 },
      { duration: 3, delay: 7.7 },
      { duration: 3, delay: 9.9 },
      { duration: 3, delay: 11.2 },
      { duration: 3, delay: 11.7 },
      { duration: 3, delay: 12.2 },
      { duration: 3, delay: 15.9 },
      { duration: 3, delay: 20.2 },
      { duration: 3, delay: 23 },
      { duration: 3, delay: 25 },
      { duration: 3, delay: 26.7 },
      { duration: 3, delay: 30.4 },
      { duration: 3, delay: 32.4 },
      { duration: 3, delay: 34.1 },
      { duration: 3, delay: 37.8 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
    ],
  };

  var j = {
    color: "rgba(28, 121, 228, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 3.2 },
      { duration: 3, delay: 3.7 },
      { duration: 3, delay: 11 },
      { duration: 3, delay: 12 },
      { duration: 3, delay: 14.1 },
      { duration: 3, delay: 19.4 },
      { duration: 3, delay: 19.9 },
      { duration: 3, delay: 23.5 },
      { duration: 3, delay: 24.6 },
      { duration: 3, delay: 24.8 },
      { duration: 3, delay: 25.2 },
      { duration: 3, delay: 25.7 },
      { duration: 3, delay: 25.9 },
      { duration: 3, delay: 27.2 },
      { duration: 3, delay: 28.3 },
      { duration: 3, delay: 28.8 },
      { duration: 3, delay: 29.5 },
      { duration: 3, delay: 30.9 },
      { duration: 3, delay: 32 },
      { duration: 3, delay: 32.2 },
      { duration: 3, delay: 32.6 },
      { duration: 3, delay: 33.1 },
      { duration: 3, delay: 33.3 },
      { duration: 3, delay: 34.6 },
      { duration: 3, delay: 35.7 },
      { duration: 3, delay: 36.2 },
      { duration: 3, delay: 36.9 },
      { duration: 3, delay: 38.7 },
      { duration: 3, delay: 39.1 },
      { duration: 3, delay: 39.5 },
      { duration: 3, delay: 41.3 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 },
    ],
  };

  var k = {
    color: "rgba(254, 45, 87, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 2.7 },
      { duration: 3, delay: 4.2 },
      { duration: 3, delay: 8.2 },
      { duration: 3, delay: 9.2 },
      { duration: 3, delay: 10.7 },
      { duration: 3, delay: 13.2 },
      { duration: 3, delay: 13.8 },
      { duration: 3, delay: 18.9 },
      { duration: 3, delay: 20.4 },
      { duration: 3, delay: 23.7 },
      { duration: 3, delay: 24.1 },
      { duration: 3, delay: 27.4 },
      { duration: 3, delay: 27.8 },
      { duration: 3, delay: 29.7 },
      { duration: 3, delay: 31.1 },
      { duration: 3, delay: 31.5 },
      { duration: 3, delay: 34.8 },
      { duration: 3, delay: 35.2 },
      { duration: 3, delay: 37.1 },
      { duration: 3, delay: 38.9 },
      { duration: 3, delay: 41.3 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 52 },
    ],
  };

  var l = {
    color: "rgba(28, 121, 228, 1)",
    next: 0,
    notes: [
      { duration: 3, delay: 0.2 },
      { duration: 3, delay: 1.2 },
      { duration: 3, delay: 1.9 },
      { duration: 3, delay: 2.2 },
      { duration: 3, delay: 10.2 },
      { duration: 3, delay: 13.5 },
      { duration: 3, delay: 16.4 },
      { duration: 3, delay: 17.4 },
      { duration: 3, delay: 18.2 },
      { duration: 3, delay: 18.5 },
      { duration: 3, delay: 23.9 },
      { duration: 3, delay: 27.6 },
      { duration: 3, delay: 29 },
      { duration: 3, delay: 31.3 },
      { duration: 3, delay: 35 },
      { duration: 3, delay: 36.4 },
      { duration: 3, delay: 41.3 },
      { duration: 3, delay: 43.5 },
      { duration: 3, delay: 47.4 },
      { duration: 3, delay: 49.5 },
      { duration: 3, delay: 52 },
    ],
  };

  var song = {
    duration: 56,
    sheet: [s, d, f, space, j, k, l],
  };

  var initializeNotes = function () {
    var noteElement;
    var trackElement;

    while (trackContainer.hasChildNodes()) {
      trackContainer.removeChild(trackContainer.lastChild);
    }

    song.sheet.forEach(function (key, index) {
      trackElement = document.createElement("div");
      trackElement.classList.add("track");

      key.notes.forEach(function (note) {
        noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.classList.add("note--" + index);
        noteElement.style.backgroundColor = key.color;
        noteElement.style.animationName = animation;
        noteElement.style.animationTimingFunction = "linear";
        noteElement.style.animationDuration = note.duration - speed + "s";
        noteElement.style.animationDelay = note.delay + speed + "s";
        noteElement.style.animationPlayState = "paused";
        trackElement.appendChild(noteElement);
      });
      trackContainer.appendChild(trackElement);
      tracks = document.querySelectorAll(".track");
    });
  };

  var setupSpeed = function () {
    var buttons = document.querySelectorAll(".btn--small");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        if (this.innerHTML === "1x") {
          buttons[0].className = "btn btn--small btn--selected";
          buttons[1].className = "btn btn--small";
          buttons[2].className = "btn btn--small";
          speed = parseInt(this.innerHTML) - 1;
        } else if (this.innerHTML === "2x") {
          buttons[0].className = "btn btn--small";
          buttons[1].className = "btn btn--small btn--selected";
          buttons[2].className = "btn btn--small";
          speed = parseInt(this.innerHTML) - 1;
        } else if (this.innerHTML === "3x") {
          buttons[0].className = "btn btn--small";
          buttons[1].className = "btn btn--small";
          buttons[2].className = "btn btn--small btn--selected";
          speed = parseInt(this.innerHTML) - 1;
        }

        initializeNotes();
      });
    });
  };

  var setupChallenge = function () {
    var enabled = false;
    var challenge = document.querySelector(".config__challenge");
    challenge.addEventListener("click", function (event) {
      if (enabled) {
        event.target.className = "btn btn--small";
        enabled = false;
      } else {
        event.target.className = "btn btn--small btn--selected";
        enabled = true;
        updateAnimation();
      }
    });
  };

  var updateAnimation = function () {
    animation = "moveDownFade";
    initializeNotes();
  };

  var setupStartButton = function () {
    var startButton = document.querySelector(".btn--start");
    startButton.addEventListener("click", function () {
      isPlaying = true;
      startTime = Date.now();

      startTimer(song.duration);
      document.querySelector(".menu").style.opacity = 0;
      // document.querySelector(".song").play();
      document.querySelectorAll(".note").forEach(function (note) {
        note.style.animationPlayState = "running";
      });
    });
  };

  var startTimer = async function (duration) {
    var display = document.querySelector(".summary__timer");
    var timer = duration;
    var minutes;
    var seconds;

    display.style.display = "block";
    display.style.opacity = 1;

    var songDurationInterval = setInterval(function () {
      minutes = Math.floor(timer / 60);
      seconds = timer % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.innerHTML = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(songDurationInterval);
        showResult();
        comboText.style.transition = "all 1s";
        comboText.style.opacity = 0;
      }
    }, 1000);
  };

  var showResult = function () {
    setTotal(score);
    document.querySelector(".perfect__count").innerHTML = hits.perfect;
    document.querySelector(".good__count").innerHTML = hits.good;
    document.querySelector(".bad__count").innerHTML = hits.bad;
    document.querySelector(".miss__count").innerHTML = hits.miss;
    document.querySelector(".combo__count").innerHTML = maxCombo;
    document.querySelector(".score__count").innerHTML = score;
    document.querySelector(".summary__timer").style.opacity = 0;
    document.querySelector(".summary__result").style.opacity = 1;
  };

  var setupNoteMiss = function () {
    trackContainer.addEventListener("animationend", function (event) {
      var index = event.target.classList.item(1)[6];

      displayAccuracy("miss");
      updateHits("miss");
      updateCombo("miss");
      updateMaxCombo();
      removeNoteFromTrack(event.target.parentNode, event.target);
      updateNext(index);
    });
  };

  /**
   * Allows keys to be only pressed one time. Prevents keydown event
   * from being handled multiple times while held down.
   */
  var setupKeys = function () {
    document.addEventListener("keydown", function (event) {
      var keyIndex = getKeyIndex(event.key);

      if (
        Object.keys(isHolding).indexOf(event.key) !== -1 &&
        !isHolding[event.key]
      ) {
        isHolding[event.key] = true;
        keypress[keyIndex].style.display = "block";

        if (isPlaying && tracks[keyIndex].firstChild) {
          judge(keyIndex);
        }
      }
    });

    document.addEventListener("keyup", function (event) {
      if (Object.keys(isHolding).indexOf(event.key) !== -1) {
        var keyIndex = getKeyIndex(event.key);
        isHolding[event.key] = false;
        keypress[keyIndex].style.display = "none";
      }
    });
  };

  var getKeyIndex = function (key) {
    if (key === "s") {
      return 0;
    } else if (key === "d") {
      return 1;
    } else if (key === "f") {
      return 2;
    } else if (key === " ") {
      return 3;
    } else if (key === "j") {
      return 4;
    } else if (key === "k") {
      return 5;
    } else if (key === "l") {
      return 6;
    }
  };

  var judge = function (index) {
    var timeInSecond = (Date.now() - startTime) / 1000;
    var nextNoteIndex = song.sheet[index].next;
    var nextNote = song.sheet[index].notes[nextNoteIndex];
    var perfectTime = nextNote.duration + nextNote.delay;
    var accuracy = Math.abs(timeInSecond - perfectTime);
    var hitJudgement;

    /**
     * As long as the note has travelled less than 3/4 of the height of
     * the track, any key press on this track will be ignored.
     */
    if (accuracy > (nextNote.duration - speed) / 4) {
      return;
    }

    hitJudgement = getHitJudgement(accuracy);
    displayAccuracy(hitJudgement);
    showHitEffect(index);
    updateHits(hitJudgement);
    updateCombo(hitJudgement);
    updateMaxCombo();
    calculateScore(hitJudgement);
    removeNoteFromTrack(tracks[index], tracks[index].firstChild);
    updateNext(index);
  };

  var getHitJudgement = function (accuracy) {
    if (accuracy < 0.1) {
      return "perfect";
    } else if (accuracy < 0.2) {
      return "good";
    } else if (accuracy < 0.3) {
      return "bad";
    } else {
      return "miss";
    }
  };

  var displayAccuracy = function (accuracy) {
    var accuracyText = document.createElement("div");
    document.querySelector(".hit__accuracy").remove();
    accuracyText.classList.add("hit__accuracy");
    accuracyText.classList.add("hit__accuracy--" + accuracy);
    accuracyText.innerHTML = accuracy;
    document.querySelector(".hit").appendChild(accuracyText);
  };

  var showHitEffect = function (index) {
    var key = document.querySelectorAll(".key")[index];
    var hitEffect = document.createElement("div");
    hitEffect.classList.add("key__hit");
    key.appendChild(hitEffect);
  };

  var updateHits = function (judgement) {
    hits[judgement]++;
  };

  var updateCombo = function (judgement) {
    if (judgement === "bad" || judgement === "miss") {
      combo = 0;
      comboText.innerHTML = "";
    } else {
      comboText.innerHTML = ++combo;
    }
  };

  var updateMaxCombo = function () {
    maxCombo = maxCombo > combo ? maxCombo : combo;
  };

  var calculateScore = function (judgement) {
    if (combo >= 80) {
      score += 1000 * multiplier[judgement] * multiplier.combo80;
    } else if (combo >= 40) {
      score += 1000 * multiplier[judgement] * multiplier.combo40;
    } else {
      score += 1000 * multiplier[judgement];
    }
  };

  var removeNoteFromTrack = function (parent, child) {
    parent.removeChild(child);
  };

  var updateNext = function (index) {
    song.sheet[index].next++;
  };

  window.onload = function () {
    trackContainer = document.querySelector(".track-container");
    keypress = document.querySelectorAll(".keypress");
    comboText = document.querySelector(".hit__combo");

    initializeNotes();
    setupSpeed();
    setupChallenge();
    setupStartButton();
    setupKeys();
    setupNoteMiss();
  };

  return (
    <div>
      <Header />

      <div>
        <main>
          <div class="game mt-4">
            <div class="hit">
              <div class="hit__combo"></div>
              <div class="hit__accuracy"></div>
            </div>

            <div class="track-container"></div>

            <div class="key-container">
              <div class="key key--s key--blue">
                <div class="keypress keypress--blue"></div>
                <span>S</span>
              </div>
              <div class="key key--d key--red">
                <div class="keypress keypress--red"></div>
                <span>D</span>
              </div>
              <div class="key key--f key--blue">
                <div class="keypress keypress--blue"></div>
                <span>F</span>
              </div>
              <div class="key key--space key--orange">
                <div class="keypress keypress--orange"></div>
                <span>Space</span>
              </div>
              <div class="key key--j key--blue">
                <div class="keypress keypress--blue"></div>
                <span>J</span>
              </div>
              <div class="key key--k key--red">
                <div class="keypress keypress--red"></div>
                <span>K</span>
              </div>
              <div class="key key--l key--blue">
                <div class="keypress keypress--blue"></div>
                <span>L</span>
              </div>
            </div>
          </div>

          <div class="menu">
            <div class="menu__song">
              <CoinTable />
            </div>

            <div class="menu__config">
              <div class="config__speed">
                <h2>Скорость</h2>
                <div>
                  <a class="btn btn--small btn--selected" href="#">
                    1x
                  </a>
                  <a class="btn btn--small" href="#">
                    2x
                  </a>
                  <a class="btn btn--small" href="#">
                    3x
                  </a>
                </div>
              </div>
              <div class="config__challenge">
                <h2>Испытание</h2>
                <div>
                  <a class="btn btn--small" href="#">
                    Тускло
                  </a>
                </div>
              </div>
            </div>

            <div class="menu_start">
              <a
                class="btn btn--primary btn--start mb-5"
                onClick={handlerStartClick}
                href="#"
              >
                Старт
              </a>
            </div>
          </div>

          <div class="summary">
            <div class="summary__timer"></div>
            <div class="summary__result">
              <h2 class="result__heading">Результат</h2>
              <div class="result__accuracy perfect">
                <p class="accuracy__heading">Идеально</p>
                <span>:</span>
                <p class="accuracy__count perfect__count"></p>
              </div>
              <div class="result__accuracy good">
                <p class="accuracy__heading">Хорошо</p>
                <span>:</span>
                <p class="accuracy__count good__count"></p>
              </div>
              <div class="result__accuracy bad">
                <p class="accuracy__heading">Плохо</p>
                <span>:</span>
                <p class="accuracy__count bad__count"></p>
              </div>
              <div class="result__accuracy miss">
                <p class="accuracy__heading">Мимо</p>
                <span>:</span>
                <p class="accuracy__count miss__count"></p>
              </div>
              <div class="result__accuracy combo">
                <p class="accuracy__heading">Макс комбо</p>
                <span>:</span>
                <p class="accuracy__count combo__count"></p>
              </div>
              <div class="result__accuracy score">
                <p class="accuracy__heading">Счёт</p>
                <span>:</span>
                <p class="accuracy__count score__count"></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
