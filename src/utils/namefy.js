indexPicker = (choices) => {
    const odds = 1 / (choices + 1)

    index = Math.floor(Math.random() / odds)

    if (index === choices) {
        return indexPicker(choices)
    }
    return index

}

const capitalize = (name) => {
    if (typeof name !== 'string') return ''
    return name[0].toUpperCase() + name.slice(1)
}

dothraki = async (callback) => {
    //Dothraki
    //consonants: m,f,v,w,n,t,d,th,l,s,z,ch,j,sh,zh,y,k,g,kh,q,h
    //vowels: a,e,i,o
    //syllables: CV, VC
    //constraints: cannot end with w,q (if thats the case, add 'e')
    //length: avg 7 ( 5% 4 / 15% 5 / 20% 6 / 20% 7 / 20% 8 / 15% 9 / 5% 10)

    lengthMaker = Math.random()
    syllableMaker = Math.random()

    length = 4
    if (lengthMaker > 0.00) {
        length = 4
        if (lengthMaker > 0.05) {
            length = 5
            if (lengthMaker > 0.20) {
                length = 6
            } if (lengthMaker > 0.40) {
                length = 7
                if (lengthMaker > 0.60) {
                    length = 8
                    if (lengthMaker > 0.80) {
                        length = 9
                        if (lengthMaker > 0.95) {
                            length = 10
                        }
                    }
                }
            }
        }
    }

    consonantPool = ['m', 'f', 'v', 'w', 'n', 't', 'd', 'th', 'l', 's', 'z', 'r', 'ch', 'j', 'sh', 'zh', 'y', 'k', 'g', 'kh', 'q', 'h']
    vowelPool = ['a', 'e', 'i', 'o']
    syllableMakerFlag = syllableMaker >= 0.5 ? true : false
    name = []
    for (let index = 0; index < length; index++) {
        if (syllableMakerFlag) {
            letterIndex = await indexPicker(22)
            name[index] = consonantPool[letterIndex]
            syllableMakerFlag = false
        } else {
            letterIndex = await indexPicker(4)
            name[index] = vowelPool[letterIndex]
            syllableMakerFlag = true
        }
    }
    if (name[length - 1] === 'w' || name[length - 1] === 'q') {
        name[length] = 'e'
    }
    name = name.join('')
    name = capitalize(name)
    callback(undefined, name)
}

valyrian = async (callback) => {
    //Valyrian
    //consonants: ['m','p','b','v,'n','t','d','s','z','rh','r','l','ñ','j','lj','k','g','gh','q','h']
    //vowels: ['i','ī','y','ȳ','e','ē','a','ā','o','ō','u','ū']
    //syllables: CVC,CV,VC
    //constraints: must end with a vowel OR s,n,t,z,r
    //             must start with a vowel, single consonant
    //length: avg 5.5 ( 5% 4 / 25% 5 / 40% 6 / 25% 7 / 5% 8 )

    lengthMaker = Math.random()

    length = 4
    if (lengthMaker > 0.00) {
        length = 4
        if (lengthMaker > 0.05) {
            length = 5
            if (lengthMaker > 0.30) {
                length = 6
            } if (lengthMaker > 0.70) {
                length = 7
                if (lengthMaker > 0.95) {
                    length = 8
                }
            }
        }
    }

    name = []

    //Syllables
    lengthLeft = length
    consonantPool = ['m', 'p', 'b', 'v', 'n', 't', 'd', 's', 'z', 'rh', 'r', 'l', 'ñ', 'j', 'lj', 'k', 'g', 'gh', 'q', 'h'] //20 total sounds
    // vowelPool = ['i', 'ī', 'y', 'ȳ', 'e', 'ē', 'a', 'ā', 'o', 'ō', 'u', 'ū'] //12 total sounds
    vowelPool = ['i', 'i', 'ī', 'y', 'y', 'ȳ', 'e', 'e', 'ē', 'a', 'a', 'ā', 'o', 'o', 'ō', 'u', 'u', 'ū'] //18 total sounds (doubling normal vowels to increase their odds)
    // constraintOnePool = ['i', 'ī', 'y', 'ȳ', 'e', 'ē', 'a', 'ā', 'o', 'ō', 'u', 'ū', 's', 'n', 't', 'z', 'r'] // 17 total sounds
    constraintOnePool = ['i', 'i', 'ī', 'y', 'y', 'ȳ', 'e', 'e', 'ē', 'a', 'a', 'ā', 'o', 'o', 'ō', 'u', 'u', 'ū', 's', 'n', 't', 'z', 'r'] // 23 total sounds (doubling normal vowels to increase their odds)
    constraintOneConsonantsPool = ['s', 'n', 't', 'z', 'r'] // 5 total sounds
    while (lengthLeft > 0) {
        if (lengthLeft >= 3) {
            rand = await indexPicker(3)
            switch (rand) {
                case 0:
                    // CVC -> -3
                    letterIndex = await indexPicker(20)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(18)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(20)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--
                    break;
                case 1:
                    // VC -> -2
                    letterIndex = await indexPicker(18)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(20)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--
                    break;
                case 2:
                    // CV -> -2
                    letterIndex = await indexPicker(20)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(18)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--
                    break;
            }
        } else if (lengthLeft = 2) {
            rand = await indexPicker(2)
            switch (rand) {
                case 0:
                    // VC -> validate constraint 1 ->  -2
                    letterIndex = await indexPicker(18)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(5)
                    name[length - lengthLeft] = constraintOneConsonantsPool[letterIndex]
                    lengthLeft--
                    break;
                case 1:
                    // CV -> -2
                    letterIndex = await indexPicker(20)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(18)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--
                    break;
            }
        } else {
            // constraint 1 for last letter -> -1
            letterIndex = await indexPicker(23)
            name[length - lengthLeft] = constraintOnePool[letterIndex]
            lengthLeft--
        }

    }
    

    
    name = name.join('')
    name = capitalize(name)

    callback(undefined, name)
}

