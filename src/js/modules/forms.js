export default class Form {
    constructor(forms, inputs) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll(inputs);
    }

    initMask() {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos,pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
    
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
                if (def.length >= val.length) {
                    val = def;
                }
    
                this.value = matrix.replace(/./g, function(a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a; //???
                });
    
                if (event.type === 'blur') {
                    if (this.value.length == 2) {
                        this.value = '';
                    }
                } else {
                    setCursorPosition(this.value.length, this);
                }
        }
    
        let inputs = document.querySelectorAll('input[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        })
    
    }
    async postData(url, data) {
        let res = await fetch(url, { // отправляем. присваиваем ответ в переменную (!!! await для ассинхронного выполнения кода. Поскольку жс не будет ждать ответа с сервера и следовательно не присовит нашей переменной значение. (будет андефайнд))
            method: "POST", // гет или пост. у нас форма - сл-но пост
            body: data 
        });
        return await res.text(); // преобразовываем в строковое значение    
    }


    checkTextInputs(selector) {
        const txtInputs = document.querySelectorAll(selector);
    
        txtInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z @ \. 0-9]/ig)) { 
                    e.preventDefault();
                }
            });
        });
    }

    clearInputs() { // функция для очистки инпутов
        this.inputs.forEach(input => {
            input.value = '';
        });
    }
    init() {
        this.initMask();
        this.forms.forEach(item => {
            const message = { // сообщения для вывода результата запроса
                loading: 'Загрузка',
                success: 'Спасибо! Скоро мы с вами свяжемся',
                failure: 'Что-то пошло не так'
            };

            const path = {
                question: 'assets/question.php'
            };
            this.checkTextInputs('input[name="email"]');
            

            item.addEventListener('submit', (e) => {
                e.preventDefault();
                let statusMessage = document.createElement('div'); // создаем блок, стилизуем, помещаем в конец
                statusMessage.style.cssText = `
                    margin: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);
                statusMessage.textContent = message.loading;
                
                const formData = new FormData(item);
                this.postData(path.question, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    this.clearInputs();
                    setInterval(() => {
                        statusMessage.remove()
                    }, 6000);
                })
            })
            
        })
    }
}