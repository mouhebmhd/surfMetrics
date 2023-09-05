const socket = new WebSocket('ws://localhost:8080');
var sessionInfo;
function generateRandomId() {
    const idLength = 8;
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }
    return randomId;
  }
  
  function generateRandomName() {
    const names = [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frank",
      "Grace",
      "Henry",
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }
  
  function generateRandomInfo() {
    const randomId = generateRandomId();
    const randomName = generateRandomName();
    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    info = {
      id: randomId,
      name: randomName,
      date: currentDate,
      time: currentTime,
    };
    return info;
  }
  function sendSessionInfos(informations) {
    $.ajax({
      url: 'http://localhost:3030/events/addSessionInfo/',
      type: 'POST',
      contentType: 'application/json', // Set the content type to JSON
      data: JSON.stringify({ information: informations }), // Convert the data to JSON format
      success: function(response) {
        // Handle a successful response here
        console.log('Request successful:', response);
      },
      error: function(error) {
        // Handle errors here
        console.error('Error:', error);
      }
    });
  } 
  function sendSessionEvents(evenements,id) {
   socket.send(JSON.stringify({evenements,id}))
  }
  
window.addEventListener('load',()=>{
  socket.addEventListener('open', (event) => {
    console.log('WebSocket connection established');})
    socket.addEventListener('message', (event) => {
      // Handle server responses here
      console.log('Received from server:', event.data);
    });
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });
    FstartRecording()
    sessionInfo=generateRandomInfo()
    sendSessionInfos(sessionInfo)
  })
  window.addEventListener("beforeunload", function(event) {
    event.preventDefault()
    FstopRecording()
  });
  const events = []; // To store captured events
  let stopRecording = false;
  function FstartRecording() {
    events.length = 0; // Clear previous events
    stopRecording = false;
    console.log('the recording has started')
  
    // Start capturing events
    rrweb.record({
      emit(event) {
        if (!stopRecording) {
          events.push(event);
        }
      },
    });

  }
  function FstopRecording() {
    stopRecording = true; // Stop capturing events
    console.log(events); // Display captured events in the console
    FreplayRecording();
    sendSessionEvents(events,sessionInfo.id)
  }
  function FreplayRecording() {
    const replayer = new rrweb.Replayer(events);
    // play
    console.log(events.length);
    replayer.play();
  
  }