//styles functions

const createCardCorner = (number, symbol) => {
    return `<div class="card-corner">
                <div>${number}</div>
                <div>${symbol}</div>
            </div>`
} 

const createCardSymbols = (number, symbol) => {
    const isNumber = !isNaN(number); 

    if(number === 'A') {
        return (`<div>${symbol}</div>`);
    }

    if(number === 'J' || number === 'Q' || number === 'K') {
        return(`<div class='image'></div>`)
    }

    if (isNumber) {
        return `${new Array(parseInt(number))
        .fill(symbol)
        .map((cardSymbol) => `<div>${cardSymbol}</div>`)
        .join('')
        }`; 
    }
    return `<div class="symbols">${symbols}</div>`;
}

const createCardFront = (content) => {
    return `<div class="front">${content}</div>`;
}

const createCardBack = () => {
    return `<div class="back"></div>`;
}

const createCardDiv = (attibutes) => {
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    Object.entries(attibutes).forEach(([key, value]) => {
        cardDiv.setAttribute(key, value);
    });
    return cardDiv;
}

const createCard = (card, flipped) => {
    const number = card.slice(0, -1);
    const symbol = card.slice(-1);
    const cardDiv = createCardDiv({symbol, number});       
    
    cardDiv.innerHTML =`
    <div class="container">
        ${createCardFront(`
            ${createCardCorner(number, symbol)}
            <div class="symbols">
                ${createCardSymbols(number, symbol)}
            </div>
            ${createCardCorner(number, symbol)}
        `)}           
        ${createCardBack()}
    </div>
    `;    
    cardDiv.addEventListener('click', () => {
        
        if(cardDiv.classList.contains('flipped')) {
            cardDiv.classList.remove('flipped');
        }else{
            cardDiv.classList.add('flipped');
        }
    });

    if (flipped) {
        cardDiv.classList.add('flipped');
    }

    return cardDiv;
}

//deck functions

const createDeck =  async (selector, flipped) => {
    const container = document.querySelector(selector);
    const cards = await fetch(`http://localhost:8000/table/`)
    .then(response => response.json());
    cards.forEach((card, index) => container.append(createCard(card, (index < flipped))));
}

const createHand =  async (selector, flipped) => {
    const container = document.querySelector(selector);
    const cards = await fetch(`http://localhost:8000/deck/2`)
    .then(response => response.json());
    cards.forEach((card, index) => container.append(createCard(card, (index < flipped))));
}

const onClickElementById = (id, callback) => {
        document.getElementById(id)?.addEventListener('click', callback);
}

window.addEventListener('load', function() {
    (async () => {
        
        await createDeck('.deck.table', 2)
        const cardSize = 2;
        await createHand('.deck.hand', cardSize);
        onClickElementById('flip-cards', () => {
            document.querySelectorAll('.deck.hand .card').forEach((element, index) => {
                setTimeout(() => {
                    element.classList.remove('flipped');
                }, (500 * (index)));
            });
        });
        onClickElementById('button-hold', () => {
            console.log('HOLD')
        });
        onClickElementById('button-withdraw', () => {
            console.log('WITHDRAW')
        });
    })();
});

const flip = () => {

}