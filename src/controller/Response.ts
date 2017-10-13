

export class Response {
    name: number;
    body: {}; // the actual response
}

const raw = {
    item1: { key: 'sdfd', value:'sdfd' },
    item2: { key: 'sdfd', value:'sdfd' },
    item3: { key: 'sdfd', value:'sdfd' }
};

const allowed = ['item1', 'item3'];

const filtered = Object.keys(raw)
    .filter(key => allowed.includes(key))


console.log(filtered);