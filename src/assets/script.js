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
function sendSessionInfos(informations)
{
  console.log(informations)
}
window.addEventListener('load',()=>{
  console.log(generateRandomInfo())
    FstartRecording()
})
window.addEventListener("beforeunload", function(event) {
  event.preventDefault()
  FstopRecording()
  this.window.close()
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
  console.log('the recording has stoped')
  FreplayRecording()
}
function FstopRecording() {
  stopRecording = true; // Stop capturing events
  console.log(events); // Display captured events in the console
  FreplayRecording();
}
function FreplayRecording() {
  const replayer = new rrweb.Replayer(events);
  // play
  console.log(events.length);
  replayer.play();

}