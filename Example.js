// Created: 2022/04/56 16:56:00
// Last modified: "2022/05/07 02:57:41"

export var language = ["zh-CN", "zh-HK", "zh-MO", "zh-TW", "zh-SG"].indexOf(navigator.language) == -1 ? 'en' : 'cn';
// var __preload, __setup, __draw,
//     preload, setup, draw;

// examplesArr = typeof examplesArr == 'undefined' ? ['balls', 'fx', 'fx_v2'] : examplesArr;
// examplesArr = typeof examplesArr == 'undefined' ? ['fx'] : examplesArr;
// _example = typeof _example == 'undefined' ? examplesArr[0] : _example;
// _example = 'fx';

// let importFrom = String('./examples/' + _example + '.js');
// console.log(_example, importFrom);

// Examples[_example]();

// import { __preload, __setup, __draw, errorTxt } from importFrom;

// import(importFrom)
//     .then(module => {
//         console.log(module);
//         module.Examples[_example]();
//         __preload = module.__preload,
//             __setup = module.__setup,
//             __draw = module.__draw;
//         preload = _preload;
//         setup = _setup;
//         draw = _draw;
//     });
// try {
//     Examples[_example]();
// } catch (err) {
//     let idx = 0;
//     let findAExample = false;
//     let checkhistory = '';
//     do {
//         try {
//             _example = examplesArr[idx];
//             checkhistory += _example + ' \\ ';
//             Examples[_example]();
//             findAExample = true;
//         } catch (err) { }
//         if (findAExample == true) {
//             break;
//         }
//         idx++;
//     } while (idx < examplesArr.length)
//     if (findAExample == false) {
//         throw (`Cant find any example . tryed: ${checkhistory}`)
//     }
// }

export var _pc;



export function _preload() {
    console.log('example preload start');

    _pc = new PC({
        showToolsBoo: false,
        autoHideBoo: false,
        ctrler_width: 400,

    }).title('choose example here. ');


    _pc.select('example', examplesArr, () => {
        const url = new URL(window.location.origin + window.location.pathname);
        const name = 'example';
        url.searchParams.append(name, example);

        document.querySelector('.markdown-body[id*=readme]').classList.add('hide');
        setTimeout(() => {
            window.location = url.href;
        }, 500);
    });
    _pc.button('hide_readme', 'hide readme', (e) => {
        document.querySelector('.markdown-body[id*=readme]').classList.toggle('hide');
        if ([...document.querySelector('.markdown-body[id*=readme]').classList].includes('hide')) {
            _pc.ctrlers['hide_readme'].elt.innerText = 'show readme';
            document.body.style.overflow = 'hidden';
            if (isMobile() == true) {
                touchMove = () => {
                    return false;
                }
            }
        } else {
            _pc.ctrlers['hide_readme'].elt.innerText = 'hide readme';
            document.body.style.overflow = 'auto';
            if (isMobile() == true) {
                touchMove = () => {
                    ;
                }
            }
        }
        resizeCanvas(document.body.clientWidth, windowHeight);
    });

    let exampleUrl='./examples/'+example+'.js';
    _pc.a('View_code',exampleUrl,exampleUrl).displayName('source:').alt({
        cn:"☝ 在这里查看示例原码",
        en:'☝ Check out the sample source code here'
    }[language]);

    document.addEventListener('onpagehide', () => {
        noLoop();
    });
    document.addEventListener('onpageshow', () => {
        loop();
    });
    

    _pc.stick('top');

    return _pc;
}

export function _setup() {
    console.log('example setup start');

    loadReadmeFile();
    document.querySelector('.markdown-body[id*=readme]').classList.add('hide');
    setTimeout(() => {
        document.querySelector('.markdown-body[id*=readme]').classList.remove('hide');
    }, 500);

    resizeCanvas(document.body.clientWidth, windowHeight);


    // _pc.mainContainer.position(null, 0);
    // _pc.mainContainer.elt.style.bottom = 'unset';
    // _pc.mainContainer.elt.setAttribute('stick', 'top');


    console.log('example setuped');

}



export function _windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// function touchStarted() {
//     return false;
// }



// function touchEnded() {
//     return false;
// }