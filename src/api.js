const API_URL = "https://marcconrad.com/uob/fish/api.php?out=json&base64=no";

export async function getFishQuestion() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load fish question");
  }

  const data = await response.json();

  return data;
}