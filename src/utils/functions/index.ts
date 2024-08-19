function getRandomElement(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateWhatsAppMessage(): string {
  const greetings: string[] = ["Hey", "Hi", "Hello", "Yo", "What's up"];
  const activities: string[] = [
    "How's it going?",
    "What are you up to?",
    "What's new?",
    "Any plans for today?",
    "Long time no chat!",
  ];
  const questions: string[] = [
    "Wanna grab a coffee?",
    "Are you free later?",
    "Can we talk?",
    "Got a minute?",
    "Did you see the news?",
  ];
  const signOffs: string[] = [
    "Catch you later!",
    "Talk soon!",
    "Take care!",
    "Cheers!",
    "See ya!",
  ];

  const message: string = `${getRandomElement(greetings)}! ${getRandomElement(
    activities
  )} ${getRandomElement(questions)} ${getRandomElement(signOffs)}`;

  return message;
}