klingon = async (callback) => {
    //Klingon
    //consonants: ['p','b','v','m','w','t','D','S','n','r','tlh','ch','j','l','y','q','Q','H','gh','ng','ʼ'] in movies they change Q anf tlh to K to make it easier
    //vowels: ['a','e,'I','o','u']
    //syllables: CV(10%) CVC(90%) (CVCV CVCCV CVCCVC)
    //constraints: can only start with a consonant
    //             usually  (assuming 90%) syllables end with a consonant or wʼ,yʼ,rgh
    //length: avg 4.8 ( 10% 3 / 40% 4 / 40% 5 / 10% 6  )

    lengthMaker = Math.random()

    length = 3
    if (lengthMaker > 0.00) {
        length = 3
        if (lengthMaker > 0.10) {
            length = 4
            if (lengthMaker > 0.50) {
                length = 5
            } if (lengthMaker > 0.90) {
                length = 6
            }
        }
    }

    name = []

    //Syllables
    lengthLeft = length
    consonantPool = ['p', 'b', 'v', 'm', 'w', 't', 'D', 'S', 'n', 'r', 'tlh', 'ch', 'j', 'l', 'y', 'q', 'Q', 'H', 'gh', 'ng', 'ʼ', 'wʼ', 'yʼ', 'rgh'] //24 total sounds
    vowelPool = ['a', 'e', 'I', 'o', 'u'] // 5 total sounds

    while (lengthLeft > 0) {
        syllableMaker = Math.random()
        if (lengthLeft === 1) {
            //C -> -1
            letterIndex = await indexPicker(24)
            name[length - lengthLeft] = consonantPool[letterIndex]
            lengthLeft--;
        } else if (syllableMaker < 0.90 && lengthLeft >= 3) {
            //CVC -> -3
            letterIndex = await indexPicker(24)
            name[length - lengthLeft] = consonantPool[letterIndex]
            lengthLeft--;

            letterIndex = await indexPicker(5)
            name[length - lengthLeft] = vowelPool[letterIndex]
            lengthLeft--;

            letterIndex = await indexPicker(24)
            name[length - lengthLeft] = consonantPool[letterIndex]
            lengthLeft--;
        } else if (syllableMaker < 0.90 && lengthLeft === 2) {
            //C -> -2
            letterIndex = await indexPicker(24)
            name[length - lengthLeft] = consonantPool[letterIndex]
            lengthLeft--;
            lengthLeft--;
        } else if (!(syllableMaker < 0.90) && lengthLeft >= 2) {
            //CV -> -2
            letterIndex = await indexPicker(24)
            name[length - lengthLeft] = consonantPool[letterIndex]
            lengthLeft--;

            letterIndex = await indexPicker(5)
            name[length - lengthLeft] = vowelPool[letterIndex]
            lengthLeft--;
        }
    }

    name = name.join('')
    callback(undefined, name)
}

