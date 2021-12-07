const timerText = document.querySelector('.text');
const text = ['Hi. I\'m Amirhossein Dehghan.  ', 'I\'m Frontend developer.   ', 'Wellcome to my Github page.   ', 'Scroll down page to see my projects.   '];
let textCounter = 0;
let arrayCounter = 0;
let endCheck = false;
let timer = setInterval(() => {
    changeText();
}, 300);


function changeText() {
    if (!endCheck) {
        if (textCounter == text[arrayCounter].length) {
            endCheck = true;
            clearInterval(timer);
            timer = setInterval(() => {
                changeText();
            }, 90);
        } else {
            if (text[arrayCounter][textCounter] == ' ') {
                timerText.innerText += '\u00A0';
            } else {
                timerText.innerText += text[arrayCounter][textCounter];
            }
            textCounter++;
        }
    } else {
        if (textCounter > 0) {
            textCounter--;
            timerText.innerText = timerText.innerText.slice(0, textCounter);
        } else {
            endCheck = false;
            arrayCounter++;
            if (arrayCounter == text.length)
                arrayCounter = 0;
            clearInterval(timer);
            timer = setInterval(() => {
                changeText();
            }, 300);
        }
    }
}
const webList = [
    ['chirp/', 'chirpTemp.jpg', 'Chirp', 'HtmlpopCsspopJavaScript']
];

const webPageList = document.querySelector('.webPageList');
for (let index = 0; index < 1; index++) {
    const webPageListItem = document.createElement('div');
    webPageListItem.classList.add('webPageListItem');
    const pageShow = document.createElement('img');
    pageShow.classList.add('pageShow');
    pageShow.src = 'Assets/Template/' + webList[index][1];
    webPageListItem.appendChild(pageShow);

    const pageName = document.createElement('p');
    pageName.classList.add('pageName');
    pageName.innerText = webList[index][2];
    webPageListItem.appendChild(pageName);

    const languageUseList = document.createElement('ul');
    languageUseList.classList.add('languageUseList');
    const langList = webList[index][3].split('pop');
    for (const iterator of langList) {
        const li = document.createElement('li');
        li.classList.add(iterator);
        li.innerText = iterator;
        languageUseList.appendChild(li);
    }
    webPageListItem.appendChild(languageUseList);

    const viewPage = document.createElement('a');
    viewPage.classList.add('viewPage');
    viewPage.href = webList[index][0];
    viewPage.target = '_blank';
    viewPage.innerText = 'Load more';
    webPageListItem.appendChild(viewPage);
    webPageList.appendChild(webPageListItem);
}