function NumeroRandom(inicio = 0) {
    return (inicio + Math.round((Math.random()* 200)))
}

export default NumeroRandom;