sindarin = async (callback) => {
    //Klingon
    //consonants: ['p','b','m','f','v','th','dh','t','d','n','s','rh','r','lh','l','j','c','g','ng','ch','hw','w','h']
    //vowels: ['i','y','e','a','u,'o']
    //endings: ['il','el','eth','wen','iel','ien','iell','dir','ion','on','nir','ben','dil','ndil','or','wi','dor','ian','ion']
    //syllables: CV VC
    //constraints: can only start with a consonant
    //             usually  (assuming 90%) syllables end with a consonant or wʼ,yʼ,rgh
    //length: avg 4+2 ( 25% 2 / 25% 3 / 25% 4 / 25% 5  )

    lengthMaker = Math.random()

    length = 2
    if (lengthMaker > 0.00) {
        length = 2
        if (lengthMaker > 0.25) {
            length = 3
            if (lengthMaker > 0.50) {
                length = 4
            } if (lengthMaker > 0.75) {
                length = 5
            }
        }
    }


    //Syllables
    name = []
    lengthLeft = length
    consonantPool = ['p', 'b', 'm', 'f', 'v', 'th', 'dh', 't', 'd', 'n', 's', 'rh', 'r', 'lh', 'l', 'j', 'c', 'g', 'ng', 'ch', 'hw', 'w', 'h'] //23 sounds
    vowelPool = ['i', 'y', 'e', 'a', 'u', 'o'] //6 sounds
    suffixPool = ['il','el','eth','wen','iel','ien','iell','dir','ion','on','nir','ben','dil','ndil','or','wi','dor','ian','ion']

    while (lengthLeft > 0) {
        if (lengthLeft >= 3) {
            rand = await indexPicker(3)
            switch (rand) {
                case 0:
                    // CVC -> -3
                    letterIndex = await indexPicker(23)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(6)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(23)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--
                    break;
                case 1:
                    // VC -> -2
                    letterIndex = await indexPicker(6)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(23)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--
                    break;
                case 2:
                    // CV -> -2
                    letterIndex = await indexPicker(23)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(6)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--
                    break;
            }
        } else if (lengthLeft = 2) {
            rand = await indexPicker(2)
            switch (rand) {
                case 0:
                    // VC -> validate constraint 1 ->  -2
                    letterIndex = await indexPicker(6)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(23)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--
                    break;
                case 1:
                    // CV -> -2
                    letterIndex = await indexPicker(23)
                    name[length - lengthLeft] = consonantPool[letterIndex]
                    lengthLeft--

                    letterIndex = await indexPicker(6)
                    name[length - lengthLeft] = vowelPool[letterIndex]
                    lengthLeft--
                    break;
            }
        } else {
            //V
            letterIndex = await indexPicker(6)
            name[length - lengthLeft] = vowelPool[letterIndex]
            lengthLeft--
        }

    }
    //Add accent (20%)
    for (let i = 0; i < length; i++) {
        if (vowelPool.includes(name[i])) {
            accentMaker = indexPicker(5)
            if (accentMaker > 3) {
                switch (name[i]) {
                    case 'a':
                        name[i] = 'á'
                        break
                    case 'e':
                        name[i] = 'é'
                        break
                    case 'i':
                        name[i] = 'í'
                        break
                    case 'o':
                        name[i] = 'ó'
                        break
                    case 'u':
                        name[i] = 'ú'
                        break
                    case 'y':
                        name[i] = 'ý'
                        break
                }
            }
        }
    }
    //Suffix
    letterIndex = await indexPicker(19)
    name[length+1] = suffixPool[letterIndex]
    name = name.join('')
    name = capitalize(name)
    callback(undefined, name)
}

const namefy = async (flair) => {
    //quenya (light elves, lotr)
    //khuzdul (dwarves, lotr)
    //adunaic (old men, lotr)
    //parseltongue (harry potter) maybe?
    //na'vi
    switch (flair) {
        case 1:
            await dothraki((error, response) => {
                name = response
            })
            break;
        case 2:
            await valyrian((error, response) => {
                name = response
            })
            break;
        case 3:
            await klingon((error, response) => {
                name = response
            })
            break;
        case 4:
            await sindarin((error, response) => {
                name = response
            })
            break;
        default:
            name = 'zero'
    }
    return name
}

module.exports = namefy