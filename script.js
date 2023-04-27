const touches = [...document.querySelectorAll('.buton')];
const keycodes = touches.map(e => e.dataset.touch);
const ecran = document.querySelector('.ecran');
hide = document.querySelector(' .active input');
let del = document.querySelector('.buton-del');
let audio = new Audio("click.mp3");
let next = 0;
let off = 0;
let init = 0;

if (init == 0)
{
    ecran.textContent = "0";
    init = 1;
}


del.addEventListener('click', () => {
    if(ecran.textContent== "ERROR")
    {
        ecran.textContent= "00";
    }
    ecran.textContent= ecran.textContent.substring(0, (ecran.textContent.length-1));
})
const hidetouch = () => {
    touches.forEach(touch => {
        touch.classList.toggle('hide');
    })
    ecran.textContent = "";
    if (off == 0)
    {
        off=1;
        ecran.style.color='black';
    }
    else
    {
        ecran.style.color='white';
        ecran.textContent = "0";
        init=1;
        off=0;
    }
}

hide.addEventListener('click', hidetouch);
document.addEventListener('keydown', (e) => {
    const valeur = e.keyCode.toString();
    evaluation(valeur);
})

document.addEventListener('click', (e) => {
    const valeur = e.target.dataset.touch;
    evaluation(valeur);
});


const evaluation = (e) => {
    if(ecran.textContent== "ERROR")
    {
        ecran.textContent= "";
    }
    if(keycodes.includes(e))
    {           
        if (init == 1)
        {
            ecran.textContent = "";
            init = 2;
        }

        if(off==0)
        {
            audio.play();
        }
        switch(e)
        {
            case '8':
                ecran.textContent = "0";
                init=1;
            break;
            case '13':
                const c = ecran.textContent;
                if(c == "*" || c == "+" || c == "-" || c == "/" || c == "(" || c == ")")
                {
                    ecran.textContent = "0";
                }
                else
                {

                    const calcul = eval(ecran.textContent);
                    ecran.textContent = calcul;
                }
                if(ecran.textContent=="")
                {
                    ecran.textContent = "0";
                }
            break;
            default:
                const position = keycodes.indexOf(e);
                const touche = touches[position];
                ecran.textContent += touche.textContent;
                if(ecran.textContent.length)
                {

                }
                let m = ecran.textContent.charAt(ecran.textContent.length-2);
                let n = ecran.textContent.charAt(ecran.textContent.length-1);
                if ( m == "*" || m == "+" || m == "/" || m == "-" || m == "(")
                {
                    if(n == "*" || n == "+" || n == "/" || n == "-" || n == "(" || n == ")")
                    {
                        ecran.textContent= ecran.textContent.substring(0,ecran.textContent.length-2);
                        ecran.textContent += touche.textContent;
                    }
                   
                }
                if(m == ")" && ( n == ")" || n == "(" ))
                {
                    ecran.textContent= ecran.textContent.substring(0,ecran.textContent.length-2);
                    ecran.textContent += touche.textContent;
                }
                else if(m == ")" && ( n != "*" && n != "+" && n != "/" && n != "-"  ))
                {
                    ecran.textContent= ecran.textContent.substring(0,ecran.textContent.length-2);
                    ecran.textContent += touche.textContent;
                }
            break;
        }

    }
}

window.addEventListener('error' , (e) => {
    ecran.textContent = "" ;
    if (off==0)
    {
        ecran.textContent= "ERROR";
    }
})