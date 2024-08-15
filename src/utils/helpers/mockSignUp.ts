export default function fillSignUpForm(): void {
  // Ищем форму с ID signUpForm
  const form = document.getElementById('signUpForm') as HTMLFormElement | null;
  if (!form) {
    return;
  }

  // Функция для генерации случайной строки
  function generateRandomString(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function setFirstLetterUpperCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Функция для генерации случайного email
  function generateRandomEmail(): string {
    const domains = ['example.com', 'mail.com', 'test.com'];
    return generateRandomString(5) + '@' + domains[Math.floor(Math.random() * domains.length)];
  }

  // Функция для генерации случайного номера телефона
  function generateRandomPhoneNumber(): string {
    const length = Math.floor(Math.random() * 6) + 8; // Длина от 10 до 15
    let phone = '';
    for (let i = 0; i < length; i++) {
      phone += Math.floor(Math.random() * 10);
    }
    return phone;
  }

  // Заполняем поля формы случайными данными
  const inputs: { [key: string]: string } = {
    'email': generateRandomEmail(),
    'login': generateRandomString(Math.floor(Math.random() * 3) + 3), // Длина от 3 до 20
    'first_name': setFirstLetterUpperCase(generateRandomString(Math.floor(Math.random() * 18) + 3)),
    'second_name': setFirstLetterUpperCase(generateRandomString(Math.floor(Math.random() * 18) + 3)),
    'phone': generateRandomPhoneNumber(),
    'password': 'pAssw0rd', // PAssw0rd
    'passwordCheck': 'pAssw0rd'
  };

  // Проходим по input'ам формы и заполняем их
  for (const name in inputs) {
    const input = form.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;
    if (input) {
      input.value = inputs[name];
    }
  }
}
