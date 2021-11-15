---
layout: page
title: Drawing
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
    background-color: white;
  }
  .bodyCanvas {
    border: 1px #e6e6e6;
    border-radius: 5px;
    margin:auto;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  .saveButton {
    background-color: light grey;
    border: 1px solid black;
    color: black;
    <!-- padding: 2.5vw; -->
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 3.5vw;
    margin: 15px;
    <!-- margin: auto; -->
    cursor: arrow;
    border-radius: 10%;
    padding: 0.25em;
    font-size: 1.25rem;
  }
  .saveButton:active {
    background-color: grey;
  }
  .emotionSel {
    border: 1px solid black;
    background-color: #e6e6e6;
    color: black;
    <!-- padding: 1.5vw; -->
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
    <!-- border: 3px solid green; -->

    <!-- margin: 0 auto; -->




  }
  #outer {
    width: 600px;
    height: 1000px;
    margin: 0 auto;
    <!-- border: 1px solid red; -->

    <!-- padding: 0px 0px 100px 0px; -->
  }

</style>
<div id='outer'>
  <div id='drawing-container'>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js">
    </script>
    <script type="text/javascript" src="sketch.js"></script>
  </div>
</div>
