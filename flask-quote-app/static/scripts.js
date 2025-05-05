// Функция для получения цитаты с сервером
async function fetchQuote() {
  document.getElementById('quote-text').textContent = 'Загрузка...';
  document.getElementById('quote-author').textContent = '';
  try {
    const response = await fetch('/api/quote');
    if (!response.ok) {
      throw new Error('Ошибка API');
    }
    const data = await response.json();
    document.getElementById('quote-text').textContent = `"${data.q}"`;
    document.getElementById('quote-author').textContent = `— ${data.a}`;
  } catch (error) {
    document.getElementById('quote-text').textContent = 'Не удалось загрузить цитату.';
    document.getElementById('quote-author').textContent = '';
  }
}

// Обработчик кнопки "Получить новую цитату"
document.getElementById('newQuote').addEventListener('click', fetchQuote);

// Обработчик кнопки "Поделиться"
document.getElementById('shareBtn').addEventListener('click', () => {
  const quote = document.getElementById('quote-text').textContent;
  const author = document.getElementById('quote-author').textContent;
  const text = `${quote} ${author}`;

  if (navigator.share) {
    navigator.share({
      title: 'Цитата дня',
      text: text,
    }).catch(console.error);
  } else {
    // Для браузеров без Web Share API
    prompt('Скопируйте цитату:', text);
  }
});

// Загружаем первую цитату при запуске
window.onload = fetchQuote;