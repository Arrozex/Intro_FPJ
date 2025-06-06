const response = await fetch('https://yitxx-prompt-generate.hf.space', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mood, diary }),
});

const data = await response.json();
