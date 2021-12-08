---
layout: page
title: drawing
---

<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-firestore.js"></script>

<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-analytics.js"></script>

<script>
  var firebaseConfig = {
    apiKey: "AIzaSyAYL47leitp_KrE0AnD5LNKfuI7VbrYeAo",
    authDomain: "drawing-test-40ffd.firebaseapp.com",
    projectId: "drawing-test-40ffd",
    storageBucket: "drawing-test-40ffd.appspot.com",
    messagingSenderId: "456507964884",
    appId: "1:456507964884:web:d0dd8d1fcd399e1b06aa41",
    measurementId: "G-M3R35GBEYH"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
</script>

After selecting body type please color in where you feel each emotion.

<style>
  #drawing-container {
    <!-- background-color: #C4ADA9; -->
  }
  .bodyCanvas {
    background-color: #C4ADA9;
    border: 1px #1C1514;
    border-radius: 5px;
    margin:auto;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  .saveButton {

    color: #1C1514;

    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 3.5vw;
    margin: 15px;
    cursor: arrow;
    border-radius: 10%;
    padding: 0.25em;
    font-size: 1.25rem;
  }
  .saveButton:active {

  }
  .emotionSel {
    border: 1px solid black;
    background-color: #e6e6e6;
    <!-- color: black; -->
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 3.5vw;
    margin: 15px;
    cursor: arrow;
    border-radius: 6%;
    padding: 0.25em;
    font-size: 1.25rem;
  }
  .emotionSel:focus {

  }
  .sticky {
    position: fixed;
    margin-top: -160px;
    top: 20%;
  }

  #outer {
    width: 600px;
    height: 1000px;
    margin: 0 auto;
  }

  #questionnaire {
  background-color: #C4ADA9;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  outline: none;
  font-size: 15px;
  border: 1px #e6e6e6;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

  #questions {
  padding: 18px;
  display: block;
  max-height: 1;
  overflow: hidden;
  border: 1px #e6e6e6;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: max-height 0.75s ease-out;
  margin: 5px;
}
  .collapse {
    transition: max-height 0.75s ease-out;
    max-height: 0;
    visibility: hidden;
    margin: 0px;
  }
</style>

<div id='outer'>
  <div id='drawing-container'>
  <button id='questionnaire'><h4>questionnaire</h4>click to close</button>
    <div id='questions'>
      <h4>please tell us a little about yourself...</h4>
      do you have a confession, what is it? <br>
      <input type="text" id="q1" value="">
      <br>
      what is your profession? <br>
      <input type="text" id="q2" value="">
      <br>
      where have you spent most of your life? <br>
      <input type="text" id="q3" value="">
      <br>
      what is your age? <br>
      <input type="text" id="q4" value=""> <br>
      where do you live now? <br>
      <input type="text" id="q5" value=""> <br>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js">
    </script>
    <script type="text/javascript" src="sketch.js"></script>
  </div>
</div>
